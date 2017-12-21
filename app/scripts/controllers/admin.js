'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  .controller('AdminCtrl', function ($scope,upcomingMovies,apiKey,$http) {
      //console.log(apiKey,"sxdcfgbhujmik",upcomingMovies);
      $scope.upcomingMovies = upcomingMovies;
      $scope.admin_upMovieDelete = function admin_upMovieDelete(upId, index){
          console.log(index);
          $http.delete(""+apiKey.apiUrlFn() + "db/upcoming/"+upId)
              .then(function(response){
                  $scope.upcomingMovies.splice(index,1);
                  //$http.get(""+apiKey.apiUrlFn() + "db/upcoming/")
                  //    .then(function(response){
                  //        $scope.upcomingMovies = response.data;
                  //    });
              });
      };
  });
