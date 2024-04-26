const { DataTypes } = require("sequelize");
const { sequelize } = require("../Conn");

const Comments = sequelize.define(
  "comments",
  {
    commentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: { is: /^[a-zA-Z0-9]+$/i },
    },
    email: {
      type: DataTypes.STRING(25),
      validate: { isEmail: true },
      allowNull: false,
    },
    homePage: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: { isUrl: true },
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    validate: true,
    freezeTableName: true,
  }
);

module.exports = Comments;
