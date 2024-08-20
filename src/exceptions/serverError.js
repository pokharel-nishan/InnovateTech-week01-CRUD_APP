class ServerError extends Error {
  constructor(message = "Server Error", status = 500) {
    super(message);
    this.name = "Server Error";
    this.sttus = status;
  }
}

module.exports = ServerError;