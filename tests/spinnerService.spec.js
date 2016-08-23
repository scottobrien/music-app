describe('Spinner service', function() {

  var SpinnerService, rootScope, log;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function($injector) {
    SpinnerService = $injector.get('SpinnerService');
    rootScope = $injector.get('$rootScope');
    log = $injector.get('$log');
  }));

  it('should exist', function() {
    expect(SpinnerService).toBeDefined();
  });

  describe('spinnerOff()', function() {
    it('should be false', function() {
      SpinnerService.spinnerOff();
      expect(rootScope.spinning).toEqual(false);
    })
  });

  describe('.spinnerOn()', function() {
    it('should be true', function() {
      SpinnerService.spinnerOn();
      expect(rootScope.spinning).toEqual(true);
    })
  });

});