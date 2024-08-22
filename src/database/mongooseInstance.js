const mongoose = require('mongoose');
async function mongoDBConnection() {
  const url = "mongodb+srv://itsmenishanp:h6P5zJjAS4e5oWkM@project1.bxvje.mongodb.net/CRUD_API"
  await mongoose.connect(url);
}

module.exports = mongoDBConnection