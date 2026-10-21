
import "dotenv/config";
import dns from "node:dns";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const createAdmin = async () => {
  try {
    if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
      throw new Error("MONGODB_URI and JWT_SECRET are required in .env");
    }

    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password || password.length < 12) {
      throw new Error(
        "Set ADMIN_EMAIL and ADMIN_PASSWORD (at least 12 characters) in .env"
      );
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "school_management",
      serverSelectionTimeoutMS: 15000,
    });

    console.log("MongoDB connected successfully");

    const existing = await User.findOne({ email });

    if (existing) {
      console.log("An account with this email already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name: "School Administrator",
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin account created successfully.");
  } catch (error) {
    console.error("Admin creation failed:", error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
};

createAdmin();
