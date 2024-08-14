const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { username, password } = req.body;

  const savedUsername = process.env.USER_NAME;
  const savedPassword = process.env.PASSWORD;

  console.log(username, " : ", savedUsername);
  console.log(password, " : ", savedPassword);

  if (savedUsername !== username || savedPassword !== password) {
    return res.status(401).json({ "Message": "Please enter valid username and password." });
  }

  const payload = {
    username: username
  }

  const SECRET_KEY = process.env.SECRET_KEY;
  const token = jwt.sign(payload, SECRET_KEY);

  return res.status(201).json({ "Message": "User successfully logged in.", "Token: ": token })

}

module.exports = login;
