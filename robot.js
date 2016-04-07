var five = require('johnny-five');
var RaspiCam = require('raspicam');

function setupRobot (io) {
  var board = new five.Board();
  var motorConfigs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;
  var camera, motorRight, motorLeft;

  board.on('ready', function () {
    motorRight = new five.Motor(motorConfigs.M1);
    motorLeft = new five.Motor(motorConfigs.M2);
    camera = new RaspiCam({ mode: 'timelapse', output: './public/assets/img/motion_image.jpg', encoding: 'jpg', timelapse: 1000, timeout: 0, quality: 100, width: 1920, height: 1080 });

    io.on('connection', function (socket) {
      console.log('a client has connected');

      socket.on('move', function (direction) {
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
      });

      socket.on('camera:status', function (status) {
        if (status) {
          camera.on('read', function (yerror, timestamp, filename) {
            io.emit('camera:picture', 'motion_image.jpg?_t=' + timestamp);
          });
          camera.start();
        } else {
          camera.stop();
        }
      });

      socket.on('disconnect', function () {
        stopEverything();
      });
    });
  });

  board.on('exit', function () {
    stopEverything();
  });

  function stopEverything () {
    camera.stop();
    motorRight.stop();
    motorLeft.stop();
  }
}

module.exports = setupRobot;
