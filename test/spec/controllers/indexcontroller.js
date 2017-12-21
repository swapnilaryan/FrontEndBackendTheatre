'use strict';

describe('Controller: IndexcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('backendTheatreApp'));

  var IndexcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IndexcontrollerCtrl = $controller('IndexcontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(IndexcontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
