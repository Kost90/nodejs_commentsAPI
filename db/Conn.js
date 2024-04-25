// TODO:Need create DB and pass here information about DB

const { Sequelize } = require("sequelize");
// const {db, user, pw, host} = require('../config');

// DB Connection Configuration
const sequelize = new Sequelize("comments-api", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  // dialectOptions:{
  //     ssl:true
  // },
  // logging: false,
});

// Test connection function
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return false;
  }
}

module.exports = { sequelize, testConnection };
