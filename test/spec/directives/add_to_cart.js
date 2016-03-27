'use strict';

describe('Directive: addToCart', function () {

  // load the directive's module
  beforeEach(module('backendTheatreApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<add-to-cart></add-to-cart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the addToCart directive');
  }));
});
