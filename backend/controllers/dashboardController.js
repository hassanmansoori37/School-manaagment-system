import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import SchoolClass from "../models/Class.js";
import Attendance from "../models/Attendance.js";
import Fee from "../models/Fee.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

    const [
      totalStudents,
      totalTeachers,
      totalClasses,
      todayAttendance,
      attendanceByStatus,
      feeSummary,
      pendingFees,
    ] = await Promise.all([
      Student.countDocuments(),
      Teacher.countDocuments(),
      SchoolClass.countDocuments(),
      Attendance.countDocuments({
        date: { $gte: today, $lt: tomorrow },
      }),
      Attendance.aggregate([
        { $match: { date: { $gte: today, $lt: tomorrow } } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      Fee.aggregate([
        {
          $group: {
            _id: null,
            totalBilled: { $sum: "$amount" },
            totalCollected: { $sum: "$paidAmount" },
          },
        },
      ]),
      Fee.aggregate([
        {
          $group: {
            _id: null,
            totalDue: {
              $sum: { $subtract: ["$amount", "$paidAmount"] },
            },
          },
        },
      ]),
    ]);

    const statusCounts = Object.fromEntries(
      attendanceByStatus.map((item) => [item._id, item.count])
    );

    res.json({
      success: true,
      data: {
        totalStudents,
        totalTeachers,
        totalClasses,
        todayAttendance,
        attendanceByStatus: statusCounts,
        totalFeesBilled: feeSummary[0]?.totalBilled || 0,
        totalFeesCollected: feeSummary[0]?.totalCollected || 0,
        totalFeesDue: pendingFees[0]?.totalDue || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};