angular.module('app')
    .controller('MainCtrl', function($log, GoogleAuthService, UserService, $rootScope, $state) {
        var vm = this;
        vm.playList = {};

        GoogleAuthService.loginCheck();

        UserService.checkUser().then(function(result) {
          vm.playList = result;
          if (result === undefined) {
            UserService.playListInit().then(function(result) {
              vm.playList = result.data;
            }).catch(function(error) { 
              $log.debug(error);
            });
          }
        }).catch(function(error) {
          $log.debug(error);
        });

        $log.debug('MainCtrl');

    });