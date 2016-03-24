/* global angular */

angular
  .module('avery')
  .service('robotService', robotService);

function robotService ($http) {
  var service = this;

  service.move = function (direction) {
    $http
      .post('/robot/move', {
        direction: direction
      })
      .then(function (res) {
        console.log(res.data);
      }, function (err) {
        console.log(err);
      });
  };
}
