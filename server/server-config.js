var express = require('express');
var db = require('./db');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../public')));

/***** GET *****/

/***** DELETE *****/

/***** POST *****/
app.post('/api/supplements', function(req, res) {
  // expect to see the supplement object come through
  console.log(req.body);

  // we should be saving the object to the database and sending a response of success
  res.end();
});

module.exports = app;
