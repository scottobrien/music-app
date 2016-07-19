angular.module('app')
  .controller('LoginCtrl', function($log, GoogleAuthService, $state, $window, $rootScope, $scope) {
    
    var vm = this;
    var provider = GoogleAuthService.provider;
    var ls = $window.localStorage;

    //ls.clear();

    $log.debug('LoginCtrl');

    $scope.$on('$stateChangeStart', function(event) {
        if (!$rootScope.isLoggedIn) {
          event.preventDefault();  
        }
    });

    vm.initLogin = function() {
      firebase.auth().signInWithPopup(provider).then(function(result) {
        $rootScope.isLoggedIn = true;
        GoogleAuthService.credentialsSave(result.credential);
        GoogleAuthService.userSave(result.user);
        $state.go('main', { id: result.user.uid });
      }).catch(function(error) {
        $log.debug(error);
      });
    };
    
  });