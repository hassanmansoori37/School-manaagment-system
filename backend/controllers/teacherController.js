import Teacher from "../models/Teacher.js";

export const createTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.create(req.body);

    res.status(201).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};

export const getTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: teachers.length,
      data: teachers,
    });
  } catch (error) {
    next(error);
  }
};

export const getTeacherById = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.json({ success: true, data: teacher });
  } catch (error) {
    next(error);
  }
};

export const updateTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.json({ success: true, data: teacher });
  } catch (error) {
    next(error);
  }
};

export const deleteTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.json({
      success: true,
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};