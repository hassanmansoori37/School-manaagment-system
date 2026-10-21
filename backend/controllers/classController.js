import SchoolClass from "../models/Class.js";

export const createClass = async (req, res, next) => {
  try {
    const newClass = await SchoolClass.create(req.body);

    res.status(201).json({
      success: true,
      data: newClass,
    });
  } catch (error) {
    next(error);
  }
};

export const getClasses = async (req, res, next) => {
  try {
    const classes = await SchoolClass.find()
      .populate("classTeacher", "name email subject")
      .sort({ name: 1 });

    res.json({
      success: true,
      count: classes.length,
      data: classes,
    });
  } catch (error) {
    next(error);
  }
};

export const getClassById = async (req, res, next) => {
  try {
    const item = await SchoolClass.findById(req.params.id)
      .populate("classTeacher", "name email subject");

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const updateClass = async (req, res, next) => {
  try {
    const item = await SchoolClass.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const deleteClass = async (req, res, next) => {
  try {
    const item = await SchoolClass.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.json({
      success: true,
      message: "Class deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};