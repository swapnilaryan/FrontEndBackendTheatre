'use strict';

describe('Controller: MoviedetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('backendTheatreApp'));

  var MoviedetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MoviedetailsCtrl = $controller('MoviedetailsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MoviedetailsCtrl.awesomeThings.length).toBe(3);
  });
});
