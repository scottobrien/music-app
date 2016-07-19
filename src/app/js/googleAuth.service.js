angular.module('app')
  .service('GoogleAuthService', function($log, AppConfigService, $state, $window, $rootScope) {

    var provider = new firebase.auth.GoogleAuthProvider();
    var appConfig = AppConfigService.appConfig;
    var ls = $window.localStorage;
    $rootScope.isLoggedIn = ls.getItem('musicCred') ? true : false;

    return {
      userSave: function(user) {
        var userJSON = JSON.stringify(user);
        ls.setItem('musicUser', userJSON);
      },
      credentialsSave: function(cred) {
        var credJSON = JSON.stringify(cred);
        ls.setItem('musicCred', credJSON);
      },
      credentialsGet: function() {
        return ls.getItem('musicCred');
      },
      logout: function() {
        firebase.auth().signOut().then(function() {
          $log.debug('signOut success');
          ls.removeItem('musicCred');
          ls.removeItem('musicUser');
          ls.removeItem('albumDetails');
          $rootScope.isLoggedIn = false;
          $state.go('login');
        }).catch(function(error) {
          $log.debug('error', error);
        });
      },
      loginCheck: function() {
        //$log.debug('loginCheck', $rootScope.isLoggedIn)
        if ($rootScope.isLoggedIn === false) {
          $state.go('login');
        }
      },
      provider: provider
    };


  });