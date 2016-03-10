/* global angular */

angular
  .module('avery', ['ngMaterial'])
  .controller('mainController', mainController);

function mainController ($mdSidenav) {
  var vm = this;

  vm.toggleSidebar = function () {
    $mdSidenav('sidebar').toggle();
  };
}
