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
app.get('/api/stack/:user', function(req, res) {

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

/***** DELETE *****/

/***** POST *****/
app.post('/api/stack', function(req, res) {
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

module.exports = app;
