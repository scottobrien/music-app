angular.module('app')
  .service('SpinnerService', function ($log, $rootScope) {

    $rootScope.spinning = true;

    return {
      spinnerOff: function () {
        return $rootScope.spinning = false;
      },
      spinnerOn: function () {
        $rootScope.spinning = true;
      }
    }
  });
