import express from "express";
import {
  markAttendance,
  getAttendance,
  deleteAttendance,
} from "../controllers/attendanceController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", authorize("admin", "teacher"), getAttendance);
router.post("/", authorize("admin", "teacher"), markAttendance);
router.delete("/:id", authorize("admin"), deleteAttendance);

export default router;