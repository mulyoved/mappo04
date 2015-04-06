(function () {
  'use strict';

  angular
    .module('starter')
    .controller('SetupCtrl', controller);

  controller.$inject = ['$log', 'mapInfoStorage'];

  function controller($log, mapInfoStorage) {
    $log.log('SetupCtrl');
    var vm = this;

    vm.version = '1.0';
    vm.mapsList = [];

    var selectedMap = mapInfoStorage.get();

    angular.forEach(global_mapData, function(map) {
      vm.mapsList.push({ id: map, text: map["Short Code"]});
      map.id = map["Short Code"];
      if (selectedMap["Short Code"] === map["Short Code"]) {
        vm.selected_map = {
          value: map,
          text: map["Short Code"]
        };
      }
    });
    //$log.log('vm.maps_list', vm.mapsList);


    vm.runtest = function() {
      $log.log('run test');
      window.location = "cdvtests/index.html";
    };

    vm.showMapInfo = function() {
      $log.log(vm.selected_map);
    };

    vm.selectedMap = function(mapId) {
      mapInfoStorage.set(mapId);
      //selectedMap = mapInfoStorage.get();
    }
  }
}());



