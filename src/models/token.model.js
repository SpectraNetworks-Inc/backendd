const { DataTypes } = require('sequelize');
const SQL = require('../utils/SQL.js');

const Token = SQL.define('Token', {
    token: {
      type: DataTypes.STRING,
    },
    user: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.STRING,
    },
    expires: {
      type: DataTypes.DATE,
    },
    blacklisted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }
);
Token.sync();

module.exports = Token;
