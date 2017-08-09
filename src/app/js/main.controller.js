angular.module('app')
    .controller('MainCtrl', function ($log, GoogleAuthService, UserService, $rootScope, $state, $timeout, $scope, SpinnerService, $window) {
      GoogleAuthService.loginCheck();

      //  Check user and everything..
      UserService.userCheck().then(function (result) {
        if (result.$value === null) {
          UserService.albumListInit().then(function (result) {
            $log.debug('albumIniting', result);
            $scope.albumList = result;
            return;
          }).catch(function (error) {
            $log.debug('albumInit Error', error);
          });
          return;
        }

        UserService.getAlubumArr().then(function (result) {
          if (result.length === 0) { // Work around for now, fix in future..
            $window.location.reload();
          }
          $scope.albumList = result;
          SpinnerService.spinnerOff();
        }).catch(function (error) {
          $log.debug('albumArr Error', error);
        });
      });
    });
