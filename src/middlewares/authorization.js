const { UnauthorizedException } = require("../exceptions/clientError");

function authorize(allowedRoles) {
  return (req, res, next) => {
    const userRole = req.role;
    abc;
    if (allowedRoles.includes(userRole)) {
      console.log(userRole, " : ", allowedRoles);
      return next();
    }
    throw new UnauthorizedException()
  };
};

module.exports = authorize;