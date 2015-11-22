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
app.post('/api/supplements', function(req, res) {
  // console.log('Request body from POST to /api/supplements: ', req.body);
  // should only insert into db if the supplement doesn't exist already
  db.Supplement.create({
    name: req.body.name,
  });

  // we should be saving the object to the database and sending a response of success
  res.end();
});

module.exports = app;
