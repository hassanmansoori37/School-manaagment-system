import express from "express";
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", authorize("admin", "teacher"), getStudents);
router.get("/:id", authorize("admin", "teacher"), getStudentById);
router.post("/", authorize("admin"), createStudent);
router.put("/:id", authorize("admin"), updateStudent);
router.delete("/:id", authorize("admin"), deleteStudent);

export default router;