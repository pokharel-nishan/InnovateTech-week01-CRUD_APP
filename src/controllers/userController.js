const {
  fullUpdate,
  partialUpdate,
  getUsers,
  getParticularUser,
  addUser,
  deleteUser,
} = require("../services/userService");

const findAllUsers = (req, res) => {
  const result = getUsers();
  if (result.success) {
    return res.status(200).json(result.data)
  }
  return res.status(404).json({ Message: result.message })
};

const findParticularUser = (req, res) => {
  const id = req.params.id;
  const result = getParticularUser(id);
  if (result.success) {
    return res.status(200).json(result.data)
  }
  return res.status(404).json({ Message: result.message })
};

const createUser = (req, res) => {
  const userObj = req.body;
  const result = addUser(userObj);
  if (result.success) {
    return res.status(200).json(result.data)
  }
  return res.status(404).json({ Message: result.message })
};

const fullUserUpdate = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = fullUpdate(id, data);
  if (result.success) {
    return res.status(200).json(result.data)
  }
  return res.status(404).json({ Message: result.message });
};

const partialUserUpdate = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = partialUpdate(id, data);
  if (result.success) {
    return res.status(200).json(result.data)
  }
  return res.status(404).json({ Message: result.message });
};

const removeUser = (req, res) => {
  const userId = req.params.id;
  const result = deleteUser(userId);
  if (result.success) {
    return res.status(200).json(result.data)
  }
  return res.status(404).json({ Message: result.message })
};

module.exports = {
  findAllUsers,
  findParticularUser,
  createUser,
  fullUserUpdate,
  partialUserUpdate,
  removeUser,
};