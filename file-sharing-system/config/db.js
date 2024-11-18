const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,  
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database connected!');
  } catch (error) {
    console.error('Unable to connect to the MySQL database:', error.message);
    process.exit(1);  // Exit if connection fails
  }
};

module.exports = { sequelize, connectDB };
