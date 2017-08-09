angular.module('app')
  .controller('LoginCtrl', function ($log, GoogleAuthService, $state, $rootScope, $scope, $timeout, firebase) {
    var vm = this;
    var provider = GoogleAuthService.provider;

    if ($rootScope.isLoggedIn && $rootScope.spotifyAuth) {
      $state.go('main');
      return;
    }

    if ($rootScope.isLoggedIn) {
      $state.go('spotify-auth');
      return;
    }

    vm.initLogin = function () {
      firebase.auth().signInWithPopup(provider).then(function (result) {
        GoogleAuthService.credentialsSave(result.credential);
        GoogleAuthService.userSave(result.user);
        $timeout(function () {
          $rootScope.isLoggedIn = true;
          $state.go('spotify-auth');
        });
      }).catch(function (error) {
        $log.error(error);
      });
    };
  });
