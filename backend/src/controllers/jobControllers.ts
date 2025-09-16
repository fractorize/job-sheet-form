import Job from "../models/Job.js";
import { Request, Response } from "express";
import { jobSchema } from "../validations/jobSchema.js";
import { ZodError } from "zod";

export const createJob = async (req: Request, res: Response) => {
  try {
    const parsed = jobSchema.parse(req.body);
    const newJob = new Job(parsed);
    await newJob.save();

    res.status(201).json({
      success: true,
      message: "Report successfully added.",
      data: newJob,
    });
  } catch (error) {
    console.error("Error in create Report :", (error as Error).message);

    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.issues.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }

    // Handle specific MongoDB errors
    if ((error as any).name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: (error as any).errors,
      });
    }

    if ((error as any).code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate entry found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const reports = await Job.find();
    res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error) {
    console.error("Error fetching reports:", (error as Error).message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const report = await Job.findById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate input with Zod
    const parsed = jobSchema.parse(req.body);

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { $set: parsed },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job successfully updated.",
      data: updatedJob,
    });
  } catch (error) {
    console.error("Error in update Job:", (error as Error).message);

    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.issues.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Job successfully deleted.",
      data: deletedJob,
    });
  } catch (error) {
    console.error("Error in update Job:", (error as Error).message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
