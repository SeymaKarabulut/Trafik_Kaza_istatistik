const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    error: 'Bir hata oluştu',
    message: err.message || 'Internal Server Error'
  });
};

module.exports = globalErrorHandler;