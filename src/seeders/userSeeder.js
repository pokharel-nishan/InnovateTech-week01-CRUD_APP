const path = require("path");
const fs = require("fs");

const dataFile = path.join(__dirname, "../data/users.json");
const seedFile = path.join(__dirname, "../seeds/userSeed.json");

function userSeeder() {
  try {
    const seedData = fs.readFileSync(seedFile, "utf-8"); // read data from seedfile
    if (!fs.existsSync(dataFile)) {
      // check if file exists
      fs.writeFileSync(dataFile, seedData); // write data from seedData into datafile
      return;
    }

    if (fs.readFileSync(dataFile).length === 0) {
      // check if there is data in datafile
      fs.writeFileSync(dataFile, seedData); // write data from seedData into datafile
      return;
    }
  } catch (err) {
    console.log("Error Message: ", err.message);
    return;
  }
  return;
}

module.exports = userSeeder;
