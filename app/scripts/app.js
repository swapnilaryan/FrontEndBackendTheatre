'use strict';

/**
 * @ngdoc overview
 * @name backendTheatreApp
 * @description
 * # backendTheatreApp
 *
 * Main module of the application.
 */
angular
  .module('backendTheatreApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/moviedetails', {
          templateUrl: 'views/moviedetails.html',
          controller: 'MoviedetailsCtrl',
          controllerAS: 'moviedetails',
          resolve: {
              theMovieDbInfo: function (movieApiaryInfo) {
                  return movieApiaryInfo.getSearchDetails();
              }
          }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
