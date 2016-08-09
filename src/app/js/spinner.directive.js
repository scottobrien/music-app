angular.module('app')
  .directive('spinnerDirective', function($log) {
    return {
      restrict: 'AE',
      link: function(scope, elem, attr) {
        // TODO: 
        $log.debug('loader...TODO:');
      }
    };
  });