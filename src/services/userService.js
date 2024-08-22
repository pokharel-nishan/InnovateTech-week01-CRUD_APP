const { v4: uuid } = require("uuid");
const User = require("../dto/user");
const {
  getAllUsers,
  postUser,
  findParticularUser,
  updateUser,
  removeUser,
} = require("../data-access/dataAccess");
const {
  ResourceNotFound,
  HttpError,
  BadRequest,
} = require("../exceptions/exceptionHandlers");
const { encrypt } = require("../common/encryption");

async function getUsers() {
  const users = await getAllUsers();
  if (Object.keys(users).length === 0) {
    throw new ResourceNotFound("No existing users in the system.");
  }
  return users;
}

async function getParticularUser(userId) {
  const user = await findParticularUser(userId);
  if (user) {
    return user;
  }
  throw new ResourceNotFound("User Not Found.");
}

function addUser(userObj) {
  const { email, username, password, firstname, lastname } = userObj;
  if (!email || !username || !password || !firstname || !lastname) {
    throw new BadRequest("Request body is not valid.");
  }
  const encryptedPassword = encrypt(password);
  const userId = uuid();
  let newUser = new User(
    userId,
    email,
    username,
    encryptedPassword,
    firstname,
    lastname,
    (role = "user"),
  );
  const isSuccess = postUser(newUser);
  if (!isSuccess) {
    throw new HttpError("Problem creating the user.");
  }
  return newUser;
}

async function fullUpdate(userId, data) {
  const { email, username, password, firstname, lastname } = data;
  if (!email || !username || !password || !firstname || !lastname) {
    throw new BadRequest("Request body is not valid.");
  }
  const user = await findParticularUser(userId);
  if (!user) {
    throw new ResourceNotFound("User Not Found.");
  }

  const encryptedPassword = encrypt(password);
  let updateValues = new User(
    userId,
    email,
    username,
    encryptedPassword,
    firstname,
    lastname,
    (role = "user"),
  );

  const isSuccess = updateUser(userId, updateValues);
  if (!isSuccess) {
    throw new HttpError("Problem writing into the file.");
  }
  return updateValues;
}

async function partialUpdate(userId, data) {
  const user = await findParticularUser(userId);
  if (!user) {
    throw new ResourceNotFound("User Not Found.");
  }
  if (data.password) {
    const password = data.password;
    const encryptedPassword = encrypt(password);
    data.password = encryptedPassword;
  }
  const updateValues = { ...user, ...data };
  const isSuccess = updateUser(userId, updateValues);
  if (!isSuccess) {
    throw new HttpError("Problem writing into the file.");
  }

  const entries = Object.entries(updateValues); // converting object into array

  const slicedValues = entries.slice(6); // sliced the array to take necessary values

  const newChanges = Object.fromEntries(slicedValues); // convert the sliced array into object

  return newChanges;
}

async function deleteUser(userId) {
  const user = await findParticularUser(userId);
  if (!user) {
    throw new ResourceNotFound("User Not Found.");
  }
  const isSuccess = removeUser(userId);
  if (!isSuccess) {
    throw new HttpError("Problem deleting the user.");
  }
  return user;
}

module.exports = {
  getUsers,
  getParticularUser,
  addUser,
  fullUpdate,
  partialUpdate,
  deleteUser,
};
