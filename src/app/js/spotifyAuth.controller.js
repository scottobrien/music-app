angular.module('app')
  .controller('SpotifyAuthCtrl', function ($log, $window, $state, $rootScope) {
    // var clientId = '9d7db3d6b7bb4984b48f51ac379fc91e';
    if (!$rootScope.isLoggedIn) {
      $state.go('login');
      return;
    }

    var vm = this;
    var accessToken = null;
    var ls = $window.localStorage;
    var url = $window.location.href;
    // Redirect is conditional based upon local or produciton
    var redirectUri = $window.location.hostname === 'localhost' ? 'http%3A%2F%2Flocalhost%3A3000%2Fspotify-auth%2F' : 'http%3A%2F%2Fscottify.scott-obrien.com%2Fspotify-auth%2F';
    vm.accessDenied = null;
    $rootScope.spotifyAuth = null;

    // Token expires in 1hr... so far nothing implemented for that scenario
    if (url.match('access_token=')) {
      accessToken = url.substring(url.indexOf('=')+1,url.indexOf('&'));
      ls.setItem('spotifyToken', accessToken);
      vm.accessDenied = false;
      $rootScope.spotifyAuth = true;
      $state.go('main');
    }

    if (url.match('access_denied')) {
      $log.log('there is an error');
      vm.accessDenied = true;
    }
    
    vm.initAuth = function () {
      $window.location.href = 'https://accounts.spotify.com/authorize?client_id=9d7db3d6b7bb4984b48f51ac379fc91e&redirect_uri=' +  redirectUri + '&response_type=token';
    };

  });
