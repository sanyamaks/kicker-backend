const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    seederStorage: "sequelize",
    dialectOptions: {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    seederStorage: "sequelize",
    dialectOptions: {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  }
};
