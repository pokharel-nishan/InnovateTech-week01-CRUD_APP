const jwt = require("jsonwebtoken");
const { readFromFile } = require("../data-access/dataAccess");
const { ResourceNotFound, BadRequest } = require("../exceptions/exceptionHandlers");

function verifyAccess(credentials) {
  const { username, password } = credentials;

  const users = readFromFile();

  const user = users.find(user => user.username === username);
  console.log(user)
  if (!user) {
    throw new ResourceNotFound("User does not exist.")
  }

  if (user.password !== password) {
    throw new BadRequest("Username and Password do not match.")
  }

  console.log(username, " : ", user.username);
  console.log(password, " : ", user.password);
  console.log("Role: ", user.role)

  const payload = {
    username: username,
    role: user.role
  };

  const SECRET_KEY = process.env.SECRET_KEY;
  const token = jwt.sign(payload, SECRET_KEY);

  return token;
}

module.exports = verifyAccess;