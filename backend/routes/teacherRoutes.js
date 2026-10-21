import express from "express";
import {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacherController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", authorize("admin"), getTeachers);
router.get("/:id", authorize("admin"), getTeacherById);
router.post("/", authorize("admin"), createTeacher);
router.put("/:id", authorize("admin"), updateTeacher);
router.delete("/:id", authorize("admin"), deleteTeacher);

export default router;