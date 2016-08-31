angular.module('app')
  .directive('headerDirective', function($log, $rootScope, GoogleAuthService, $timeout, UserService) {
    return {
      restrict: 'AE',
      templateUrl: 'app/html/header.tmpl.html',
      controllerAs: 'header',
      controller: function($scope, $rootScope) {

        var vm = this;
        $scope.isLoggedIn = $rootScope.isLoggedIn;

        $timeout(function() {
          vm.displayName = $rootScope.displayName;
          vm.email = $rootScope.email;
          vm.photoURL = $rootScope.photoURL;
        });

        vm.logout = function() {
          UserService.albumArr.$destroy();
          UserService.playlistArr.$destroy();
          UserService.userObj.$destroy();
          GoogleAuthService.logout();
        };

      }
    };
  });