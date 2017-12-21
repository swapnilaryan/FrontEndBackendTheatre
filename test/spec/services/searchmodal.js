'use strict';

describe('Service: searchModal', function () {

  // load the service's module
  beforeEach(module('backendTheatreApp'));

  // instantiate service
  var searchModal;
  beforeEach(inject(function (_searchModal_) {
    searchModal = _searchModal_;
  }));

  it('should do something', function () {
    expect(!!searchModal).toBe(true);
  });

});
