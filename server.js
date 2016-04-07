var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var setupRobot = require('./robot.js');
var PORT = 8080;

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

setupRobot(io);

http.listen(PORT, function () {
  console.log('Avery listening on port ' + PORT);
});
