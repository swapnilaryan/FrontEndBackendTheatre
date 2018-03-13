'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  .controller('MainCtrl', function ($scope,$location,apiKey,searchMovieText,nowShowingInTheatres,upcomingMovies) {
      console.log(nowShowingInTheatres);
      console.log(upcomingMovies);
      $scope.imagePath = config.imagePath;
      console.log(config.imagePath);
      for(var i=0;i<upcomingMovies.length;i++){
          var tempDate = new Date(upcomingMovies[i].upReleaseDate).toDateString();
          tempDate = tempDate.split(" ");
          console.log(tempDate[1],tempDate[2]);
          upcomingMovies[i].date = tempDate[2];
          upcomingMovies[i].month = tempDate[1];
      }
      $scope.slide_index = 0;
      $scope.slide_left = function slide_left(){
          if (($scope.slide_index) - 4 <= 0) {
              $scope.slide_index = 0;
              $scope.movieNowShowing = nowShowingInTheatres.slice(0, 4);
          }
          else {
              $scope.slide_index -= 4;
              $scope.movieNowShowing = nowShowingInTheatres.slice($scope.slide_index,$scope.slide_index + 4);
          }
      };
      $scope.slide_right = function slide_right(){
          if($scope.slide_index + 4 >= nowShowingInTheatres.length){
              $scope.slide_index = nowShowingInTheatres.length - 4;
              $scope.movieNowShowing = nowShowingInTheatres.slice($scope.slide_index,nowShowingInTheatres.length);
          }
          else {
              $scope.slide_index = $scope.slide_index + 4;
              if($scope.slide_index + 4 >= nowShowingInTheatres.length){
                  $scope.slide_index = nowShowingInTheatres.length - 4;
                  $scope.movieNowShowing = nowShowingInTheatres.slice($scope.slide_index,nowShowingInTheatres.length);
              }else{
                  $scope.movieNowShowing = nowShowingInTheatres.slice($scope.slide_index,$scope.slide_index + 4);
              }
          }
      };
      $scope.slide_left();
      //Slider implemenattion for upcoming movies
      $scope.slide_index_upcoming= 0 ;//upPosterPath
      $scope.slide_left_upcoming = function slide_left_upcoming(){
          if (($scope.slide_index_upcoming) - 5 <= 0) {
              $scope.slide_index_upcoming = 0;
              $scope.movieComingSoon = upcomingMovies.slice(0, 5);
          }
          else {
              $scope.slide_index_upcoming -= 5;
              $scope.movieComingSoon = upcomingMovies.slice($scope.slide_index_upcoming,$scope.slide_index_upcoming + 5);
          }
      };
      $scope.slide_right_upcoming = function slide_right_upcoming(){
          if($scope.slide_index_upcoming + 5 >= upcomingMovies.length){
              $scope.slide_index_upcoming = upcomingMovies.length - 5;
              $scope.movieComingSoon = upcomingMovies.slice($scope.slide_index_upcoming,upcomingMovies.length);
          }
          else {
              $scope.slide_index_upcoming = $scope.slide_index_upcoming + 5;
              if($scope.slide_index_upcoming + 5 >= upcomingMovies.length){
                  $scope.slide_index_upcoming = upcomingMovies.length - 5;
                  $scope.movieComingSoon = upcomingMovies.slice($scope.slide_index_upcoming,upcomingMovies.length);
              }else{
                  $scope.movieComingSoon = upcomingMovies.slice($scope.slide_index_upcoming,$scope.slide_index_upcoming + 5);
              }
          }
      };
      $scope.slide_left_upcoming();
      // End Slider for upcming movies

      $scope.images = '../images/add_to_cart_button.png';
      $scope.moreInfo = function moreInfo(selectedImdbId) {
          searchMovieText.set(selectedImdbId);
          $location.url('/moviedetails');
          console.log("----------------------",selectedImdbId);
      };
      //$scope.movieComingSoon = [
      //    {
      //        'image':'../images/cs2.png',
      //        'date': '16',
      //        'month': 'June'
      //    },
      //    {
      //        'image':'../images/cs3.png',
      //        'date': '16',
      //        'month': 'June'
      //    },
      //    {
      //        'image':'../images/cs4.png',
      //        'date': '16',
      //        'month': 'June'
      //    },
      //    {
      //        'image':'../images/cs4.png',
      //        'date': '16',
      //        'month': 'June'
      //    },
      //    {
      //        'image':'../images/cs2.png',
      //        'date': '16',
      //        'month': 'June'
      //    }//,
      //    //{
      //    //    'image':'../images/cs3.png',
      //    //    'date': '16',
      //    //    'month': 'June'
      //    //},
      //    //{
      //    //    'image':'../images/cs3.png',
      //    //    'date': '16',
      //    //    'month': 'June'
      //    //},
      //    //{
      //    //    'image':'../images/cs2.png',
      //    //    'date': '16',
      //    //    'month': 'June'
      //    //}
      //];
      //$scope.movieNowShowing=[
      //    {
      //        'image':'../images/img1.png',
      //        'list_show_none':['1:35 pm','4:00 pm','6:35 pm','9:15 pm'],
      //    },
      //    {
      //        'image':'../images/img2.png',
      //        'list_show_3d':['6:30 pm'],
      //        'list_show_3d_image':'../images/3d_text.png',
      //        'list_show_2d':['6:00 pm','6:15 pm'],
      //        'list_show_2d_image':'../images/2d_text.png'
      //    },
      //    {
      //        'image':'../images/img3.png',
      //        'list_show_3d':['1:05 pm','3:55 pm','6:40 pm','9:20 pm'],
      //        'list_show_3d_image':'../images/3d_text.png',
      //        'list_show_2d':['12:50 pm','3:40 pm','6:30 pm','9:10 pm'],
      //        'list_show_2d_image':'../images/2d_text.png'
      //    },
      //    {
      //        'image': '../images/img1.png',
      //        'list_show_none': ['1:35 pm', '4:00 pm', '6:35 pm', '9:15 pm']
      //    }//,
      //    //{
      //    //    'image':'../images/img1.png',
      //    //    'list_show_none':['1:35 pm','4:00 pm','6:35 pm','9:15 pm']
      //    //},
      //    //{
      //    //    'image':'../images/img1.png',
      //    //    'list_show_none':['1:35 pm','4:00 pm','6:35 pm','9:15 pm']
      //    //}
      //];
      $scope.list_show_none = ['1:35 pm','4:00 pm','6:35 pm','9:15 pm'];
      $scope.list_now_showing = [
          {'image':'../images/img1.png'},
          {'image':'../images/img2.png'},
          {'image':'../images/img3.png'},
          {'image':'../images/img1.png'}
      ];
  });
