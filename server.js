var express = require('express');
var bodyParser = require('body-parser');
var robot = require('./robot.js');

var app = express();
var PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.use('/robot', robot);

app.listen(PORT, function () {
  console.log('Avery listening on port ' + PORT);
});
