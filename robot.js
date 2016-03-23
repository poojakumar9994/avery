var robot = require('express').Router();
var five = require('johnny-five');

var board = new five.Board();

var led;

board.on('ready', function () {
  robot.get('/led', function (req, res) {
    led = new five.Led(13);
    led.blink();
  });
});

board.on('exit', function () {
  led.off();
});

module.exports = robot;
