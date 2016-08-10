angular.module('app')
  .directive('audioTrackControl', function($log, $timeout, $sce) {
    return {
      restrict: 'AE',
      templateUrl: 'app/html/audio-track-control.tmpl.html',
      link: function(scope, elem, attr) {

        var prevElem = elem.find('audio')[0];
        scope.toggleElem = true;
        scope.trackLink = $sce.trustAsResourceUrl(scope.track.preview_url);

        scope.initPlay = function() {
          scope.toggleElem = false;
          prevElem.play();
        };

        scope.initPause = function() {
          scope.toggleElem = true;
          prevElem.pause();
        };
        //$log.debug('audioTrackControl', scope);
      }
    };
  });