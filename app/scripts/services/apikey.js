'use strict';

/**
 * @ngdoc service
 * @name backendTheatreApp.apiKey
 * @description
 * # apiKey
 * Service in the backendTheatreApp.
 */
angular.module('backendTheatreApp')
  .service('apiKey', function ($location) {
    // AngularJS will instantiate a singleton by calling "new" on this function
      var apiUrl = "";
      return {
          key: '2c9306d42037dfb0de0fc3f153819054',
          movieApiUrl: 'http://api.themoviedb.org/3/',
          apiUrlFn: function(){
              if($location.host()=='localhost')
              {
                  apiUrl = "http://localhost:8000/api/";
              }
              else {
                  apiUrl = "http://cinestar.affpc.com:8080/api/";
              }
              return apiUrl;
          }
      };
  });
