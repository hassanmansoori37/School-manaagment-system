import Attendance from "../models/Attendance.js";

export const markAttendance = async (req, res, next) => {
  try {
    const { student, date, status } = req.body;

    const attendanceDate = new Date(date);

    if (!date || Number.isNaN(attendanceDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "A valid attendance date is required",
      });
    }

    attendanceDate.setUTCHours(0, 0, 0, 0);

    const record = await Attendance.findOneAndUpdate(
      { student, date: attendanceDate },
      { student, date: attendanceDate, status },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Attendance saved successfully",
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

export const getAttendance = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.student) filter.student = req.query.student;
    if (req.query.date) {
      const date = new Date(req.query.date);

      if (Number.isNaN(date.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid date",
        });
      }

      date.setUTCHours(0, 0, 0, 0);
      const nextDay = new Date(date);
      nextDay.setUTCDate(nextDay.getUTCDate() + 1);

      filter.date = { $gte: date, $lt: nextDay };
    }

    const records = await Attendance.find(filter)
      .populate("student", "name rollNumber className")
      .sort({ date: -1 });

    res.json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAttendance = async (req, res, next) => {
  try {
    const record = await Attendance.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    res.json({
      success: true,
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};