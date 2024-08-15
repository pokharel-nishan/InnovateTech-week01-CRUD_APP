// send required role in authorization middleware as parameter, and then compare the user role with the required role for the path, and perform role based authorization 
const authorize = (req, res, next) => {
  const userRole = req.role;
  console.log("User Role: ", userRole);
  console.log("URL: ", req.url);
  console.log("Original URL: ", req.originalUrl)

  // hardcoded for testing
  const requiredRole = "user";
  if (userRole !== requiredRole) {
    return res.status(401).json({ "Message": "Forbidden Request." })
  }
  next();
}

module.exports = authorize;