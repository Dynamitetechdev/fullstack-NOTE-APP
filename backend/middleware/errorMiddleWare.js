const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);
  console.log("Status Code", statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV == "PROD" ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
