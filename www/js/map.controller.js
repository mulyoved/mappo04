(function () {
  'use strict';

  angular
    .module('starter')
    .controller('MapCtrl', controller);

  controller.$inject = ['$log', '$interval', 'indooratlas', '$ionicModal', '$scope', '$timeout', 'mapInfoStorage', '$ionicPopup', '$state'];

  function controller($log, $interval, indooratlas, $ionicModal, $scope, $timeout, mapInfoStorage, $ionicPopup, $state) {
    $log.log('MapCtrl');
    var vm = this;
    vm.gotLocation = false;
    vm.map = mapInfoStorage.get();

    //To update map:
    // 1 - image size in map.html
    // 2 - set Ids in IndoorAtlasListener.java
    // 3 - update image name in startimg

    var startimg = './img/' + vm.map["Map File Name"];
    var dotColor = 'green';

    //------------------------------------------------
    /*
    $ionicModal.fromTemplateUrl('templates/indoor-atlass-calibration.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      vm.modal = modal;
      //vm.modal.show();
    });
    */

    var calibrationPopup = null;
    vm.openModal = function() {
      //vm.modal.show();
      calibrationPopup = $ionicPopup.alert({
        title: 'Position Info',
        subTitle: 'Calibration',
        template: '<div ng-if="!vm.gotLocation">' +
        '<p>Wait for position info, please move your phone</p>' +
        '</div>' +
        '<div ng-if="vm.gotLocation">' +
        '<p>Calibration Progress: {{vm.motion.calibration / 100 | number:0}}%</p>' +
        '</div>',
        buttons: []
      });
      calibrationPopup.then(function(res) {
      });

    };
    vm.closeModal = function() {
      //vm.modal.hide();
      if (calibrationPopup) {
        calibrationPopup.close();
        calibrationPopup = null;
      }
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      //vm.modal.remove();
      vm.closeModal();
    });

    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });

    //var startimg='./img/map.jpg';
    vm.version = '1.0';
    vm.image = startimg;

    var canDraw = false;
    var hasLocation = false;
    var image = document.getElementById('image');
    var canvas = document.getElementById('mapCanvas');
    var context = canvas.getContext('2d');
    var x;
    var y;
    var xDirection = 1;
    var yDirection = 1;

    function drawOnCanvas(x,y) {
      if (canDraw) {
        //console.log(canvas);

        context.drawImage(image, 0, 0);

        if (hasLocation) {
          var radius = 7;
          context.beginPath();
          context.arc(x, y, radius, 0, 2 * Math.PI, false);
          context.fillStyle = dotColor;
          context.fill();
          context.lineWidth = 1;
          context.strokeStyle = 'white';
          context.stroke();
        }
        //var imgURI = canvas.toDataURL();
        //$scope.image = imgURI;
      }
    }

    function startDraw(event) {
      $log.log('startDraw', event);

      canDraw = true;

      canvas.width = image.width;
      canvas.height = image.height;
      x = canvas.width / 2;
      y = canvas.height * 0.8;
      $log.log('startDraw', image, canvas.width, canvas.height, x, y);
      drawOnCanvas(x,y);

      /*
      var stop = $interval(function() {

        x += xDirection;
        y += yDirection;
        if (x<0 || x>image.width) {
          xDirection = xDirection * -1;
        }
        if (y<0 || y>image.height) {
          yDirection = yDirection * -1;
        }

        drawOnCanvas(x,y);
      }, 10);
      */
    }

    $log.log('Map controller started', image.complete, image);
    if (image.complete) { //check if image was already loaded by the browser
      startDraw();
    }else {
      $log.log('Assign event to image onload');
      image.onload = startDraw;
    }

    vm.watchAcceleration = function() {
      $log.log('watchAcceleration', indooratlas);
      var options = {
        venueId: vm.map['VenueID'],
        floorId: vm.map['FloorId'],
        floorPlanId: vm.map['FloorPlanId']
      };  // Update every 3 seconds

      vm.thisWatch = indooratlas.watchAcceleration(options);
      $log.log('watchAcceleration', vm.thisWatch);

      vm.thisWatch.then(
        function() {  /* unused */
        },
        function(err) {
          vm.msg = err.message;
          $log.error('watch error', vm.msg);

          var alertPopup = $ionicPopup.alert({
            title: 'Position Error',
            template: vm.msg
          });
          alertPopup.then(function(res) {
            //console.log('Thank you for not eating my delicious ice cream cone');
            $state.go('app.setup');
          });
        },
        function(motion) {
          vm.gotLocation = true;
          if (calibrationPopup) {
            if (motion.calibration < 0) {
              hasLocation = true;
              vm.closeModal();
            }
            else if (!calibrationPopup && motion.calibration >= 0) {
              hasLocation = false;
              vm.openModal();
            }
          }

          $log.log('Indooratlas update', motion);
          vm.motion = motion;
          drawOnCanvas(motion.i, motion.j);
        });
    };

    vm.clearWatch = function() {
      vm.gotLocation = false;
      $log.log('clearWatch', vm.thisWatch.watchID);
      // use watchID from watchAccelaration()
      indooratlas.clearWatch(vm.thisWatch.watchID);
    };

    document.addEventListener('deviceready', function () {
      $log.log('deviceready', indooratlas);
      vm.watchAcceleration();
    }, false);

    if (ionic.Platform.isWebView()) {
      vm.openModal();
    }
  }
}());