'use strict';

describe('Service: apiKey', function () {

  // load the service's module
  beforeEach(module('backendTheatreApp'));

  // instantiate service
  var apiKey;
  beforeEach(inject(function (_apiKey_) {
    apiKey = _apiKey_;
  }));

  it('should do something', function () {
    expect(!!apiKey).toBe(true);
  });

});
