const globalErrorHandler = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    message: err.message,
    statusCode: err.status || 500,
    errorStack: process.env.ENV === "development" ? err.stack : "",
  });
};

export default globalErrorHandler;
