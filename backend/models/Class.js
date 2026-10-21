import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: {
         type: String,
         required: true,
          trim: true
         },
    section: {
         type: String,
         required: true,
          trim: true 
        },
    classTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },
    roomNumber: { 
        type: String,
         default: "" 
        },
  },
  { timestamps: true }
);

classSchema.index({ name: 1, section: 1 }, { unique: true });

export default mongoose.model("SchoolClass", classSchema);