'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:MoviedetailsCtrl
 * @description
 * # MoviedetailsCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  .controller('MoviedetailsCtrl', function ($sce, $http,$route,$uibModal,$location,apiKey,
                                            $q,$scope,movieTomatoDetails,movieInfoDetails) {
      console.log(movieTomatoDetails);
      console.log(movieInfoDetails);
      //$http.get('http://cinestar.affpc.com:8080/api/')
      //    .then(function(response) {
      //        console.log(response);
      //    });
      $scope.displayTomatoData = {};
      $scope.displayTomatoData.imdbID = movieTomatoDetails.mtImdbID;
      $scope.displayTomatoData.movieDescription = movieTomatoDetails.mtMovieDescription;
      $scope.displayTomatoData.movieTitle = movieTomatoDetails.mtMovieTitle;
      $scope.displayTomatoData.allCritics = JSON.parse(movieTomatoDetails.mtAllCritics);
      $scope.displayTomatoData.topCritics = JSON.parse(movieTomatoDetails.mtTopCritics);
      $scope.displayTomatoData.audienceScore = JSON.parse(movieTomatoDetails.mtAudienceScore);
      $scope.displayTomatoData.genre = JSON.parse(movieTomatoDetails.mtGenre);
      /*Movie Details*/
      $scope.displayMovieDetails = movieInfoDetails;
      //calculate Runtime
      $scope.displayMovieDetails.infoMovieRuntime = parseInt($scope.displayMovieDetails.infoMovieRuntime.replace('min',''));
      var a = $scope.displayMovieDetails.infoMovieRuntime;
      var hours = Math.trunc(a/60);
      var minutes = a % 60;
      $scope.displayMovieDetails.infoMovieRuntime = ""+hours+" hr."+minutes+" min";
      $scope.displayMovieDetails.infoMoviePosterPath = $scope.displayMovieDetails.infoMoviePosterPath.replace("./app","..");
      //end calculate runtime
      $scope.displayMovieDetails.releaseYear = $scope.displayMovieDetails.infoMovieInTheatres
                                            .substr($scope.displayMovieDetails.infoMovieInTheatres.length - 4);
      console.log($scope.displayMovieDetails);
      /*End Movie Details*/

      /*Evaluating if the image should be fresh, rotten or certified*/
      //first for All Critics
      var tomatometerAC = $scope.displayTomatoData.allCritics.tomatometer;
      if(tomatometerAC >= 60 && tomatometerAC < 75){
          //fresh
          $scope.displayTomatoData.allCritics.tomatoImage = "/images/rt_fresh.jpg";
      }else if(tomatometerAC<=59) {
          //rotten
          $scope.displayTomatoData.allCritics.tomatoImage = "/images/rt_rotten.jpg";
      }else{
          //certified
          $scope.displayTomatoData.allCritics.tomatoImage = "/images/rt_certified.jpg";
      }
      //Second for top critics
      var tomatometerTC = $scope.displayTomatoData.topCritics.tomatometer;
      if(tomatometerTC >= 60 && tomatometerTC < 75){
          //fresh
          $scope.displayTomatoData.topCritics.tomatoImage = "/images/rt_fresh.jpg";
      }else if(tomatometerTC<=59) {
          //rotten
          $scope.displayTomatoData.topCritics.tomatoImage = "/images/rt_rotten.jpg";
      }else{
          //certified
          $scope.displayTomatoData.topCritics.tomatoImage = "/images/rt_certified.jpg";
      }

          /*end evaluating for freshness*/
      $scope.allBoldOrNormal = "criticsLink";
      $scope.topBoldOrNormal = "criticsLink";
      $scope.click = function (show) {
          if(show=='all'){
              $scope.tomatoMeter = $scope.displayTomatoData.allCritics;
              $scope.allBoldOrNormal = "criticsLinkTextBold";
              $scope.topBoldOrNormal = "criticsLink";
          }else{
              $scope.tomatoMeter = $scope.displayTomatoData.topCritics;
              $scope.allBoldOrNormal = "criticsLink";
              $scope.topBoldOrNormal = "criticsLinkTextBold";
          }
      };
      $scope.click('all'); //on load all critics should be selected
      /*For Audience Score*/
      var trimAudienceScore = $scope.displayTomatoData.audienceScore.averageRating;
      trimAudienceScore = parseInt(trimAudienceScore.replace('/5',""));
      //console.log(trimAudience);
      if(trimAudienceScore >= 3.5){
          $scope.displayTomatoData.audienceScore.audienceImage = "/images/rt_user_likes.jpg";
      }else if(trimAudienceScore < 3.5){
          $scope.displayTomatoData.audienceScore.audienceImage = "/images/rt_user_dislike.jpg";
      }
      $scope.audienceScore = $scope.displayTomatoData.audienceScore;
      $scope.audienceScore.ratingCount = $scope.audienceScore.ratingCount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      /*End Audience Score*/
      console.log($scope.displayTomatoData);
      /*Display Casts*/
      $scope.totalCasts = JSON.parse($scope.displayMovieDetails.infoMovieCasts);
      //Alter their profile path with ../images/credits/:profilePath
      for(var i=0;i<$scope.totalCasts.length;i++){
          if($scope.totalCasts[i].profile_path==null) {
              $scope.totalCasts[i].profile_path = "/images/credits/image_not_found.jpg";
          }
          else {
              $scope.totalCasts[i].profile_path = "/images/credits"+$scope.totalCasts[i].profile_path;
          }
      }
      $scope.show6CastsFunction = function show6CastsFunction() {
          $scope.show6Casts = {};
          for(var k=0;k<6;k++){
              $scope.show6Casts[k] = $scope.totalCasts[k];
          }
      };
      $scope.show6CastsFunction();
      $scope.show6Casts = {};
      for(var k=0;k<6;k++){
          $scope.show6Casts[k] = $scope.totalCasts[k];
      }
      /*Show All Casts*/
      $scope.ngShowAllText = true;
      $scope.show6CastsText = true;
      $scope.showAll = function showAll(param){
          $scope.show6Casts = $scope.totalCasts;
          $scope.ngShowAllText = !param;
          if($scope.ngShowAllText==true){
              $scope.show6CastsFunction();
          }
        };
      /*End Displaying casts*/
      /*Trailers*/

      //$scope.displayTomatoData.trailer = "https://www.youtube.com/embed?listType=search&amp;list="+$scope.displayTomatoData.movieTitle+"+Trailer";
      $scope.displayTomatoData.trailer = "https://www.youtube.com/results?search_query="+$scope.displayTomatoData.movieTitle+"+trailer";
      $scope.trustSrc = function(src) {
          console.log(src);
          return $sce.trustAsResourceUrl("https://www.youtube.com/embed?listType=search&amp;list="+src+"+Trailer");
      };
      $sce.trustAsResourceUrl($scope.displayTomatoData.trailer);
      /*End Trailers*/
  });
