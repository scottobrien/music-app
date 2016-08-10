angular.module('app')
  .controller('PlaylistDetailsCtrl', function($log, GoogleAuthService, $stateParams, $window, UserService, $state, $scope) {

    GoogleAuthService.loginCheck();

    var vm = this;
    var ls = $window.localStorage;
    var localDetailsItem;
    var getItem;

    if ($stateParams.item.hasOwnProperty('$id')) {
      $stateParams.item = JSON.stringify($stateParams);
      ls.setItem('playlistDetails', $stateParams.item);
    }

    getItem = ls.getItem('playlistDetails');
    localDetailsItem = JSON.parse(getItem);

    vm.playlistItem = localDetailsItem.item;

    vm.removePlaylist = function() {
      var item = vm.playlistItem;
      UserService.playlistRemove(item);
      $state.go('playlists');
    }

    $log.debug('PlaylistDetailsCtrl');
  });