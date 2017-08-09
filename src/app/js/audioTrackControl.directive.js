angular.module('app')
  .directive('audioTrackControl', function ($timeout, $sce) {
    return {
      restrict: 'AE',
      templateUrl: 'app/html/audio-track-control.tmpl.html',
      link: function (scope, elem) {
        var prevElem = elem.find('audio')[0];
        scope.toggleElem = true;
        scope.trackLink = $sce.trustAsResourceUrl(scope.track.preview_url);

        scope.initPlay = function () {
          scope.toggleElem = false;
          prevElem.play();
        };

        scope.initPause = function () {
          scope.toggleElem = true;
          prevElem.pause();
        };
      }
    };
  });
