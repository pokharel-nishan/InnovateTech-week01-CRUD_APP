const globalExceptionHandler = (err, req, res, next) => {
  // const { status = 500, message = "Unexpected Error occurred." } = err;

  const { status, message } = err;
  return res.status(status).json({ "Message": message })
}

module.exports = globalExceptionHandler;