// packages
import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";

// Configure dotenv
dotenv.config();

//Utils
import { connectDB } from "./config/db.js";
import inspectionReportRoutes from "./routes/inspectionReportRoutes.js";

connectDB();

const app = express();
const port = process.env.PORT;
console.log(port);

// Middleware to parse JSON
app.use(express.json());
app.use("/api/inspection-report", inspectionReportRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
