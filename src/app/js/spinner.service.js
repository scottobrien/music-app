angular.module('app')
  .service('SpinnerService', function($log, $rootScope) {

    $rootScope.spinning = true;
    $log.debug('SpinnerService');

    return {
      spinnerOff: function() {
        return $rootScope.spinning = false;
      },
      spinnerOn: function() {
        $rootScope.spinning = true;
      }
    }

  });