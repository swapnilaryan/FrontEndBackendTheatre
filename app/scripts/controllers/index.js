'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  .controller('IndexCtrl', function ($scope) {
      $scope.movie_to_search="";
      $scope.search_movies = function (movie_to_search) {
          console.log("Movie enterd",movie_to_search);
      }
  });
