import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { 
    type: String,
    required: true,
    trim: true 
},
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    className: { 
        type: String,
        required: true 
    },
    age: {
         type: Number,
        required: true,
         min: 3,
         max: 100 },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    parentPhone: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);