const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "../data/users.json");

function readFromFile() {
  let userData;
  try {
    userData = fs.readFileSync(dataFile, "utf-8");
  } catch (err) {
    console.log("Error: ", err.message);
    return null;
  }
  const data = JSON.parse(userData);
  return data;
}

function writeIntoFile(users) {
  const newUsers = JSON.stringify(users);
  try {
    fs.writeFileSync(dataFile, newUsers);
  } catch (err) {
    console.log(err.message);
    return false;
  }
  return true;
}

module.exports = {
  readFromFile,
  writeIntoFile,
};
