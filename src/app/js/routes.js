angular.module('app')
  .config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'app/html/login.view.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('main', {
        url: '/albums/',
        templateUrl: 'app/html/main.view.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('playlists', {
        url: '/playlists/',
        templateUrl: 'app/html/playlists.view.html',
        controller: 'PlaylistsCtrl',
        controllerAs: 'playlists'
      })
      .state('playlist-details', {
        url: '/playlist-details/',
        templateUrl: 'app/html/playlist-details.view.html',
        controller: 'PlaylistDetailsCtrl',
        controllerAs: 'playlistDetails',
        params: {item: 'item'}
      })
      .state('details', {
        url: '/album/details/',
        templateUrl: 'app/html/details.view.html',
        controller: 'DetailsCtrl',
        controllerAs: 'details',
        params: {item: 'item'}
      });
  });
