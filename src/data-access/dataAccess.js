// const User = require("../models/userModel");

const User = require("../models/mongooseUserModel");
const { ServerError } = require("../exceptions/exceptionHandlers");

async function getAllUsers() {
  try {
    const userData = await User.find();
    return userData;
  } catch (err) {
    throw new ServerError(err.message);
  }
}

async function findParticularUser(userId) {
  try {
    const user = await User.findById({
      _id: userId
    });
    return user;
  } catch (err) {
    throw new ServerError(err.message);
  }
}

async function postUser(user) {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (err) {
    throw new ServerError(err.message);
  }
}

async function updateUser(userId, updateValues) {
  try {
    await User.findByIdAndUpdate(userId, updateValues);
    return true;
  } catch (err) {
    throw new ServerError(err.message);
  }
}

async function removeUser(userId) {
  try {
    const isSuccess = await User.deleteOne({ _id: userId });
    return isSuccess;
  } catch (err) {
    throw new ServerError(err.message);
  }
}

module.exports = {
  findParticularUser,
  getAllUsers,
  postUser,
  updateUser,
  removeUser,
};
