angular.module('app')
  .controller('DetailsCtrl', function($log, $stateParams, GoogleAuthService, $window, UserService, PlaylistService, $scope, $uibModal, $timeout) {

    GoogleAuthService.loginCheck();
    
    var vm = this;
    var ls = $window.localStorage;
    var item;
    var getItem;
    var localDetailsItem;

    vm.playlistArr = [];

    $scope.tracks = {};
    $scope.releaseDate = '';
    $scope.artist = '';

    if ($stateParams.item.hasOwnProperty('name')) {
      item = JSON.stringify($stateParams);
      ls.setItem('albumDetails', item);
    }

    getItem = ls.getItem('albumDetails');
    localDetailsItem = JSON.parse(getItem);

    vm.item = localDetailsItem.item;
    $scope.rating = localDetailsItem.item.albumRating;

    UserService.trackListInit(localDetailsItem.item.href).then(function(result) {
      $scope.tracks = result.tracks;
      //$log.debug($scope.tracks);
      $scope.releaseDate = result.release_date;
      $scope.artist = result.artists;
    }).catch(function(error) {
      $log.debug(error);
    });

    //Rating stuff
    vm.rating = 0;
    vm.max = 5;
    vm.isReadonly = false;

    vm.initRating = function() {
      UserService.saveAlbumArr(localDetailsItem.item.$id, $scope.rating).then(function(result) {
        //$log.debug('save?', result);
      }).catch(function(error) {
        $log.debug('rating error', error);
      });
    }

    //Playlist init
    vm.isActive = [];
    vm.playlistInit = function(item, idx) {
      vm.isActive[idx] = !vm.isActive[idx];
      $timeout(function() {
        PlaylistService.playlistArrService(item, vm.playlistArr);
      });
    }

    //Add To Playlist modal
    $scope.animationsEnabled = true;
    vm.addToPlaylist = function() {
      //$log.debug(vm.playlistArr);
      var modalInstance = $uibModal.open({
                            animation: $scope.animationsEnabled,
                            size: 'md',
                            templateUrl: 'app/html/playlist-add-create.modal.html',
                            controller: 'PlaylistAddCreateCtrl',
                            controllerAs: 'playlist',
                            resolve: {
                              playlistArr: function () {
                                return vm.playlistArr;
                              }
                            }
                          });
    }

    $log.debug('DetailsController');

  });