var express = require('express');
var db = require('./db');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../public')));

// app.get('/', function(req, res) {
//   res.send('hello world');
// });

module.exports = app;
