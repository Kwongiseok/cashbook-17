export default function errorControl(err, req, res, next) {
  let statusCode = err.statusCode;
  if (!statusCode) {
    statusCode = 500;
    next(err);
  }
  const message = err.message;
  res.status(statusCode).send({ status: statusCode, message: message });
}
