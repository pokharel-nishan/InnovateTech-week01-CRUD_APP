const { v4: uuid } = require("uuid");
const User = require("../dto/user");
const { readFromFile, writeIntoFile } = require("../data-access/dataAccess");
const { ResourceNotFound, HttpError } = require("../exceptions/exceptionHandlers");

function getUsers() {
  const users = readFromFile();
  if (!users) {
    throw new ResourceNotFound("No existing users in the system.");
  }
  return users;
}

function getParticularUser(userId) {
  const users = readFromFile();
  if (!users) {
    throw new ResourceNotFound("No existing users in the system.");
  };
  const user = users.find(user => user.id === userId);
  if (user) {
    return user;
  }
  throw new ResourceNotFound("User Not Found.");
}

function addUser(userObj) {
  let users = readFromFile();
  if (!users) {
    throw new ResourceNotFound("No existing users in the system.");
  }
  const { username, password, firstname, lastname } = userObj;
  let newUser = new User(
    (id = uuid()),
    username,
    password,
    firstname,
    lastname,
    role = "general_user"
  );
  users.push(newUser);
  const isSuccess = writeIntoFile(users);
  if (!isSuccess) {
    throw new HttpError("Problem writing into the file.")
  }
  return newUser;
}

function fullUpdate(id, data) {
  const users = readFromFile();
  if (!users) {
    throw new ResourceNotFound("No existing users in the system.");
  };
  const { username, password, firstname, lastname } = data;
  let updatedUser;
  users.forEach((user) => {
    if (id === user.id) {
      user.username = username;
      user.password = password;
      user.firstname = firstname;
      user.lastname = lastname;
      user.role = "general_user"
      updatedUser = user;
    }
  });
  const isSuccess = writeIntoFile(users);
  if (!isSuccess) {
    throw new HttpError("Problem writing into the file.")
  }
  return updatedUser;
}

function partialUpdate(userId, data) {
  const users = readFromFile();
  if (!users) {
    throw new ResourceNotFound("No existing users in the system.");
  };
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    throw new ResourceNotFound("User Not Found.")
  }

  users[userIndex] = {
    ...users[userIndex],
    ...data,
  };
  const isSuccess = writeIntoFile(users);
  if (!isSuccess) {
    throw new HttpError("Problem writing into the file.")
  }
  return users[userIndex];
}

function deleteUser(userId) {
  const users = readFromFile();
  if (!users) {
    throw new ResourceNotFound("No existing users in the system.");
  };
  let deletedUser;
  users.forEach((user) => {
    if (userId === user.id) {
      deletedUser = user;
    }
  });
  if (!deletedUser) {
    throw new ResourceNotFound("User Not Found.");
  }
  const remainingUsers = users.filter((user) => {
    return user.id !== userId;
  });
  const isSuccess = writeIntoFile(remainingUsers);
  if (!isSuccess) {
    throw new HttpError("Problem writing into the file.")
  }
  return deletedUser;
}

module.exports = {
  getUsers,
  getParticularUser,
  addUser,
  fullUpdate,
  partialUpdate,
  deleteUser,
};