(function() {
  'use strict';

  angular
    .module('starter')
    .controller('MapInfoCtrl', controller);

  controller.$inject = ['$log', 'mapInfoStorage'];

  function controller($log, mapInfoStorage) {
    $log.log('MapInfoCtrl');
    var vm = this;

    vm.map = mapInfoStorage.get();
  }

}());



