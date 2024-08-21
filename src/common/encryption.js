const bcrypt = require('bcrypt');

function encrypt(data) {
  const saltRounds = 12;
  const encryptedData = bcrypt.hashSync(data, saltRounds);
  console.log(encryptedData);
  return encryptedData
}

function compare(data, encryptedData) {
  const isVerified = bcrypt.compareSync(data, encryptedData);
  console.log(isVerified);
  return isVerified;
}

module.exports = { encrypt, compare }