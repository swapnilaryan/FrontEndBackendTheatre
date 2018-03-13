'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:MoviedetailsCtrl
 * @description
 * # MoviedetailsCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  .controller('MoviedetailsCtrl', function ($sce, localStorageService, $http,$route,$uibModal,$location,apiKey,
                                            $q,$scope,movieTomatoDetails,movieInfoDetails, movieShowTime, getComments, movieDetails) {
      console.log("---------",movieTomatoDetails);
      console.log("++++++++++++",movieInfoDetails);
      console.log("///////////////////////////",movieShowTime);
      $scope.movieShowTime = movieShowTime;
      $scope.imagePath = config.imagePath;
      console.log(config.imagePath);
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
      //Buy button disable/enable
      if($scope.displayMovieDetails.infoMovieBuyTicketsButton==1){
        $scope.displayMovieDetails.infoMovieBuyTicketsButton = true;
      }else{
        $scope.displayMovieDetails.infoMovieBuyTicketsButton = false;
      }
      /*Kids In Mind Rating*/
      // get the overall rating
      $scope.kidsinmind = false;
      if($scope.displayMovieDetails.movieKIM_Rating == null){
          $scope.kidsinmind = false;
      }else{
          $scope.displayMovieDetails.kimRating = ($scope.displayMovieDetails.movieKIM_Rating.match(/\d{1}.\d{1}.\d{1,2}/)[0]);
          $scope.displayMovieDetails.kimRating = $scope.displayMovieDetails.kimRating.split(".");
          $scope.displayMovieDetails.s_n = "/images/kidsinmind/s&n"+$scope.displayMovieDetails.kimRating[0]+".jpg";
          $scope.displayMovieDetails.v_g = "/images/kidsinmind/v&g"+$scope.displayMovieDetails.kimRating[1]+".jpg";
          $scope.displayMovieDetails.prof = "/images/kidsinmind/prof"+$scope.displayMovieDetails.kimRating[2]+".jpg";
          $scope.displayMovieDetails.one_ten = "/images/kidsinmind/1to10.jpg";
          $scope.kidsinmind = true;
      }
      console.log("The kids in mind rating is ",$scope.displayMovieDetails.kimRating,$scope.kidsinmind);
      /*End Kids In Mind Rating*/
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
      trimAudienceScore = parseFloat(trimAudienceScore.replace('/5',""));
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
          for(var k=0;k<8;k++){
              $scope.show6Casts[k] = $scope.totalCasts[k];
          }
      };
      $scope.show6CastsFunction();
      $scope.show6Casts = {};
      for(var k=0;k<8;k++){
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
          // console.log(src);
          return $sce.trustAsResourceUrl("https://www.youtube.com/embed?listType=search&amp;list="+src+"+Trailer");
      };
      $sce.trustAsResourceUrl($scope.displayTomatoData.trailer);
      /*End Trailers*/

     /*Comment Section*/
    $scope.h = false;
      console.log("Get Comments",getComments);
      function getCComments() {
          movieDetails.getComments().then(function (response) {
            $scope.h = true;
            $scope.getCommentss = response;
          });
      }
      getCComments();
      $scope.postComments = function postComments(){
        var data = {
          user_comments: $scope.user_comments,
          star_rating: $scope.star_rating,
          current_time: parseInt(moment().format('x'))
        };
        if($scope.user_comments==undefined || $scope.user_comments.trim() == ""){
          alert("Please write something to Comment..!");
        }else{
          movieDetails.postComments(data).then(function(response){
            $scope.getCommentss = response;
            // getCComments();
            $scope.user_comments = null;
            $scope.star_rating = null;
          });
        }
      };
      // $scope.getComments = getComments;
      $scope.epoch_to_datetime = function (input) {
        // input  = 1489093000;
        input =  parseInt(input);
        var dd =new Date();
        // console.log(dd, input, moment().unix());
        if(angular.isDefined(input))
          return moment(input).format("MMMM DD, YYYY");
        else return;
      };
     /*End Comment Section*/




    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [
      {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
      {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
      {stateOff: 'glyphicon-off'}
    ];

    // <i class="fa fa-star" aria-hidden="true"></i>


  });
