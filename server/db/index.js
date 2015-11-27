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
  },
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
Stack.belongsTo(User);

// M:M relationship
Supplement.belongsToMany(Stack, {through: 'StackSupplement', onDelete: 'cascade'});
Stack.belongsToMany(Supplement, {through: 'StackSupplement', onDelete: 'cascade'});

// Uncomment following line when you want to wipe DB
// db.sync({force: true});
db.sync();

exports.User = User;
exports.Stack = Stack;
exports.Supplement = Supplement;
