angular.module('app')
    .controller('MainCtrl', function($log, GoogleAuthService, UserService, $rootScope, $state, $timeout, $scope, SpinnerService) {
        var vm = this;
        $scope.albumList = {};

        GoogleAuthService.loginCheck();

        $log.debug();

        //Check user and everything..
        UserService.userCheck().then(function(result){
          if (result.$value === null) {
            UserService.albumListInit().then(function(result) {
              //$log.debug('albumIniting', result);
              $scope.albumList = result;
              return;
            }).catch(function(error) {
              $log.debug('albumInit Error', error);
            });
            return;
          }
          UserService.albumArr.$loaded(function(result) {
            //$log.debug('Album Arr', result, UserService.albumArr.$value);
            $scope.albumList = result;
            SpinnerService.spinnerOff();
          }).catch(function(error) {
            $log.debug('albumArr Error', error);
          });
        });

        $log.debug('MainCtrl');

    });