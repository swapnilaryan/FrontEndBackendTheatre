'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
    .controller('MainCtrl', function ($scope, $location, apiKey, searchMovieText, $q, nowShowingService, upcomingMoviesService) {
        $scope.imagePath = config.imagePath;
        var upcomingMovies, nowShowing;
        $q.all([upcomingMoviesService.upcoming(), nowShowingService.nowShowingMovies()]).then(function (responses) {
            upcomingMovies = responses[0].data.data;
            nowShowing = responses[1].data.data;
            // let upcomingMovies, nowShowing;
            for (var i = 0; i < upcomingMovies.length; i++) {
                var tempDate = new Date(upcomingMovies[i].upReleaseDate).toDateString();
                tempDate = tempDate.split(" ");
                upcomingMovies[i].date = tempDate[2];
                upcomingMovies[i].month = tempDate[1];
                upcomingMovies[i].upPosterPath = upcomingMovies[i].upPosterPath.replace('/images/upcoming/', siteConfig.imagePath+siteConfig.imageSize+'');
            }
            nowShowing.filter(function (item) {
               item.infoMoviePosterPath = item.infoMoviePosterPath.replace('/images/nowShowing/', siteConfig.imagePath+siteConfig.imageSize+'');
            });
            $scope.slide_left();
            $scope.slide_left_upcoming();
        });
        
        $scope.slide_index = 0;
        $scope.slide_left = function slide_left() {
            if (($scope.slide_index) - 4 <= 0) {
                $scope.slide_index = 0;
                $scope.movieNowShowing = nowShowing.slice(0, 4);
            }
            else {
                $scope.slide_index -= 4;
                $scope.movieNowShowing = nowShowing.slice($scope.slide_index, $scope.slide_index + 4);
            }
        };
        $scope.slide_right = function slide_right() {
            if ($scope.slide_index + 4 >= nowShowing.length) {
                $scope.slide_index = nowShowing.length - 4;
                $scope.movieNowShowing = nowShowing.slice($scope.slide_index, nowShowing.length);
            }
            else {
                $scope.slide_index = $scope.slide_index + 4;
                if ($scope.slide_index + 4 >= nowShowing.length) {
                    $scope.slide_index = nowShowing.length - 4;
                    $scope.movieNowShowing = nowShowing.slice($scope.slide_index, nowShowing.length);
                } else {
                    $scope.movieNowShowing = nowShowing.slice($scope.slide_index, $scope.slide_index + 4);
                }
            }
        };
        //Slider implemenattion for upcoming movies
        $scope.slide_index_upcoming = 0;//upPosterPath
        $scope.slide_left_upcoming = function slide_left_upcoming() {
            if (($scope.slide_index_upcoming) - 5 <= 0) {
                $scope.slide_index_upcoming = 0;
                $scope.movieComingSoon = upcomingMovies.slice(0, 5);
            }
            else {
                $scope.slide_index_upcoming -= 5;
                $scope.movieComingSoon = upcomingMovies.slice($scope.slide_index_upcoming, $scope.slide_index_upcoming + 5);
            }
        };
        $scope.slide_right_upcoming = function slide_right_upcoming() {
            if ($scope.slide_index_upcoming + 5 >= upcomingMovies.length) {
                $scope.slide_index_upcoming = upcomingMovies.length - 5;
                $scope.movieComingSoon = upcomingMovies.slice($scope.slide_index_upcoming, upcomingMovies.length);
            }
            else {
                $scope.slide_index_upcoming = $scope.slide_index_upcoming + 5;
                if ($scope.slide_index_upcoming + 5 >= upcomingMovies.length) {
                    $scope.slide_index_upcoming = upcomingMovies.length - 5;
                    $scope.movieComingSoon = upcomingMovies.slice($scope.slide_index_upcoming, upcomingMovies.length);
                } else {
                    $scope.movieComingSoon = upcomingMovies.slice($scope.slide_index_upcoming, $scope.slide_index_upcoming + 5);
                }
            }
        };
        // End Slider for upcming movies
        
        $scope.images = '../images/add_to_cart_button.png';
        $scope.moreInfo = function moreInfo(selectedImdbId) {
            searchMovieText.set(selectedImdbId);
            $location.url('/moviedetails');
            console.log("----------------------", selectedImdbId);
        };
        $scope.list_show_none = ['1:35 pm', '4:00 pm', '6:35 pm', '9:15 pm'];
        $scope.list_now_showing = [
            {'image': '../images/img1.png'},
            {'image': '../images/img2.png'},
            {'image': '../images/img3.png'},
            {'image': '../images/img1.png'}
        ];
    });
