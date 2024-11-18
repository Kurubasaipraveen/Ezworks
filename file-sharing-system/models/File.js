const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const File = sequelize.define('File', {
  file_name: { type: DataTypes.STRING, allowNull: false },
  file_type: { type: DataTypes.STRING, allowNull: false },
  uploaded_by: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'id' } },
  encrypted_url: { type: DataTypes.STRING, allowNull: false },
  uploaded_at: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
});

module.exports = File;
