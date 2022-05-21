module.exports = (err, req, res, next) => {
  // 500 is the standard error code. Internal server error
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.message,
    message: err.message,
  });
};
