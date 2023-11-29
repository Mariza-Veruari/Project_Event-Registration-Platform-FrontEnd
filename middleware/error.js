const globalErrorHandler = (err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (err.code === 11000) err = handleDuplicateFieldsDB(err);
  if (err.name === "ValidationError") err = handleValidationErrorDB(err);
  sendError(err, req, res);
};
const sendError = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  console.error("ERROR ", err);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong.",
  });
};
const handleDuplicateFieldsDB = (err) => {
   
  const value = err.errmsg.match(/(["'])(\\?.)*\1/)[0];
  const message = `Duplcate field value: ${value}. Please use another value!`;
  return new AppError(message);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((err) => err.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

class AppError extends Error {
  statusCode;
  status;
  isOperationa;

  constructor(message, statusCode) {
    super(message);
     
    console.log("APP ERROR", message);

    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = globalErrorHandler;
