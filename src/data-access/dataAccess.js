const User = require("../models/userModel");
const { ServerError } = require("../exceptions/exceptionHandlers");

async function getAllUsers() {
  try {
    const userData = await User.findAll();
    return userData;
  } catch (err) {
    throw new ServerError(err.message);
  }
}

async function findParticularUser(userId) {
  try {
    const user = await User.findOne({
      where: {
        userId,
      },
    });
    return user;
  } catch (err) {
    throw new ServerError(err.message);
  }
}

async function postUser(user) {
  try {
    await User.create(user);
    return true;
  } catch (err) {
    throw new ServerError(err.message);
  }
}

async function updateUser(userId, updateValues) {
  try {
    await User.update(updateValues, {
      where: {
        userId,
      },
    });
    return true;
  } catch (err) {
    throw new ServerError(err.message);
  }
}

async function removeUser(userId) {
  try {
    const isSuccess = await User.destroy({ where: { userId } });
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
