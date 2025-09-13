import mongoose from "mongoose";

// Connect to MongoDB
export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    console.log(
      "Environment check - MONGO_URI:",
      mongoUri ? "Found" : "Not found"
    );

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected successfully ✅");
  } catch (err) {
    console.error("MongoDB connection failed ❌", err);
    process.exit(1);
  }
};
