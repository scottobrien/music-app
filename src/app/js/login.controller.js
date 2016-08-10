angular.module('app')
  .controller('LoginCtrl', function($log, GoogleAuthService, $state, $window, $rootScope, $scope, $timeout, $window) {
    
    var vm = this;
    var provider = GoogleAuthService.provider;
    var ls = $window.localStorage;

    $log.debug('LoginCtrl');

    if ($rootScope.isLoggedIn) {
      $state.go('main'); 
    }


    vm.initLogin = function() {
      firebase.auth().signInWithPopup(provider).then(function(result) {
        $rootScope.isLoggedIn = true;
        GoogleAuthService.credentialsSave(result.credential);
        GoogleAuthService.userSave(result.user);
        $timeout(function() {
          // , { id: result.user.uid }
          $state.go('main');  
        });
        
      }).catch(function(error) {
        $log.debug(error);
      });
    };
    
  });