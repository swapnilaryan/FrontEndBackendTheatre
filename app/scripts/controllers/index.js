'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  //.controller('IndexCtrl',function ($scope, $uibModalInstance) {
  .controller('IndexCtrl' ,function ($scope,require,$location,$uibModalInstance,searchMovieText) {
      $scope.close = function () {
          $location.url('/about');
          $uibModalInstance.close();
      };
      console.log(searchMovieText.get());
      $scope.movieToSearch='';
      $scope.searchMovies = function (movieToSearch) {
          console.log('Movie entered',movieToSearch);
      };
  });