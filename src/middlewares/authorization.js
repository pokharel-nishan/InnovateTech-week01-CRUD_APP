// send required role in authorization middleware as parameter, and then compare the user role with the required role for the path, and perform role based authorization 
function authorize(allowedRoles) {
  return (req, res, next) => {
    const userRole = req.role;
    console.log(userRole)
    console.log(allowedRoles)
    if (allowedRoles.includes(userRole)) {
      console.log(userRole, " : ", allowedRoles);
      return next();
    }
    return res.status(402).json({ "Message": "Forbidden Request." })
  };
};

module.exports = authorize;