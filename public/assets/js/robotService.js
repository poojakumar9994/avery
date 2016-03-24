/* global angular */

angular
  .module('avery')
  .service('robotService', robotService);

function robotService ($http) {
  var service = this;

  service.move = function (direction) {
    $http
      .post('/robot/move', direction)
      .then(function (res) {
        console.log('move success', res);
      }, function (err) {
        console.log('move failed', err);
      });
  };
}
