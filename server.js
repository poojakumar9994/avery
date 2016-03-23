var express = require('express');
var five = require('johnny-five');

var board = new five.Board();

var app = express();
var PORT = 8080;

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

board.on('ready', function () {
  app.get('/led', function (req, res) {
    var led = new five.Led(13);
    led.blink(500);
  });
});

app.listen(PORT, function () {
  console.log('Avery listening on port ' + PORT);
});
