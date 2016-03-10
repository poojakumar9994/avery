/* global angular */

angular
  .module('avery', ['ngMaterial'])
  .controller('mainController', mainController);

function mainController ($mdSidenav) {
  var vm = this;

  vm.peopleCount = 0;
  vm.camera = false;
  vm.gas = false;
  vm.motion = false;

  vm.toggleSidebar = function () {
    $mdSidenav('sidebar').toggle();
  };

  vm.toggleSensor = function (sensor) {
    vm[sensor] = !vm[sensor];
  };
}
