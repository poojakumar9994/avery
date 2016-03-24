var robot = require('express').Router();
var five = require('johnny-five');

var board = new five.Board();
var led = new five.Led(13);
var motorConfigs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;
var motorRight = new five.Motor(motorConfigs.M1);
var motorLeft = new five.Motor(motorConfigs.M2);

board.on('ready', function () {
  robot.post('/led', function (req, res) {
    led.blink();
  });

  robot.post('/move', function (req, res) {
    console.log(req.body);
    var direction = req.body.direction;
    switch (direction) {
      case 'up':
        motorRight.start(255);
        motorLeft.start(255);
        break;
      case 'down':
        motorRight.reverse(255);
        motorLeft.reverse(255);
        break;
      case 'left':
        motorRight.start(255);
        motorLeft.reverse(255);
        break;
      case 'right':
        motorRight.reverse(255);
        motorLeft.start(255);
        break;
      case 'stop':
        motorLeft.stop();
        motorRight.stop();
        break;
    }
    // for testing
    board.wait(1000, function () {
      motorRight.stop();
      motorLeft.stop();
    });
  });
});

board.on('exit', function () {
  led.off();
  motorRight.stop();
  motorLeft.stop();
});

module.exports = robot;
