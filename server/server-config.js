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

// Get a user (or many users') details
app.get('/api/users/', function(req, res) {
  // if a username is provided as query, return user's info
  if (req.query.username) {
    return db.User
      .findOne({
        where: {username: req.query.username},
      })
      .then(function(user) {
        // an object is returned
        res.json(user);
      });

  // if a user id is provided, return user's info
  } else if (req.query.user_id) {
    return db.User
      .findOne({
        where: {id: req.query.user_id},
      })
      .then(function(user) {
        // an object is returned
        res.json(user);
      });

  // otherwise, return all user
  } else {
    return db.User
      .findAll({})
      .then(function(users) {
        return Sequelize.Promise.map(users, function(user) {
          return user.dataValues;
        });
      })
      .then(function(usersArray) {
        // an array of objects returned
        res.json(usersArray);
      })
      .catch(function(err) {
        console.err(err);
      });
  }
});

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
      console.log('Here are the supplements: ', supplements);

      // after getting the supplements, we iterate and delete each
      Sequelize.Promise.each(supplements, function(supplement) {
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

// Create a new user
app.post('/api/users', function(req, res) {
  return db.User
    .findOrCreate({
      where: {username: req.body.username},
    })
    .spread(function(user) {
      res.sendStatus(201).end();
    });
});

// Create a new unique stack for a particular user
app.post('/api/users/:user_id/stacks', function(req, res) {
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
    .then(function() {
      // send 201 - successful creation
      res.sendStatus(201).end();
    })
    .catch(function(err) {
      console.err(err);
    });

});

// Add supplements to a user's stack
app.post('/api/users/:user_id/stacks/:title', function(req, res) {
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
