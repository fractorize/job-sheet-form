// packages
import express from "express";
import dotenv from "dotenv";

// Configure dotenv
dotenv.config();

//Utils
import { connectDB } from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";

connectDB();

const app = express();
const port = process.env.PORT;
console.log(port);

// Middleware to parse JSON
app.use(express.json());

app.use("/api/job", jobRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
