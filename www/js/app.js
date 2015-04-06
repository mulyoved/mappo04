// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .factory('mapInfoStorage', ['$window', function($window) {
    var key = 'selected-map';
    return {
      set: function(mapId) {
        $window.localStorage[key] = mapId;
      },
      get: function() {
        var mapId = $window.localStorage[key];
        var found = null;
        if (mapId) {
          angular.forEach(global_mapData, function(map) {
            var id = map["Short Code"];
            if (id === mapId) {
              found = map;
            }
          });
        }

        if (found) {
          return found;
        }
        else {
          return global_mapData[0];
        }
      }
    }
  }])

  .factory('indooratlas', ['$q', function ($q) {

    return {
      getCurrentAcceleration: function () {
        var q = $q.defer();

        navigator.indooratlas.getCurrentNavPosition(function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      watchAcceleration: function(options) {
        var q = $q.defer();

        var watchID = navigator.indooratlas.watchNavPosition(function(result) {
          q.notify(result);
        }, function(err) {
          q.reject(err);
        }, options);

        q.promise.cancel = function () {
          console.log('q.promise.cancel');
          navigator.indooratlas.clearWatch(watchID);
        };

        q.promise.clearWatch = function (id) {
          console.log('q.promise.clearWatch');
          navigator.indooratlas.clearWatch(id || watchID);
        };

        q.promise.watchID = watchID;

        return q.promise;
      },

      clearWatch: function (watchID) {
        return navigator.indooratlas.clearWatch(watchID);
      }
    }
  }])

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
      })

      .state('app.map', {
        cache: false,
        url: "/map",
        views: {
          'menuContent': {
            templateUrl: "templates/map.html",
            controller: 'MapCtrl as vm',
          }
        }
      })

      .state('app.map-info', {
        cache: false,
        url: "/map-info",
        views: {
          'menuContent': {
            templateUrl: "templates/map-info.html",
            controller: 'MapInfoCtrl as vm',
          }
        }
      })

      .state('app.position-info', {
        cache: false,
        url: "/position-info",
        views: {
          'menuContent': {
            templateUrl: "templates/position-info.html",
            controller: 'PositionInfoCtrl as vm',
          }
        }
      })

      .state('app.accelerometer', {
        cache: false,
        url: "/accelerometer",
        views: {
          'menuContent': {
            templateUrl: "templates/accelerometer-info.html",
            controller: 'AccelerometerCtrl as vm',
          }
        }
      })

      .state('app.logs', {
        cache: false,
        url: "/logs",
        views: {
          'menuContent': {
            templateUrl: "templates/logs.html"
          }
        }
      })
      .state('app.setup', {
        cache: false,
        url: "/setup",
        views: {
          'menuContent': {
            templateUrl: "templates/setup.html",
            controller: 'SetupCtrl as vm'
          }
        }
      })

      /*
      .state('app.single', {
        url: "/playlists/:playlistId",
        views: {
          'menuContent': {
            templateUrl: "templates/playlist.html",
            controller: 'PlaylistCtrl'
          }
        }
      })*/;
    // if none of the above states are matched, use this as the fallback
    //$urlRouterProvider.otherwise('/app/setup');
    $urlRouterProvider.otherwise('/app/map');
  });
