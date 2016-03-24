var robot = require('express').Router();
var five = require('johnny-five');

var board = new five.Board();
// var motorConfigs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;
var led, motorRight;

board.on('ready', function () {
  robot.get('/led', function (req, res) {
    led = new five.Led(13);
    led.blink();
  });
  robot.get('/motor', function (req, res) {
    motorRight = new five.Motor(motorConfigs.M1);
    motorRight.start(225);
    board.wait(1000, function () {
      motorRight.stop();
    });
  });
});

board.on('exit', function () {
  led.off();
  motorRight.stop();
});

module.exports = robot;
