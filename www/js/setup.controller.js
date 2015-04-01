(function () {
  'use strict';

  angular
    .module('starter')
    .controller('SetupCtrl', controller);

  controller.$inject = ['$log', '$interval'];

  function controller($log, $interval) {
    $log.log('SetupCtrl');
    var vm = this;

    vm.version = '1.0';

    vm.runtest = function() {
      $log.log('run test');
      window.location = "cdvtests/index.html";
    }
  }
}());



