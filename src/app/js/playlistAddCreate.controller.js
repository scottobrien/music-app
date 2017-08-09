angular.module('app')
  .controller('PlaylistAddCreateCtrl', function ($log, $uibModalInstance, playlistArr, PlaylistService, UserService, $state){    
    var vm = this;
    var playlist;

    vm.playlistArr = playlistArr;
    vm.playlistItemName = '';
    vm.playlistItem = {};
    vm.playlistListArr = [];
    vm.showGoTo = false;
    vm.playlistGo = null;

    // Remedy to catch error
    $uibModalInstance.result.catch(function () { 
      $uibModalInstance.close();
    });

    UserService.getPlaylistArr().then(function (result) {
      vm.playlistListArr = result;
    }).catch(function (error) {
      $log.error('getPlaylist', error);
    });

    vm.close = function () {
      $uibModalInstance.dismiss('close');
    };

    vm.goToPlaylist = function () {
      var item = vm.playlistGo;
      $state.go('playlist-details', { id: item.id, item: item });
      $uibModalInstance.dismiss('close');
    };

    vm.playlistCreateInit = function () {
      vm.currentItem = {
        name: vm.playlistItemName
      }
      UserService.playlistAddArr(vm.currentItem).then(function (result) {
      }).catch(function (error) {
        $log.error('playlistCreateInit', error)
      });
      vm.playlistItemName = '';
    };

    vm.initPlaylist = function (item) {
      vm.playlistGo = item;
      vm.activeItem = item.name;
      vm.currentItem = item;
    };

    vm.addToPlaylist = function() {
      vm.currentItem.items = PlaylistService.playListAdd(vm.currentItem, playlistArr);
      UserService.playlistSave(vm.currentItem).then(function () {
        vm.showGoTo = true;
      }).catch(function (error) {
        $log.error('addToPlaylist', error);
      });
    };
  });
