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

const handleCastErrorDB = (err) => {
  const message = `invalid ${err.path}: ${err.value}`;
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
    // Send generic message
    sendErrorProd(error, res);
  }
};
