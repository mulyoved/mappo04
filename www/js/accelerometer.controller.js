(function () {
  'use strict';

  angular
    .module('starter')
    .controller('AccelerometerCtrl', controller);

  controller.$inject = ['$log', '$interval', '$cordovaDeviceMotion'];

  function controller($log, $interval, $cordovaDeviceMotion) {
    $log.log('AccelerometerCtrl');
    var vm = this;

    vm.version = '1.0';

    document.addEventListener("deviceready", function () {
      $log.log('deviceready', $cordovaDeviceMotion);

      $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
        var X = result.x;
        var Y = result.y;
        var Z = result.z;
        var timeStamp = result.timestamp;
        $log.log('AccelerometerCtrl deviceready', result);
        vm.motion = result;
      }, function(err) {
        vm.msg = err.message;
        $log.error(err);
      });

    }, false);

    vm.getAcceleration = function () {
      $log.log('getAcceleration');
      $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
        var X = result.x;
        var Y = result.y;
        var Z = result.z;
        var timeStamp = result.timestamp;
        vm.motion = result;
        $log.log('getAcceleration', result);
      }, function(err) {
        vm.msg = err.message;
        $log.error(err);
      });
    };

    vm.watchAcceleration = function () {
      $log.log('watchAcceleration', $cordovaDeviceMotion);
      var options = { frequency: 3000 };  // Update every 3 seconds

      vm.this_watch = $cordovaDeviceMotion.watchAcceleration(options);
      $log.log('watchAcceleration', vm.this_watch);

      vm.this_watch.then(
        function () {  /* unused */
        },
        function (err) {
          vm.msg = err.message;
        },
        function (motion) {
          vm.motion = motion;
        });
    };

    vm.clearWatch = function () {
      $log.log('clearWatch', vm.this_watch.watchId);
      // use watchID from watchAccelaration()
      $cordovaDeviceMotion.clearWatch(vm.this_watch.watchId);
    };
  }
}());



