const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelizeInstance");

class User extends Model { }

User.init({
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM,
    values: ["admin", "general-user", "guest"],
    allowNull: false,
  }
}, {
  sequelize,
  modelName: "User",
  tableName: "user"
});

module.exports = User;
