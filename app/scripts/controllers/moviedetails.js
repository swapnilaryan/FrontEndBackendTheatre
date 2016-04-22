'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:MoviedetailsCtrl
 * @description
 * # MoviedetailsCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  .controller('MoviedetailsCtrl', function ($route,$location,searchMovieText,apiKey,movieTomato
                                            ,$q,$scope,movieApiaryInfo,theMovieDbInfo) {
      $scope.movieDetails = {};
      $scope.movieSearched = searchMovieText.get();
      //Fetch from movie apiary
      $scope.movieApiary = theMovieDbInfo.results[0];
      console.log("The Movie Apiary Results",$scope.movieApiary);
      movieApiaryInfo.getMovieById(theMovieDbInfo.results[0].id)
            .then(function (data) {
                $scope.theMovieDbId = data;
              // Fetch omdb results for the movie
              movieApiaryInfo.getTomatoResult1($scope.theMovieDbId.imdb_id)
                .then( function (data){
                    $scope.movieTomato1 = data;
                    var titleTomato = $scope.movieTomato1.tomatoURL;
                    if(titleTomato!=null) {
                        titleTomato = titleTomato.replace("http://www.rottentomatoes.com/m/", "");
                    }
                    searchMovieText.set(titleTomato);
                    movieTomato.getTomatoResult().then(function (data){
                        $scope.movieTomato = data;
                        console.log("Rotten tomato Results",$scope.movieTomato);
                    });
                });
              //end fetching rotten tomatoes
          });
      console.log("The Movie Id results",$scope.theMovieDbId);
      //end fetching apiary
  });
