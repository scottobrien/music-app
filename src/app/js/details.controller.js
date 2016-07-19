angular.module('app')
  .controller('DetailsCtrl', function($log, $stateParams, GoogleAuthService, $window, UserService, $scope) {

    GoogleAuthService.loginCheck();
    
    var vm = this;
    var ls = $window.localStorage;
    var item;
    var getItem;
    var localDetailsItem;

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

    UserService.trackListInit(localDetailsItem.item.href).then(function(result) {
      $scope.tracks = result.tracks;
      $scope.releaseDate = result.release_date;
      $scope.artist = result.artists;
    }).catch(function(error) {
      $log.debug(error);
    });

    $log.debug('DetailsController');

  });