describe('Login Controller', function() {

  var controller, GoogleAuthService, $state, $window, $rootScope, $timeout, $scope, ctrlBinded;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function($injector) {
    vm = {};
    controller = $injector.get('$controller');
    GoogleAuthService = $injector.get('GoogleAuthService');
    $state = $injector.get('$state');
    $window = $injector.get('$window');
    $rootScope = $injector.get('$rootScope');
    $timeout = $injector.get('$timeout');
    ctrlBinded = controller('LoginCtrl', {$scope: $scope});
    console.log(firebase);
  }));


  // it('GoogleAuth should exist', function() {
  //   expect(GoogleAuthService).toBeDefined();
  // });

  describe('initLogin', function() {
    it('should do stuff', function() {
      //ctrlBinded.initLogin();
     
    })
  });


});