'use strict';

describe('Service: searchMovieText', function () {

  // load the service's module
  beforeEach(module('backendTheatreApp'));

  // instantiate service
  var searchMovieText;
  beforeEach(inject(function (_searchMovieText_) {
    searchMovieText = _searchMovieText_;
  }));

  it('should do something', function () {
    expect(!!searchMovieText).toBe(true);
  });

});
