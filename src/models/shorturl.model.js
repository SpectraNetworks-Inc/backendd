const { nanoid }  = require('nanoid');
const { DataTypes } = require('sequelize');
const SQL = require('../utils/SQL.js');
const uuid = require('uuid/v4');

const ShortURL = SQL.define('ShortUrl', {
  full: {
    type: DataTypes.STRING,
    allowNull: false
  },
  short: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: () => nanoid(6)
  },
  clicks: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  createdByIP: {
    type: DataTypes.STRING,
  }
});
ShortURL.sync();

module.exports = ShortURL;
