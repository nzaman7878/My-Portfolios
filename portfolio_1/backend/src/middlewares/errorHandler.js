const errorHandler = (err, req, res, next) => {
  // Log the error to terminal for easier debugging
  console.error('\n--- SERVER ERROR ---');
  console.error(err);
  console.error('--------------------\n');

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorHandler };
