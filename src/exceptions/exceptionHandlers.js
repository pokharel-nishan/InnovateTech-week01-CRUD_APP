class ServerError extends Error {
  constructor(message = "Server Error", status = 500) {
    super(message);
    this.status = status;
  }
}

class HttpError extends Error {
  constructor(message = "Client Error", status = 400) {
    super(message);
    this.status = status;
  }
}

class BadRequest extends HttpError {
  constructor(message = "Bad Request", status = 400) {
    super(message, status);
  }
}

class UnauthorizedException extends HttpError {
  constructor(message = "Unauthorized Exception", status = 401) {
    super(message, status);
  }
}

class ResourceForbiden extends HttpError {
  constructor(message = "Forbidden Resource", status = 403) {
    super(message, status);
  }
}

class ResourceNotFound extends HttpError {
  constructor(message = "Resource Not Found", status = 404) {
    super(message, status);
  }
}

module.exports = {
  ServerError,
  HttpError,
  BadRequest,
  UnauthorizedException,
  ResourceForbiden,
  ResourceNotFound,
};
