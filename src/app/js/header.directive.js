angular.module('app')
  .directive('headerDirective', function($log, $rootScope, GoogleAuthService, $timeout) {
    return {
      restrict: 'AE',
      templateUrl: 'app/html/header.tmpl.html',
      controllerAs: 'header',
      controller: function($scope, $rootScope) {
        var vm = this;
        vm.isLoggedIn = $rootScope.isLoggedIn;

        $timeout(function() {
          vm.displayName = $rootScope.displayName;
          vm.email = $rootScope.email;
          vm.photoURL = $rootScope.photoURL;
        });

        vm.logout = function() {
          GoogleAuthService.logout();
        };

      }
    };
  });