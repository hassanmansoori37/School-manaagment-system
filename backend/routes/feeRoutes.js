import express from "express";
import {
  createFee,
  getFees,
  updateFeePayment,
  deleteFee,
} from "../controllers/feeController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", authorize("admin"), getFees);
router.post("/", authorize("admin"), createFee);
router.patch("/:id/payment", authorize("admin"), updateFeePayment);
router.delete("/:id", authorize("admin"), deleteFee);

export default router;