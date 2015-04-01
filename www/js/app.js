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

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
      })

      .state('app.map', {
        url: "/map",
        views: {
          'menuContent': {
            templateUrl: "templates/map.html",
            controller: 'MapCtrl as vm',
          }
        }
      })

      .state('app.position-info', {
        url: "/position-info",
        views: {
          'menuContent': {
            templateUrl: "templates/position-info.html"
          }
        }
      })

      .state('app.accelerometer', {
        url: "/accelerometer",
        views: {
          'menuContent': {
            templateUrl: "templates/accelerometer-info.html",
            controller: 'AccelerometerCtrl as vm',
          }
        }
      })

      .state('app.logs', {
        url: "/logs",
        views: {
          'menuContent': {
            templateUrl: "templates/logs.html"
          }
        }
      })
      .state('app.setup', {
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
    $urlRouterProvider.otherwise('/app/map');
  });