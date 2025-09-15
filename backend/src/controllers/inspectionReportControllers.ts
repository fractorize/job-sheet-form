import InspectionReport from "../models/InspectionReport.js";
import { Request, Response } from "express";
import { inspectionReportSchema } from "../validations/inspectionReportSchema.js";
import { ZodError } from "zod";

export const createReport = async (req: Request, res: Response) => {
  try {
    const parsed = inspectionReportSchema.parse(req.body);
    const newInspectionReport = new InspectionReport(parsed);
    await newInspectionReport.save();

    res.status(201).json({
      success: true,
      message: "Report successfully added.",
      data: newInspectionReport,
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

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const reports = await InspectionReport.find({});
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
