(function () {
  'use strict';

  angular
    .module('starter')
    .controller('LogsCtrl', controller);

  controller.$inject = ['$log', '$interval'];

  function controller($log, $interval) {
    $log.log('SetupCtrl');
    var vm = this;

    vm.version = '1.0';
  }
}());



