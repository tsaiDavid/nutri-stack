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

var User = db.define('User', {
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
});

var Stack = db.define('Stack', {
  title: Sequelize.STRING,
});

var Supplement = db.define('Supplement', {
  name: Sequelize.STRING,
  qty: Sequelize.INTEGER,
  dosage: Sequelize.INTEGER,
});

// TODO: Add other necessary relations, must have a one-to-many & many-to-many

// 1:M relationship
User.hasMany(Stack, {as: 'CustomStacks'});

// M:M relationship
Supplement.belongsToMany(Stack, {through: 'StackSupplement'});
Stack.belongsToMany(Supplement, {through: 'StackSupplement'});

db.sync({force: true});

exports.User = User;
exports.Supplement = Supplement;
