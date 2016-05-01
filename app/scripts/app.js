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
    'ui.bootstrap',
    'ui.router'
  ])
  .config(function ($routeProvider) {
      // For any unmatched url, redirect to /
      //$urlRouterProvider.otherwise("/");
      //$stateProvider
      //    .state('main',{
      //        url: "/",
      //        templateUrl: "views/main.html",
      //        controller: 'MainCtrl',
      //        controllerAs: 'main'
      //    });

      $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: {
            nowShowingInTheatres : function (nowShowing){
                return nowShowing.nowShowingMovies();
            },
            upcomingMovies : function (upcomingMovies){
                return upcomingMovies.upcoming();
            }
        }
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
              movieTomatoDetails: function (movieDetails) {
                  return movieDetails.getTomatoResult();
              },
              movieInfoDetails: function (movieDetails) {
                  return movieDetails.getMovieInfo();
              }
          }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
