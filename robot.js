var robot = require('express').Router();
// var five = require('johnny-five');
var RaspiCam = require('raspicam');

// var board = new five.Board();
// var motorConfigs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;
var camera, motorRight, motorLeft;

camera = new RaspiCam({
  mode: 'timelapse',
  output: './public/assets/img/motion_image.jpg',
  encoding: 'jpg',
  timelapse: 40,
  timeout: 5000,
  quality: 100
});

camera.on('start', function (err, timestamp) {
  console.log('timelapse started at ' + timestamp);
});

camera.on('read', function (err, timestamp, filename) {
  console.log('timelapse image captured with filename: ' + filename);
});

camera.on('exit', function (timestamp) {
  console.log('timelapse child process has exited');
});

camera.on('stop', function (err, timestamp) {
  console.log('timelapse child process has been stopped at ' + timestamp);
});

// board.on('ready', function () {
//   motorRight = new five.Motor(motorConfigs.M1);
//   motorLeft = new five.Motor(motorConfigs.M2);

//   robot.post('/move', function (req, res) {
//     var direction = req.body.direction;
//     switch (direction) {
//       case 'up':
//         motorRight.forward(255);
//         motorLeft.forward(255);
//         break;
//       case 'down':
//         motorRight.reverse(255);
//         motorLeft.reverse(255);
//         break;
//       case 'left':
//         motorRight.forward(255);
//         motorLeft.reverse(255);
//         break;
//       case 'right':
//         motorRight.reverse(255);
//         motorLeft.forward(255);
//         break;
//       case 'stop':
//         motorLeft.stop();
//         motorRight.stop();
//         break;
//     }
//     res.send('moving ' + direction);
//   });
// });

robot.get('/camera', function (req, res) {
  camera.start();
  // setTimeout(function () {
  //   camera.stop();
  // }, 1000);
});

// board.on('exit', function () {
//   camera.stop();
//   motorRight.stop();
//   motorLeft.stop();
// });

module.exports = robot;
