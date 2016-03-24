/* global angular nipplejs */

angular
  .module('avery', ['ngMaterial'])
  .controller('mainController', mainController);

function mainController ($mdSidenav, robotService) {
  var vm = this;

  vm.peopleCount = 0;
  vm.camera = false;
  vm.gas = false;
  vm.motion = false;
  vm.joystick = null;

  activate();

  function activate () {
    setupJoystick();
  }

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
      robotService.move(direction);
    });

    vm.joystick.on('end', function (e, data) {
      robotService.move('stop');
    });
  }

  vm.toggleSidebar = function () {
    $mdSidenav('sidebar').toggle();
  };

  vm.toggleSensor = function (sensor) {
    vm[sensor] = !vm[sensor];
  };
}
