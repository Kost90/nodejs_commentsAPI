const { DataTypes } = require("sequelize");
const { sequelize } = require("../Conn");

const SubComments = sequelize.define(
  "subcomments",
  {
    subCommentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(25),
      validate: { isEmail: true },
      allowNull: false,
    },
    homePage: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    validate: true,
    freezeTableName: true,
  }
);

module.exports = SubComments;
