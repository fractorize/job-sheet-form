import InspectionReport from "../models/InspectionReport.js";
import { Request, Response } from "express";

export const createReport = async (req: Request, res: Response) => {
  try {
    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is required",
      });
    }

    const inspectionReport = req.body;
    const newInspectionReport = new InspectionReport(inspectionReport);

    // Validate the document before saving
    const validationError = newInspectionReport.validateSync();
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: validationError.errors,
      });
    }

    await newInspectionReport.save();
    res.status(201).json({
      success: true,
      message: "Report successfully added.",
      data: newInspectionReport,
    });
  } catch (error) {
    console.error("Error in create Report :", (error as Error).message);

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
