var express = require('express');
var db = require('./db');
var path = require('path');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var _ = require('lodash');

var app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../public')));

/***** GET *****/

// Get all stacks created by a user
app.get('/api/users/:user_id/stacks', function(req, res) {

  return db.User
    .findOne({
      where: {id: req.params.user_id},
    })
    .then(function(user) {
      if (!user) {
        return res.sendStatus(404).end();
      } else {
        return db.Stack.findAll({
          where: {UserId: req.params.user_id},
        });
      }
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

// Get a user's specific/one stack
app.get('/api/users/:user_id/stacks/:title', function(req, res) {

  return db.Stack
    .findOne({
      where: {
        UserId: req.params.user_id,
        title: req.params.title,
      },
    })
    .then(function(stack) {
      if (!stack) {
        res.sendStatus(400).end();
      } else {
        // after receiving the stack, you'll want to send to client
        res.json(stack.dataValues);
      }
    });

});

// Get supplements in a user's specific stack
app.get('/api/users/:user_id/stacks/:title/supplements', function(req, res) {

  return db.Stack
    .findOne({
      where: {title: req.params.title},
    })
    .then(function(stack) {
      return stack.getSupplements();
    })
    .then(function(supps) {
      res.send(supps);
    })
    .then(function(array) {
      res.json(array);
    });

});

/***** DELETE *****/

// Delete supplements in a user's specific stack
app.delete('/api/users/:user_id/stacks/:title/supplements', function(req, res) {
  // if no specific supp is specified through query, then delete all
  console.log('No specific supplement was specified - deleting all.');
  return db.Stack
    .findOne({
      where: {
        UserId: req.params.user_id,
        title: req.params.title,
      },
    })
    .then(function(stack) {
      if (_.size(req.query) === 0) {
        return stack.getSupplements();
      } else if (_.size(req.query) === 1) {
        return stack.getSupplements({
          where: {id: req.query.id},
        });
      }
    })
    .then(function(supplements) {
      // after getting the supplements, we iterate and delete each
      _.each(supplements, function(supplement) {
        supplement.destroy();
      });
    })
    .then(function() {
      // Send a "No Content" message
      res.sendStatus(204).end();
    });
});

app.delete('/api/stack/:title', function(req, res) {
  return db.Stack
    .findOne({
      where: {title: req.params.title},
    })
    .then(function(stack) {
      stack.destroy();

      // TODO: Send correct status code here
      res.end;
    })
    .catch(function(err) {
      console.err(err);
    });

});

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

  // send 201 - successful creation
  res.status(201).json();
});

// Modify the stack's attributes (add supplements)
app.post('/api/stack/:title', function(req, res) {
  return db.Stack
    .findOrCreate({
      where: {title: req.params.title},
    })
    .spread(function(stack) {
      return db.Supplement
        .create({
          name: req.body.name,
          qty: req.body.qty,
          dosage: req.body.dosage,
        })

        // TODO: Evaluate possible refactor
        .then(function(supplement) {
          supplement.addStacks([stack.get('id')]);

          // send 201 - successful creation
          res.status(201).json();
        });
    })
    .catch(function(err) {
      console.err(err);
    });

  res.end();
});

module.exports = app;
