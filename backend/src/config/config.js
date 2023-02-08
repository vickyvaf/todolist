require("dotenv").config();

const config = {
  development: {
    username: process.env.DEVELOPMENT_MYSQL_USERNAME,
    password: process.env.DEVELOPMENT_MYSQL_PASSWORD,
    database: process.env.DEVELOPMENT_MYSQL_DATABASE,
    host: process.env.DEVELOPMENT_MYSQL_HOST,
    dialect: 'mysql',
  },
  production: {
    username: process.env.PRODUCTION_MYSQL_USERNAME,
    password: process.env.PRODUCTION_MYSQL_PASSWORD,
    database: process.env.PRODUCTION_MYSQL_DATABASE,
    host: process.env.PRODUCTION_MYSQL_HOST,
    dialect: 'mysql',
  },
};

module.exports = config;
