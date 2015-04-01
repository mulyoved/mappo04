(function () {
  'use strict';

  angular
    .module('starter')
    .controller('MapCtrl', controller);

  controller.$inject = ['$log', '$interval'];

  function controller($log, $interval) {
    $log.log('MapCtrl');
    var vm = this;

    var startimg='./img/map.jpg';
    vm.version = '1.0';
    vm.image=startimg;

    var image = document.getElementById('image');
    var canvas = document.getElementById('mapCanvas');
    var context = canvas.getContext('2d');
    var x;
    var y;
    var xDirection = 1;
    var yDirection = 1;

    function drawOnCanvas(x,y) {
      //console.log(canvas);

      context.drawImage(image, 0, 0);

      var radius = 7;
      context.beginPath();
      context.arc(x,y, radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'red';
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = 'white';
      context.stroke();

      //var imgURI = canvas.toDataURL();
      //$scope.image = imgURI;
    }

    function startDraw(event) {
      $log.log('startDraw', event);

      canvas.width = image.width;
      canvas.height = image.height;
      x = canvas.width / 2;
      y = canvas.height * 0.8;
      $log.log('startDraw', image, canvas.width, canvas.height, x, y);

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
    }

    $log.log('Map controller started', image.complete, image);
    if(image.complete) { //check if image was already loaded by the browser
      startDraw();
    }else {
      $log.log('Assign event to image onload');
      image.onload = startDraw;
    }
  }
}());



