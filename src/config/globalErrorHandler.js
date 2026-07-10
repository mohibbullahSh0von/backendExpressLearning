const globalErrorHandler = (err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errorStack:
      process.env.ENV === "development" ? err.stack : "Something went wrong",
  });
};

export default globalErrorHandler;
