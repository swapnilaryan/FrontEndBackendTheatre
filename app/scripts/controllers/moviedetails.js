'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:MoviedetailsCtrl
 * @description
 * # MoviedetailsCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
    .controller('MoviedetailsCtrl', function ($sce, localStorageService, $http, $stateParams, $uibModal, $location, apiKey,
                                              $q, $scope, movieDetails) {
        $scope.displayMovieDetails = null;
        $scope.kidsinmind = false;

        function initializeMovieDetails(data) {
            $scope.displayMovieDetails = data;
            $scope.displayMovieDetails.releaseYear = $scope.displayMovieDetails.infoMovieInTheatres.substr($scope.displayMovieDetails.infoMovieInTheatres.length - 4);
            $scope.displayMovieDetails.infoMoviePosterPath = $scope.displayMovieDetails.infoMoviePosterPath.replace("/images/nowShowing", siteConfig.imagePath + siteConfig.imageSize);
            $scope.displayMovieDetails.infoMovieBackdropPath = siteConfig.backdropPath + $scope.displayMovieDetails.infoMovieBackdropPath;
            //   /*Kids In Mind Rating*/
            //   // get the overall rating
            if (!$scope.displayMovieDetails.movieKIM_Rating) {
                $scope.kidsinmind = false;
            } else {
                $scope.displayMovieDetails.kimRating = ($scope.displayMovieDetails.movieKIM_Rating.match(/\d{1}.\d{1}.\d{1,2}/)[0]);
                $scope.displayMovieDetails.kimRating = $scope.displayMovieDetails.kimRating.split(".");
                $scope.displayMovieDetails.s_n = "/images/kidsinmind/s&n" + $scope.displayMovieDetails.kimRating[0] + ".jpg";
                $scope.displayMovieDetails.v_g = "/images/kidsinmind/v&g" + $scope.displayMovieDetails.kimRating[1] + ".jpg";
                $scope.displayMovieDetails.prof = "/images/kidsinmind/prof" + $scope.displayMovieDetails.kimRating[2] + ".jpg";
                $scope.displayMovieDetails.one_ten = "/images/kidsinmind/1to10.jpg";
                $scope.displayMovieDetails.movieKIM_URL = ($scope.displayMovieDetails.movieKIM_URL) ? $scope.displayMovieDetails.movieKIM_URL : 'http://www.kids-in-mind.com/';
                $scope.kidsinmind = true;
            }
            //   /*End Kids In Mind Rating*/
            $scope.displayMovieDetails.infoMovieGenre = $scope.displayMovieDetails.infoMovieGenre.split(",");
        }

        $scope.show6CastsFunction = function show6CastsFunction() {
            $scope.show6Casts = {};
            for (var k = 0; k < 8; k++) {
                $scope.show6Casts[k] = $scope.totalCasts[k];
            }
        };

        //   /*Show All Casts*/
        $scope.ngShowAllText = true;
        $scope.show6CastsText = true;
        $scope.showAll = function showAll(param) {
            $scope.show6Casts = $scope.totalCasts;
            $scope.ngShowAllText = !param;
            if ($scope.ngShowAllText) {
                $scope.show6CastsFunction();
            }
        };

        //   /*End Displaying casts*/

        function initializeCasts(data) {
            $scope.totalCasts = data;
            //   /*Display Casts*/
            //   //Alter their profile path with ../images/credits/:profilePath
            for (var i = 0; i < $scope.totalCasts.length; i++) {
                if (!$scope.totalCasts[i].profile_path) {
                    $scope.totalCasts[i].profile_path = "/images/credits/image_not_found.jpg";
                } else {
                    $scope.totalCasts[i].profile_path = siteConfig.imagePath + siteConfig.imageSize + $scope.totalCasts[i].profile_path;
                }
            }

            $scope.show6Casts = {};
            for (var k = 0; k < 8; k++) {
                $scope.show6Casts[k] = $scope.totalCasts[k];
            }
            $scope.show6CastsFunction();

        }

        function initializeRottenTomatoData(movieTomatoDetails) {
            $scope.displayTomatoData = {};
            $scope.displayTomatoData.imdbID = movieTomatoDetails.mtImdbID || 'N/A';
            $scope.displayTomatoData.movieDescription = movieTomatoDetails.mtMovieDescription || 'N/A';
            $scope.displayTomatoData.movieTitle = movieTomatoDetails.mtMovieTitle || 'N/A';
            $scope.displayTomatoData.allCritics = (movieTomatoDetails.mtAllCritics) ? JSON.parse(movieTomatoDetails.mtAllCritics) : 'N/A';
            $scope.displayTomatoData.topCritics = (movieTomatoDetails.mtTopCritics) ? JSON.parse(movieTomatoDetails.mtTopCritics) : 'N/A';
            $scope.displayTomatoData.audienceScore = (movieTomatoDetails.mtAudienceScore) ? JSON.parse(movieTomatoDetails.mtAudienceScore) : 'N/A';
            $scope.displayTomatoData.url = (movieTomatoDetails.mtURL) ? movieTomatoDetails.mtURL : '';
            //   /*Trailers*/
            $scope.displayTomatoData.trailer = "https://www.youtube.com/results?search_query=" + $scope.displayTomatoData.movieTitle + "+trailer";
            $scope.trustSrc = function (src) {
                return $sce.trustAsResourceUrl("https://www.youtube.com/embed?listType=search&amp;list=" + src + "+Trailer");
            };
            $sce.trustAsResourceUrl($scope.displayTomatoData.trailer);
            /*End Trailers*/


            /*Evaluating if the image should be fresh, rotten or certified*/
            // first for All Critics
            var tomatometerAC = $scope.displayTomatoData.allCritics.tomatoMeter;
            if (tomatometerAC >= 60 && tomatometerAC < 75) {
                //fresh
                $scope.displayTomatoData.allCritics.tomatoImage = "/images/rt_fresh.jpg";
            } else if (tomatometerAC <= 59) {
                //rotten
                $scope.displayTomatoData.allCritics.tomatoImage = "/images/rt_rotten.jpg";
            } else {
                //certified
                $scope.displayTomatoData.allCritics.tomatoImage = "/images/rt_certified.jpg";
            }
            //Second for top critics
            var tomatometerTC = $scope.displayTomatoData.topCritics.tomatoMeter;
            if (tomatometerTC >= 60 && tomatometerTC < 75) {
                //fresh
                $scope.displayTomatoData.topCritics.tomatoImage = "/images/rt_fresh.jpg";
            } else if (tomatometerTC <= 59) {
                //rotten
                $scope.displayTomatoData.topCritics.tomatoImage = "/images/rt_rotten.jpg";
            } else {
                //certified
                $scope.displayTomatoData.topCritics.tomatoImage = "/images/rt_certified.jpg";
            }

            $scope.displayTomatoData.allCritics.tomatoImage = "/images/rt_" + $scope.displayTomatoData.allCritics.freshness + '.jpg';
            $scope.displayTomatoData.topCritics.tomatoImage = "/images/rt_" + $scope.displayTomatoData.topCritics.freshness + '.jpg';
            /*end evaluating for freshness*/
            $scope.allBoldOrNormal = "criticsLink";
            $scope.topBoldOrNormal = "criticsLink";
            $scope.click = function (show) {
                if (show === 'all') {
                    $scope.tomatoMeter = $scope.displayTomatoData.allCritics;
                    $scope.allBoldOrNormal = "criticsLinkTextBold";
                    $scope.topBoldOrNormal = "criticsLink";
                } else {
                    $scope.tomatoMeter = $scope.displayTomatoData.topCritics;
                    $scope.allBoldOrNormal = "criticsLink";
                    $scope.topBoldOrNormal = "criticsLinkTextBold";
                }
            };
            $scope.click('all'); //on load all critics should be selected
            /*For Audience Score*/
            var trimAudienceScore = $scope.displayTomatoData.audienceScore.averageRating;
            trimAudienceScore = parseFloat(trimAudienceScore.replace('/5', ""));
            //console.log(trimAudience);
            if (trimAudienceScore >= 3.5) {
                $scope.displayTomatoData.audienceScore.audienceImage = "/images/rt_user_likes.jpg";
            } else if (trimAudienceScore < 3.5) {
                $scope.displayTomatoData.audienceScore.audienceImage = "/images/rt_user_dislike.jpg";
            }
            $scope.audienceScore = $scope.displayTomatoData.audienceScore;
            $scope.audienceScore.ratingCount = $scope.audienceScore.ratingCount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            /*End Audience Score*/
        }

        $scope.onDateSelect = function onDateSelect(idx) {
            if ($scope.movieShowTime.length > 0) {
                $scope.selectedShowtimeDate = $scope.movieShowTime[idx];
                $scope.movieShowTime.forEach(function (item) {
                    item.active = false;
                });
                $scope.movieShowTime[idx].active = true;
            }
        };

        function initializeMovieShowtime(movieShowtime) {
            $scope.movieShowTime = movieShowtime;
            var temp = [];
            $scope.movieShowTime.forEach(function (item) {
                var obj = {
                    date: moment(new Date(item.epochTime)).format('MMM DD'),
                    data: [{
                        movieShowDate: item.movieShowDate,
                        movieStartTime: item.movieStartTime,
                        movieScreen: item.movieScreen,
                        movieType: item.movieType
                    }],
                    active: false
                };
                var tt = temp.find(function (val, index) {
                    return val.date === obj.date;
                });
                console.log(tt)
                if (tt) {
                    tt.data.push(obj.data[0]);
                } else {
                    temp.push(obj);
                }
            });
            $scope.movieShowTime = temp;
            $scope.onDateSelect(0);
            console.log($scope.movieShowTime);
        }

        $q.all([movieDetails.getMovieInfo($stateParams.imdbID), movieDetails.getTomatoResult($stateParams.imdbID), movieDetails.movieShowTime($stateParams.imdbID)]).then(function (responses) {
            initializeMovieDetails(responses[0].data.data);
            initializeCasts(JSON.parse(responses[0].data.data.infoMovieCasts));
            initializeRottenTomatoData(responses[1].data.data);
            initializeMovieShowtime(responses[2].data.data);
            // After everythgin is fetched call rotten tomatoes to update the values :-

            // movieDetails.updateTomatoResult()
        });

        //
        //  /*Comment Section*/
        // $scope.h = false;
        //   console.log("Get Comments",getComments);
        //   function getCComments() {
        //       movieDetails.getComments().then(function (response) {
        //         $scope.h = true;
        //         $scope.getCommentss = response;
        //       });
        //   }
        //   getCComments();
        //   $scope.postComments = function postComments(){
        //     var data = {
        //       user_comments: $scope.user_comments,
        //       star_rating: $scope.star_rating,
        //       current_time: parseInt(moment().format('x'))
        //     };
        //     if($scope.user_comments==undefined || $scope.user_comments.trim() == ""){
        //       alert("Please write something to Comment..!");
        //     }else{
        //       movieDetails.postComments(data).then(function(response){
        //         $scope.getCommentss = response;
        //         // getCComments();
        //         $scope.user_comments = null;
        //         $scope.star_rating = null;
        //       });
        //     }
        //   };
        //   // $scope.getComments = getComments;
        // $scope.epoch_to_datetime = function (input) {
        //     // input  = 1489093000;
        //     input = parseInt(input);
        //     var dd = new Date();
        //     // console.log(dd, input, moment().unix());
        //     if (angular.isDefined(input))
        //         return moment(input).format("MMMM DD, YYYY");
        //     else return;
        // };
        //  /*End Comment Section*/

        $scope.hoveringOver = function (value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.ratingStates = [
            {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
            {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
            {stateOff: 'glyphicon-off'}
        ];

        $scope.scroll = function scroll(type, to) {
            if (type === 'cast') {
                var view = document.getElementsByClassName("movie-cast")[0];
                var width = document.getElementsByClassName("casts")[0].scrollWidth;
                if (to === 'left') {
                    view.scrollLeft -= width;
                } else if (to === 'right') {
                    view.scrollLeft += width;
                }
            }
        };

    });
