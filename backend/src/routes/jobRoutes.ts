import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "../controllers/jobControllers.js";

const router = express.Router();

router.post("/", createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.put("/:id", updateJob);

export default router;
