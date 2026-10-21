import express from "express";
import {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
} from "../controllers/classController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", authorize("admin", "teacher"), getClasses);
router.get("/:id", authorize("admin", "teacher"), getClassById);
router.post("/", authorize("admin"), createClass);
router.put("/:id", authorize("admin"), updateClass);
router.delete("/:id", authorize("admin"), deleteClass);

export default router;