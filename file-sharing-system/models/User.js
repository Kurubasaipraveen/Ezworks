const { sequelize } = require('../config/db'); // Correct import
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  email_verified: { type: DataTypes.BOOLEAN, defaultValue: false }
});

// Hash password before saving
User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

module.exports = User;
