angular.module('app')
    .controller('MainCtrl', function($log, GoogleAuthService, UserService, $rootScope, $state, $timeout, $scope, SpinnerService) {
        var vm = this;
        //$scope.albumList = [];

        GoogleAuthService.loginCheck();

        //$log.debug('testing', UserService.albumArr.$loaded());

        //Check user and everything..
        UserService.userCheck().then(function(result){
          if (result.$value === null) {
            UserService.albumListInit().then(function(result) {
              $log.debug('albumIniting', result);
              $scope.albumList = result;
              return;
            }).catch(function(error) {
              $log.debug('albumInit Error', error);
            });
            return;
          }
          UserService.albumArr.$loaded().then(function(result) {
            $scope.albumList = result;
            SpinnerService.spinnerOff();
            $log.debug('Album Arr TODO', result);
          }).catch(function(error) {
            $log.debug('albumArr Error', error);
          });
        });

        $log.debug('MainCtrl');

    });