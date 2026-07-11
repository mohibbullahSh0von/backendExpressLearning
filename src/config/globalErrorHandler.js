const globalErrorHandler = (err, req, res, next) => {
  return res.status(err.status).json({
    message: err,
    statusCode: err.status,
    errorStack:
      process.env.ENV === "development" ? err.stack : "Something went wrong",
  });
};

export default globalErrorHandler;
