var robot = require('express').Router();
var five = require('johnny-five');

var board = new five.Board();
var motorConfigs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;

var led, motorRight, motorLeft;

board.on('ready', function () {
  led = new five.Led(13);
  motorRight = new five.Motor(motorConfigs.M1);
  motorLeft = new five.Motor(motorConfigs.M2);

  robot.post('/led', function (req, res) {
    led.blink();
  });

  robot.post('/move', function (req, res) {
    console.log(req.body);
    var direction = req.body.direction;
    switch (direction) {
      case 'up':
        motorRight.forward(255);
        motorLeft.forward(255);
        break;
      case 'down':
        motorRight.reverse(255);
        motorLeft.reverse(255);
        break;
      case 'left':
        motorRight.forward(255);
        motorLeft.reverse(255);
        break;
      case 'right':
        motorRight.reverse(255);
        motorLeft.forward(255);
        break;
      case 'stop':
        motorLeft.stop();
        motorRight.stop();
        break;
    }
    res.send('moving ' + direction);
  });
});

board.on('exit', function () {
  led.off();
  motorRight.stop();
  motorLeft.stop();
});

module.exports = robot;
