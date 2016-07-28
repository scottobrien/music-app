angular.module('app')
  .controller('PlaylistDetailsCtrl', function($log, GoogleAuthService, $stateParams, $window, UserService) {

    $log.debug('PlaylistDetailsCtrl', $stateParams.item);

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
      $log.debug('click', vm.playlistItem);
      var item = vm.playlistItem.$id;
      // UserService.playlistRemove(item).then(function(result) {
      //   $log.debug('removing?', result);
      // });
    }

  });