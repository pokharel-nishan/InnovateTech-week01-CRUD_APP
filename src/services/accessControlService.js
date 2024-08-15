const jwt = require("jsonwebtoken");
const { readFromFile } = require("../data-access/dataAccess");

function verifyAccess(credentials) {
  const { username, password } = credentials;

  const users = readFromFile();

  const user = users.find(user => user.username === username);
  console.log(user)
  if (!user) {
    return {
      success: false,
      message: "Invalid Credentials. Please try again."
    }
  }

  if (user.password !== password) {
    return {
      success: false,
      message: "Invalid Credentials. Please try again."
    }
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

  return {
    success: true, data: token,
  };
}

module.exports = verifyAccess;