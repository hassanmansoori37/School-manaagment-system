import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    amount: { type: Number, required: true, min: 1 },
    paidAmount: { type: Number, default: 0, min: 0 },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Pending", "Partial", "Paid"],
      default: "Pending",
    },
    paymentDate: { type: Date, default: null },
    description: { type: String, default: "Monthly fee" },
  },
  { timestamps: true }
);

export default mongoose.model("Fee", feeSchema);