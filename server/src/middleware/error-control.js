export default function errorControl(err, req, res, next) {
  let statusCode = err.statusCode;
  const message = err.message;
  if (!statusCode) {
    statusCode = 500;
    next(err);
  }
  res.status(statusCode).send({ status: statusCode, message: message });
}
