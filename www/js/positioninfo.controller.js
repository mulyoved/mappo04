(function() {
  'use strict';

  angular
    .module('starter')
    .controller('PositionInfoCtrl', controller);

  controller.$inject = ['$log', '$interval', 'indooratlas'];

  function controller($log, $interval, indooratlas) {
    $log.log('PositionInfoCtrl');
    var vm = this;

    vm.version = '1.0';

    document.addEventListener('deviceready', function () {
      $log.log('deviceready', indooratlas);

      /*
      indooratlas.getCurrentAcceleration().then(function(result) {
        $log.log('AccelerometerCtrl deviceready', result);
        vm.motion = result;
      }, function(err) {
        vm.msg = err.message;
        $log.error(err);
      });
      */
    }, false);

    vm.getAcceleration = function() {
      $log.log('getAcceleration');
      indooratlas.getCurrentAcceleration().then(function(result) {
        vm.motion = result;
        $log.log('getAcceleration', result);
      }, function(err) {
        vm.msg = err.message;
        $log.error(err);
      });
    };

    vm.watchAcceleration = function() {
      $log.log('watchAcceleration', indooratlas);
      var options = {};  // Update every 3 seconds

      vm.thisWatch = indooratlas.watchAcceleration(options);
      $log.log('watchAcceleration', vm.thisWatch);

      vm.thisWatch.then(
        function() {  /* unused */
        },
        function(err) {
          vm.msg = err.message;
        },
        function(motion) {
          $log.log('Indooratlas update', motion);
          vm.motion = motion;
        });
    };

    vm.clearWatch = function() {
      $log.log('clearWatch', vm.thisWatch.watchID);
      // use watchID from watchAccelaration()
      indooratlas.clearWatch(vm.thisWatch.watchID);
    };

  }

}());



