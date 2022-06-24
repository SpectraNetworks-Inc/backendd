const { DataTypes } = require('sequelize');
const SQL = require('../utils/SQL.js');

const Test = SQL.define('TestData', {
    testdata: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Test.sync();

module.exports = Test;