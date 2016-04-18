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
  .controller('IndexCtrl' ,function ($scope,$window,movieTomato,searchMovieText,$location,$uibModalInstance) {
      $scope.close = function () {
          //$location.url('/about');
          $uibModalInstance.close();
      };
      //console.log(searchMovieText.get());
      $scope.movieToSearch='';
      $scope.searchMovies = function (movieToSearch) {
          $scope.movieToSearch = movieToSearch;
          searchMovieText.set($scope.movieToSearch);
          console.log('Movie entered',$scope.movieToSearch);
          $scope.close();
          $scope.redirect = function redirect () {
              $location.url('/moviedetails');
          };
          $scope.redirect();
      };
  });