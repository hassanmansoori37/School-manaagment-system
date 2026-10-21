const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "A record with this unique value already exists",
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID or value",
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.statusCode && err.statusCode < 500
      ? err.message
      : "Internal server error",
  });
};

export default errorMiddleware;