var express = require('express');
var db = require('./db');
var path = require('path');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

var app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../public')));

/***** GET *****/

// Client will receive an array of stack titles
app.get('/api/stacks/:user', function(req, res) {

  return db.User
    .findOne({
      where: {username: req.params.user},
    })
    .then(function(user) {
      var userToFind = user.get('id');
      return db.Stack.findAll({
        where: {UserId: userToFind},
      });
    })
    .then(function(stacks) {
      // Using Sequelize's built in promise (bluebird)
      return Sequelize.Promise.map(stacks, function(stack) {
        return stack.get('title');
      });
    })
    .then(function(titleArray) {
      res.json(titleArray);
    })
    .catch(function(err) {
      console.err(err);
    });

});

// Client will receive stack details, pulled from db
app.get('/api/stack/:title', function(req, res) {

  return db.Stack.findOne({
    where: {title: req.params.title},
  })
  .then(function(stack) {
    // after receiving the stack, you'll want to send to client
    res.json(stack.dataValues);
  });

});

/***** DELETE *****/

/***** POST *****/

app.post('/api/stacks', function(req, res) {
  return db.User

    // prevents duplicate user creation
    .findOrCreate({
      where: {username: req.body.username},
    })

    // use 'spread' in place of 'then' for findOrCreate compatability
    .spread(function(user) {
      return db.Stack.create({
        title: req.body.stacktitle,
        UserId: user.get('id'),
      });
    })
    .catch(function(err) {
      console.err(err);
    });

  res.end();
});

// Modify the stack's attributes (add supplements)
app.post('/api/stack/:title', function(req, res) {
  // Reach into db to add supplements
});

module.exports = app;
