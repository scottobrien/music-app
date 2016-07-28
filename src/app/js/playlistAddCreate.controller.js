angular.module('app')
  .controller('PlaylistAddCreateCtrl', function($log, $uibModalInstance, playlistArr, PlaylistService, UserService, $state){
    
    var vm = this;
    var playlist;

    vm.playlistArr = playlistArr;
    vm.playlistItemName = '';
    vm.playlistItem = {};
    vm.playlistListArr = [];
    vm.showGoTo = false;
    vm.playlistGo = null;

    UserService.getPlaylistArr().then(function(result) {
      vm.playlistListArr = result;
      //$log.debug('loading playlists', result);
    }).catch(function(error) {
      $log.debug('getPlaylist', error);
    });

    vm.close = function() {
      $uibModalInstance.dismiss('close');
    };

    vm.goToPlaylist = function() {
      var item = vm.playlistGo;
      $state.go('playlist-details', { id: item.id, item: item });
      $uibModalInstance.dismiss('close');
    };

    vm.playlistCreateInit = function() {
      vm.currentItem = {
        name: vm.playlistItemName
      }
      UserService.playlistAddArr(vm.currentItem).then(function(result) {
        //$log.debug('new item', result);
      }).catch(function(error) {
        $log.debug('playlistCreateInit', error)
      });
      vm.playlistItemName = '';
    };

    vm.initPlaylist = function(item) {
      vm.playlistGo = item;
      vm.activeItem = item.name;
      vm.currentItem = item;
    };

    vm.addToPlaylist = function() {
      vm.currentItem.items = PlaylistService.playListAdd(vm.currentItem, playlistArr);
      UserService.playlistSave(vm.currentItem).then(function() {
        vm.showGoTo = true;
        //$log.debug('saved');
      }).catch(function(error) {
        $log.debug('addToPlaylist', error);
      });
    };

    $log.debug('PlaylistAddCreateController');
  });