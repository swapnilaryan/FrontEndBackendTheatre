'use strict';

describe('Controller: SearchmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('backendTheatreApp'));

  var SearchmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchmodalCtrl = $controller('SearchmodalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SearchmodalCtrl.awesomeThings.length).toBe(3);
  });
});
