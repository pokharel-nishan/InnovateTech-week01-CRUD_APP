const jwt = require("jsonwebtoken");
const {
  ResourceNotFound,
  BadRequest,
} = require("../exceptions/exceptionHandlers");
// const User = require("../models/userModel");
const User = require("../models/mongooseUserModel");
const { compare } = require("../common/encryption");

async function verifyAccess(credentials) {
  const { username, password } = credentials;

  console.log(username, password);
  const user = await User.findOne({
    username,
  });
  console.log(user);
  if (!user) {
    throw new ResourceNotFound("User does not exist.");
  }

  const isValidPassword = compare(password, user.password);
  if (!isValidPassword) {
    throw new BadRequest("Username and Password do not match.");
  }

  console.log(username, " : ", user.username);
  console.log(password, " : ", user.password);
  console.log("Role: ", user.role);

  const payload = {
    userId: user._id,
    role: user.role,
  };

  const SECRET_KEY = process.env.SECRET_KEY;
  const token = jwt.sign(payload, SECRET_KEY);
  console.log(token);
  return token;
}

module.exports = verifyAccess;
