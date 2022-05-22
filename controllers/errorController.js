// Send very little information about erros to clients
// when deployed
// Message should be human friendly
const AppError = require('../utils/appError');
// But send lot of information to developers
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.message,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

// Not leaking server details to client
const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
const handleDuplicateFieldsDB = (err) => {
  // Regular expression to find text enclosed with "" or ''
  // This returns an array of all text enclosed by those.
  // Take the first element of the returned array
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value ${value}. Please use another Value`;
  // 400 is bad request code
  return new AppError(message, 400);
};

const handleCastErrorDB = (err) => {
  const message = `invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  // To create an array of all the errors present in the
  // err object by iterating through them
  // Get the error element and store the error msg to the array
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid Input Data ${errors.join('.\n')}`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  // 500 is the standard error code. Internal server error
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // get a hard copy of the error object
    let error = { ...err };
    // Log error

    // castErrors
    if (err.name === 'CastError') error = handleCastErrorDB(error);

    if (err.name === 11000) error = handleDuplicateFieldsDB(error);

    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);

    // Send generic message
    sendErrorProd(error, res);
  }
};
