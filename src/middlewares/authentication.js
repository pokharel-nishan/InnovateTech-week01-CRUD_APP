const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    console.log("Header not found");
    return res.status(401).json({
      message: "Token is not provided. Please enter token in the header.",
    });
  }

  const token = authorization.split(" ")[1];
  const SECRET_KEY = process.env.SECRET_KEY;

  let verifiedData;
  try {
    verifiedData = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    console.log("Error: ", err.message);
    return res
      .status(401)
      .json({ Message: "Invalid Token. Please enter valid token. " });
  }

  const role = verifiedData.role;
  const userId = verifiedData.userId;
  req.role = role;
  req.userId = userId;
  next();
};

module.exports = auth;
