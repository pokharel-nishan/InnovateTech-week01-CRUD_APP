const {
  fullUpdate,
  partialUpdate,
  getUsers,
  getParticularUser,
  addUser,
  deleteUser,
} = require("../services/userService");

const findAllUsers = (req, res) => {
  return res.status(200).json(getUsers());
};

const findParticularUser = (req, res) => {
  const id = req.params.id;
  return res.status(200).json(getParticularUser(id));
};

const createUser = (req, res) => {
  const userObj = req.body;
  return res.status(200).json(addUser(userObj));
};

const fullUserUpdate = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  return res.status(200).json(fullUpdate(id, data));
};

const partialUserUpdate = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  return res.status(200).json(partialUpdate(id, data));
};

const removeUser = (req, res) => {
  const userId = req.params.id;
  return res.status(200).json(deleteUser(userId));
};

module.exports = {
  findAllUsers,
  findParticularUser,
  createUser,
  fullUserUpdate,
  partialUserUpdate,
  removeUser,
};
