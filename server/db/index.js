// File defines the models within PG database
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

var Supplement = db.define('Supplement', {
  name: Sequelize.STRING,
  qty: Sequelize.INTEGER,
  dosage: Sequelize.INTEGER,
});

var User = db.define('User', {
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
});

// Supplement.belongsToMany(User);
// User.belongsToMany(Supplement);

db.sync({force: true});

exports.User = User;
exports.Supplement = Supplement;
