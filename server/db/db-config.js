var Sequelize = require('sequelize');

/*
If you haven't done so yet, please go to terminal and enter "psql",
create an "admin" user with "admin" as the password, then using that -
go and "CREATE DATABASE nutristack;"
*/

// Using Sequelize connection URI
var db = new Sequelize('nutristack', 'admin', 'admin', {
  dialect: 'postgres',

  // Set below property if you want to enable logging
  // logging: false,
});

db.sync({force: true});

module.exports = db;
