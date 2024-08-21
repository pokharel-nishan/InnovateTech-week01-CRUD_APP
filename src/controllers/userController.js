const {
  fullUpdate,
  partialUpdate,
  getUsers,
  getParticularUser,
  addUser,
  deleteUser,
} = require("../services/userService");

const findAllUsers = async (req, res) => {
  return res.status(200).json(await getUsers());
};

const findParticularUser = async (req, res) => {
  const id = req.params.id;
  return res.status(200).json(await getParticularUser(id));
};

const createUser = async (req, res) => {
  const userObj = req.body;
  return res.status(200).json(await addUser(userObj));
};

const fullUserUpdate = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  return res.status(200).json(await fullUpdate(id, data));
};

const partialUserUpdate = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  return res.status(200).json(await partialUpdate(id, data));
};

const removeUser = async (req, res) => {
  const userId = req.params.id;
  return res.status(200).json(await deleteUser(userId));
};

module.exports = {
  findAllUsers,
  findParticularUser,
  createUser,
  fullUserUpdate,
  partialUserUpdate,
  removeUser,
};
