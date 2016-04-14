/* global angular nipplejs io */

angular
  .module('avery', ['ngMaterial'])
  .controller('mainController', mainController);

function mainController ($mdSidenav, $scope) {
  var vm = this;
  var socket = io();

  vm.peopleCount = 0;
  vm.camera = false;
  vm.gas = false;
  vm.motion = false;
  vm.joystick = null;

  activate();

  function activate () {
    setupJoystick();
    setupSocketListeners();
  }

  vm.toggleSidebar = function () {
    $mdSidenav('sidebar').toggle();
  };

  function setupJoystick () {
    var options = {
      zone: document.getElementById('joystick'),
      color: '#3F51B5',
      mode: 'static',
      position: {
        top: '45%',
        left: '10%'
      }
    };

    vm.joystick = nipplejs.create(options);

    vm.joystick.on('dir', function (e, data) {
      var direction = data.direction.angle;
      socket.emit('move', direction);
    });

    vm.joystick.on('end', function (e, data) {
      socket.emit('move', 'stop');
    });
  }

  vm.toggleSensor = function (sensor) {
    vm[sensor] = !vm[sensor];
    //console.log('toggled ' + sensor);
    socket.emit(sensor + ':status', vm[sensor]);
  };

  function setupSocketListeners () {
    var $motionImage = document.getElementById('motion-image');
    socket.on('camera:change', function (fileUrl) {
      $motionImage.src = '/public/assets/img/' + fileUrl;
    });

    socket.on('gas:change', function (value) {
      console.log(value);
    });
  }
}
