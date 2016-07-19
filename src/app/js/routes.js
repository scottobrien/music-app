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
        url: '/albums/:id',
        templateUrl: 'app/html/main.view.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('details', {
        url: '/album/details/:id',
        templateUrl: 'app/html/details.view.html',
        controller: 'DetailsCtrl',
        controllerAs: 'details',
        params: {item: 'item'}
        // resolve: {deets: function($stateParams) {
        //   return $stateParams
        // }}
      });
  });
