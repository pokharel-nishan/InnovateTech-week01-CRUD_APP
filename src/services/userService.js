const { v4: uuid } = require("uuid");
const User = require("../dto/user");
const { readFromFile, writeIntoFile } = require("../data-access/dataAccess");

function getUsers() {
  const users = readFromFile();
  if (!users) {
    return {
      success: false,
      message: "Error occurred while reading data. Please try again.",
    };
  }
  return { success: true, data: users };
}

function getParticularUser(userId) {
  const users = readFromFile();
  if (!users) {
    return {
      success: false,
      message: "Error occurred while reading data. Please try again.",
    };
  }
  const user = users.find(user => user.id === userId);
  if (user) {
    return { success: true, data: user };
  }
  return {
    success: false,
    message: "User not found.",
  };
}

function addUser(userObj) {
  let users = readFromFile();
  if (!users) {
    return {
      success: false,
      message: "Error occurred while reading data. Please try again.",
    };
  }
  const { username, password, firstname, lastname } = userObj;
  let newUser = new User(
    (id = uuid()),
    username,
    password,
    firstname,
    lastname,
    role = "user"
  );
  users.push(newUser);
  const isSuccess = writeIntoFile(users);
  if (!isSuccess) {
    return {
      success: false,
      message: "Error occurred while creating user. Please try again.",
    };
  }
  return { success: true, data: newUser };
}

function fullUpdate(id, data) {
  const users = readFromFile();
  if (!users) {
    return {
      success: false,
      message: "Error occurred while reading data. Please try again.",
    };
  }
  const { username, password, firstname, lastname } = data;
  let updatedUser;
  users.forEach((user) => {
    if (id === user.id) {
      user.username = username;
      user.password = password;
      user.firstname = firstname;
      user.lastname = lastname;
      user.role = "user"
      updatedUser = user;
    }
  });
  const isSuccess = writeIntoFile(users);
  if (!isSuccess) {
    return {
      success: false,
      message: "Error occurred while updating user. Please try again.",
    };
  }
  return { success: true, data: updatedUser };
}

function partialUpdate(userId, data) {
  const users = readFromFile();
  if (!users) {
    return {
      success: false,
      message: "Error occurred while reading data. Please try again.",
    };
  }
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  users[userIndex] = {
    ...users[userIndex],
    ...data,
  };
  const isSuccess = writeIntoFile(users);
  if (!isSuccess) {
    return {
      success: false,
      message: "Error occurred while updating user. Please try again.",
    };
  }
  return { success: true, data: users[userIndex] };
}

function deleteUser(userId) {
  const users = readFromFile();
  if (!users) {
    return {
      success: false,
      message: "Error occurred while reading data. Please try again.",
    };
  }
  let deletedUser;
  users.forEach((user) => {
    if (userId === user.id) {
      deletedUser = user;
    }
  });
  if (!deletedUser) {
    return {
      success: false,
      message: "User does not exist.",
    };
  }
  const remainingUsers = users.filter((user) => {
    return user.id !== userId;
  });
  const isSuccess = writeIntoFile(remainingUsers);
  if (!isSuccess) {
    return {
      success: false,
      message: "Error occurred while deleting user. Please try again.",
    };
  }
  return { success: true, data: deletedUser };
}

module.exports = {
  getUsers,
  getParticularUser,
  addUser,
  fullUpdate,
  partialUpdate,
  deleteUser,
};

/*
const { v4: uuid } = require("uuid");
const User = require("../dto/user");
const { readFromFile, writeIntoFile } = require("../data-access/dataAccess");

function getUsers() {
  const users = readFromFile();
  if (!users) {
    return { success: false, message: "Error occurred while reading data. Please try again." }
  }
  return { success: true, data: users }
}

function getParticularUser(id) {
  const users = readFromFile();
  if (!users) {
    return res.status(404).json({
      Message: "Error occurred while reading data. Please try again.",
    });
  }
  users.forEach((user) => {
    if (id === user.id) {
      return res.status(200).json(user);
    }
  });
  return res.json({ Messsage: "User not found" });
}

function addUser(userObj) {
  let users = readFromFile();
  if (!users) {
    return res.status(404).json({
      Message: "Error occurred while reading data. Please try again.",
    });
  }
  const { username, password, firstname, lastname } = userObj;
  let newUser = new User(
    (id = uuid()),
    username,
    password,
    firstname,
    lastname
  );
  users.push(newUser);
  const isSuccess = writeIntoFile(users);
  if (!isSuccess) {
    return res.status(404).json({
      Message: "Error occurred while creating user. Please try again.",
    });
  }
  return res
    .status(201)
    .json({ message: "User successfully created.", "User ": saveUser });
}

function fullUpdate(id, data) {
  const users = readFromFile();
  if (!users) {
    return res.status(404).json({
      Message: "Error occurred while reading data. Please try again.",
    });
  }
  const { username, password, firstname, lastname } = data;
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
  const isSuccess = writeIntoFile(users);
  if (!isSuccess) {
    return res.status(404).json({
      Message: "Error occurred when updating user. Please try again.",
    });
  }
  return res.status(200).json(updatedUser);
}

function partialUpdate(id, data) {
  const users = readFromFile();
  if (!users) {
    return res.status(404).json({
      Message: "Error occurred while reading data. Please try again.",
    });
  }
  let updatedUser;
  users.forEach((user) => {
    if (id === user.id) {
      updatedUser = {
        ...user,
        ...data,
      };
    }
  });
  const isSuccess = writeIntoFile(users);
  if (!isSuccess) {
    return res.status(404).json({
      Message: "Error occurred when updating user. Please try again.",
    });
  }
  return res.status(200).json(updatedUser);
}

function deleteUser(id) {
  const users = readFromFile();
  if (!users) {
    return res.status(404).json({
      Message: "Error occurred while reading data. Please try again.",
    });
  }
  const updatedUsers = users.filter((user) => {
    return user.id !== userId;
  });
  const isSuccess = writeIntoFile(updatedUsers);
  if (!isSuccess) {
    return res.status(404).json({
      Message: "Error occurred when deleting user. Please try again.",
    });
  }
  return res.status(200).json({ Messsage: "User is successfully deleted." });
}

module.exports = {
  getUsers,
  getParticularUser,
  addUser,
  fullUpdate,
  partialUpdate,
  deleteUser,
};

*/
