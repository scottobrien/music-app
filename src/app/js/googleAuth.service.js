angular.module('app')
  .service('GoogleAuthService', function($log, AppConfigService, $state, $window, $rootScope, $timeout) {

    var provider = new firebase.auth.GoogleAuthProvider();
    var appConfig = AppConfigService.appConfig;
    var ls = $window.localStorage;
    $rootScope.isLoggedIn = ls.getItem('musicCred') ? true : false;

    function logoutTasks() {
      ls.removeItem('musicCred');
      ls.removeItem('musicUser');
      ls.removeItem('albumDetails');
      ls.removeItem('playlistDetails');
      $rootScope.isLoggedIn = false;
    }

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
          logoutTasks();
          $timeout(function() {
            $state.go('login');
          });
          $log.debug('signOut success');
        }).catch(function(error) {
          $log.debug('error', error);
        });
      },
      loginCheck: function() {
        if ($rootScope.isLoggedIn === false) {
          $state.go('login');
        }
      },
      provider: provider
    };
  });