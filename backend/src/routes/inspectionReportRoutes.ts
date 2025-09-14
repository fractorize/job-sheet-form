import express from "express";
import {
  createReport,
  getAllReports,
} from "../controllers/inspectionReportControllers.js";

const router = express.Router();

router.post("/", createReport);
router.get("/", getAllReports);

export default router;
