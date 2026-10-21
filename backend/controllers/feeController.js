import Fee from "../models/Fee.js";

export const createFee = async (req, res, next) => {
  try {
    const { student, amount, paidAmount = 0, dueDate, description } = req.body;

    if (paidAmount > amount) {
      return res.status(400).json({
        success: false,
        message: "Paid amount cannot exceed total fee",
      });
    }

    const fee = await Fee.create({
      student,
      amount,
      paidAmount,
      dueDate,
      description,
      status:
        paidAmount === 0
          ? "Pending"
          : paidAmount === amount
            ? "Paid"
            : "Partial",
      paymentDate: paidAmount > 0 ? new Date() : null,
    });

    res.status(201).json({
      success: true,
      data: fee,
    });
  } catch (error) {
    next(error);
  }
};

export const getFees = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.student) filter.student = req.query.student;
    if (req.query.status) filter.status = req.query.status;

    const fees = await Fee.find(filter)
      .populate("student", "name rollNumber className")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: fees.length,
      data: fees,
    });
  } catch (error) {
    next(error);
  }
};

export const updateFeePayment = async (req, res, next) => {
  try {
    const { paidAmount } = req.body;

    if (
      typeof paidAmount !== "number" ||
      !Number.isFinite(paidAmount) ||
      paidAmount < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Paid amount must be a valid non-negative number",
      });
    }

    const fee = await Fee.findById(req.params.id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee record not found",
      });
    }

    if (paidAmount > fee.amount) {
      return res.status(400).json({
        success: false,
        message: "Paid amount cannot exceed total fee",
      });
    }

    fee.paidAmount = paidAmount;
    fee.status =
      paidAmount === 0
        ? "Pending"
        : paidAmount === fee.amount
          ? "Paid"
          : "Partial";
    fee.paymentDate = paidAmount > 0 ? new Date() : null;

    await fee.save();

    res.json({
      success: true,
      message: "Fee payment updated successfully",
      data: fee,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFee = async (req, res, next) => {
  try {
    const fee = await Fee.findByIdAndDelete(req.params.id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee record not found",
      });
    }

    res.json({
      success: true,
      message: "Fee record deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};