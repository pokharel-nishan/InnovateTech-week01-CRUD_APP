const { UnauthorizedException } = require("../exceptions/exceptionHandlers");

function authorize(allowedRoles) {
  return (req, res, next) => {
    const userRole = req.role;
    if (allowedRoles.includes(userRole)) {
      console.log(userRole, " : ", allowedRoles);
      return next();
    }
    throw new UnauthorizedException("Unauthorized Resource.");
  };
}

module.exports = authorize;
