var five = require('johnny-five');
var RaspiCam = require('raspicam');

function setupRobot (io) {
  var board = new five.Board();
  var motorConfigs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;
  var camera, gas, motorRight, motorLeft, buzzer;

  board.on('ready', function () {
    camera = new RaspiCam({ mode: 'timelapse', output: './public/assets/img/motion_image.jpg', encoding: 'jpg', timelapse: 30, timeout: 0, quality: 100, width: 1920, height: 1080 });
    gas = { pin: new five.Pin(7), sensor: new five.Sensor({ pin: 'A0', threshold: 1 }) };
    motorRight = new five.Motor(motorConfigs.M1);
    motorLeft = new five.Motor(motorConfigs.M2);
    buzzer = new five.Piezo(3);

    io.on('connection', function (socket) {
      console.log('connected', socket.id);

      socket.on('camera:status', function (status) {
        if (status) {
          camera.start();
          camera.on('read', cameraChange);
        } else {
          camera.stop();
          camera.removeListener('read', cameraChange);
        }
      });

      socket.on('gas:status', function (status) {
        if (status) {
          gas.pin.high();
          gas.sensor.scale(0, 100).on('change', gasChange);
        } else {
          gas.pin.low();
          gas.sensor.removeListener('change', gasChange);
        }
      });

      socket.on('motion:status', function (status) {
        if (status) {
          //motion.mode = 1;
          console.log('buzzer');
         /*buzzer.play({
    // song is composed by an array of pairs of notes and beats
    // The first argument is the note (null means "no note")
    // The second argument is the length of time (beat) of the note (or non-note)
          song: [
            ["C4", 1 / 4],
            ["D4", 1 / 4],
            ["F4", 1 / 4],
            ["D4", 1 / 4],
            ["A4", 1 / 4],
            [null, 1 / 4],
            ["A4", 1],
            ["G4", 1],
            [null, 1 / 2],
            ["C4", 1 / 4],
            ["D4", 1 / 4],
            ["F4", 1 / 4],
            ["D4", 1 / 4],
            ["G4", 1 / 4],
            [null, 1 / 4],
            ["G4", 1],
            ["F4", 1],
            [null, 1 / 2]
          ],
          tempo: 100
        });*/
        //socket.emit("motion:change",{flag=1;})
        buzzer.tone(480, 1000);
        }
        else {
          buzzer.noTone();
          //motion.mode = 0;
        //  motion.removeListener();
        }
      });

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

      socket.on('disconnect', function () {
        console.log('disconnected', socket.id);
        stopEverything();
      });

      function cameraChange (yerror, timestamp, filename) {
        socket.emit('camera:change', 'motion_image.jpg?_t=' + timestamp);
      }

      function gasChange () {
        console.log(this.value);
        socket.emit('gas:change', this.value);
      }
    });
  });

  board.on('exit', function () {
    stopEverything();
  });

  function stopEverything () {
    camera.stop ? camera.stop() : null;
    gas.pin.low ? gas.pin.low() : null;
    motorRight.stop ? motorRight.stop() : null;
    motorLeft.stop ? motorLeft.stop() : null;
    //buzzer.pin ? buzzer.low() : null;
  }
}

module.exports = setupRobot;
