function authorize(allowedRoles) {
  return (req, res, next) => {
    const userRole = req.role;
    if (allowedRoles.includes(userRole)) {
      console.log(userRole, " : ", allowedRoles);
      return next();
    }
    return res.status(402).json({ "Message": "Forbidden Request." })
  };
};

module.exports = authorize;