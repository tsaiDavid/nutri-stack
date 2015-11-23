var express = require('express');
var db = require('./db');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../public')));

/***** GET *****/
app.get('/api/supplements', function(req, res) {
  // may have to implement findAll where user is curr
  db.Supplement.findAll({
    attributes: ['id', 'name'],
  })
    .then(function(x) {
      x.forEach(function(el) {
        console.log(el);
      });
    });

  res.end();
});

/***** DELETE *****/

/***** POST *****/
app.post('/api/stack', function(req, res) {
  return db.User

    // prevents duplicate user creation
    .findOrCreate({
      where: {username: req.body.username},
    })

    // use 'spread' in place of 'then' for promise-based compatability
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
