
import dns from "node:dns";
import mongoose from "mongoose";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing from .env");
  }

  try {
    await mongoose.connect(uri, {
      dbName: "school_management",
      serverSelectionTimeoutMS: 15000,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

export default connectDB;
export { connectDB };

