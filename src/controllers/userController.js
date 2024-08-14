const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const User = require("../dto/user");

const dataFile = path.join(__dirname, "../data/users.json");

const getUsers = async (req, res) => {
  console.log("User: ", req.user);
  let userData;
  try {
    userData = fs.readFileSync(dataFile, "utf-8");
  } catch (err) {
    console.log("Error: ", err.message);
  }
  const data = JSON.parse(userData);
  return res.status(200).json(data);
};


const getParticularUser = (req, res) => {
  const id = req.params.id;
  let userData;
  try {
    userData = fs.readFileSync(dataFile, "utf-8");
  } catch (err) {
    return res.status(401).josn({ Message: err.message });
  }

  const users = JSON.parse(userData);
  users.forEach((user) => {
    if (id === user.id) {
      return res.status(200).json(user);
    }
  });
  return res.json({ Messsage: "User not found" });
};


const addUser = (req, res) => {
  console.log("Post route is hit.");

  let users = [];
  try {
    const existingData = fs.readFileSync(dataFile, "utf-8");
    users = JSON.parse(existingData);
  } catch (err) {
    return res.status(401).josn({ Message: err.message });
  }

  const { username, password, firstname, lastname } = req.body;

  let newUser = new User(
    (id = uuid()),
    username,
    password,
    firstname,
    lastname
  );

  users.push(newUser);

  const newUsers = JSON.stringify(users);
  let saveUser;
  try {
    saveUser = fs.writeFileSync(dataFile, newUsers);
  } catch (err) {
    console.log(err.message);
  }

  console.log(saveUser);

  return res
    .status(201)
    .json({ message: "User successfully created.", "User ": saveUser });
};


const updateUser = (req, res) => {
  const id = req.params.id;
  const { username, password, firstname, lastname } = req.body;

  let userData;
  try {
    userData = fs.readFileSync(dataFile, "utf-8");
  } catch (err) {
    return res.status(401).json({ Message: err.message });
  }

  const users = JSON.parse(userData);

  let updatedUser;
  users.forEach((user) => {
    if (id === user.id) {
      user.username = username;
      user.password = password;
      user.firstname = firstname;
      user.lastname = lastname;

      updatedUser = user;
    }
  });

  const updatedData = JSON.stringify(users);
  try {
    fs.writeFileSync(dataFile, updatedData);
  } catch (err) {
    console.log(err.message);
  }
  return res.status(200).json(updatedUser);
};


const deleteUser = (req, res) => {
  const userId = req.params.id;

  let userData;
  try {
    userData = fs.readFileSync(dataFile, "utf-8");
  } catch (err) {
    return res.status(401).json({ Message: err.message });
  }

  const users = JSON.parse(userData);

  const updatedUsers = users.filter((user) => {
    return user.id !== userId;
  });

  console.log(updatedUsers);
  try {
    fs.writeFileSync(dataFile, JSON.stringify(updatedUsers));
  } catch (err) {
    return res.status(404).json({ Message: err.message });
  }

  return res.status(200).json({ Messsage: "User is successfully deleted." });
};

module.exports = {
  getUsers,
  getParticularUser,
  addUser,
  updateUser,
  deleteUser,
};
