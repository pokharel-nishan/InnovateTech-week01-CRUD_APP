class ClientError extends Error {
  constructor(message = "Client Error", status = 400) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}

class BadRequest extends ClientError {
  constructor(message = "Bad Request", status = 400) {
    super(message, status);
  }
}

class UnauthorizedException extends ClientError {
  constructor(message = "Unauthorized Exception", status = 401) {
    super(message, status);
  }
}

class ResourceForbiden extends ClientError {
  constructor(message = "Forbidden Resource", status = 403) {
    super(message, status);
  }
}

class ResourceNotFound extends ClientError {
  constructor(message = "Resource Not Found", status = 404) {
    super(message, status);
  }
}

module.exports = {
  ClientError,
  BadRequest,
  UnauthorizedException,
  ResourceForbiden,
  ResourceNotFound,
};

/*
class HttpError extends Error {
  constructor(status = 500, message) {
    super(message, status)
  }
}

class UnauthorizedError extends HttpError {
  constructor(message) {
    super(401, message = "Unauthorized Error")
  }
}
*/
