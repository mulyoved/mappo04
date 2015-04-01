(function () {
  'use strict';

  angular
    .module('starter')
    .controller('PositionInfoCtrl', controller);

  controller.$inject = ['$log', '$interval'];

  function controller($log, $interval) {
    $log.log('PositionInfoCtrl');
    var vm = this;

    vm.version = '1.0';
  }
}());



