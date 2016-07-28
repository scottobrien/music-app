angular.module('app')
  .controller('PlaylistsCtrl', function($log, GoogleAuthService, UserService) {

    GoogleAuthService.loginCheck();

    var vm = this;

    UserService.getPlaylistArr().then(function(result) {
      vm.playlistListArr = result;
      //$log.debug('loading playlists', result);
    }).catch(function(error) {
      $log.debug('getPlaylist', error);
    });

    $log.debug('PlaylistsCtrl');
  });