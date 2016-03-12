/* global angular nipplejs */

angular
  .module('avery', ['ngMaterial'])
  .controller('mainController', mainController);

function mainController ($mdSidenav) {
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
      console.log(data.direction.angle);
      var bg = document.getElementById('content');
      switch (data.direction.angle) {
        case 'up':
          bg.style.backgroundPosition = 'top';
          break;
        case 'right':
          bg.style.backgroundPosition = 'right';
          break;
        case 'down':
          bg.style.backgroundPosition = 'bottom';
          break;
        case 'left':
          bg.style.backgroundPosition = 'left';
          break;
      }
    });
  }

  vm.toggleSidebar = function () {
    $mdSidenav('sidebar').toggle();
  };

  vm.toggleSensor = function (sensor) {
    vm[sensor] = !vm[sensor];
  };
}
