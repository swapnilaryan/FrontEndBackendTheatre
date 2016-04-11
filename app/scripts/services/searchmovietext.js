'use strict';

/**
 * @ngdoc service
 * @name backendTheatreApp.searchMovieText
 * @description
 * # searchMovieText
 * Service in the backendTheatreApp.
 */
angular.module('backendTheatreApp')
  .factory('searchMovieText', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
      var abc = {};
      abc.obj = "hello";
      abc.set = function set(param){
        abc.obj = param;
      };
      abc.get = function get(){
          return abc.obj;
      };
      return abc;
  });
