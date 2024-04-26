const { DataTypes } = require("sequelize");
const { sequelize } = require("../Conn");

const User = sequelize.define(
  "User",
  {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: { is: /^[a-zA-Z0-9]+$/i },
      unique: true,
    },
    email: {
      type: DataTypes.STRING(25),
      validate: { isEmail: true },
      allowNull: false,
      unique: true,
    },
    homePage: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: { isUrl: true },
    },
  },
  {
    timestamps: false,
    validate: true,
    freezeTableName: true,
  }
);

module.exports = User;
