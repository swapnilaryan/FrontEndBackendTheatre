'use strict';

/**
 * @ngdoc overview
 * @name backendTheatreApp
 * @description
 * # backendTheatreApp
 *
 * Main module of the application.
 */
angular
  .module('backendTheatreApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.router'
  ])
  .config(["$routeProvider", function ($routeProvider) {
      // For any unmatched url, redirect to /
      //$urlRouterProvider.otherwise("/");
      //$stateProvider
      //    .state('main',{
      //        url: "/",
      //        templateUrl: "views/main.html",
      //        controller: 'MainCtrl',
      //        controllerAs: 'main'
      //    });

      $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/moviedetails', {
          templateUrl: 'views/moviedetails.html',
          controller: 'MoviedetailsCtrl',
          controllerAS: 'moviedetails',
          resolve: {
              movieTomatoDetails: ["movieDetails", function (movieDetails) {
                  return movieDetails.getTomatoResult();
              }],
              movieInfoDetails: ["movieDetails", function (movieDetails) {
                  return movieDetails.getMovieInfo();
              }]
          }
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  .controller('MainCtrl', ["$scope", function ($scope) {
      $scope.images = '../images/add_to_cart_button.png';
      $scope.movieComingSoon = [
          {
              'image':'../images/cs2.png',
              'date': '16',
              'month': 'June'
          },
          {
              'image':'../images/cs3.png',
              'date': '16',
              'month': 'June'
          },
          {
              'image':'../images/cs4.png',
              'date': '16',
              'month': 'June'
          },
          {
              'image':'../images/cs4.png',
              'date': '16',
              'month': 'June'
          },
          {
              'image':'../images/cs2.png',
              'date': '16',
              'month': 'June'
          }//,
          //{
          //    'image':'../images/cs3.png',
          //    'date': '16',
          //    'month': 'June'
          //},
          //{
          //    'image':'../images/cs3.png',
          //    'date': '16',
          //    'month': 'June'
          //},
          //{
          //    'image':'../images/cs2.png',
          //    'date': '16',
          //    'month': 'June'
          //}
      ];
      $scope.movieNowShowing=[
          {
              'image':'../images/img1.png',
              'list_show_none':['1:35 pm','4:00 pm','6:35 pm','9:15 pm'],
          },
          {
              'image':'../images/img2.png',
              'list_show_3d':['6:30 pm'],
              'list_show_3d_image':'../images/3d_text.png',
              'list_show_2d':['6:00 pm','6:15 pm'],
              'list_show_2d_image':'../images/2d_text.png'
          },
          {
              'image':'../images/img3.png',
              'list_show_3d':['1:05 pm','3:55 pm','6:40 pm','9:20 pm'],
              'list_show_3d_image':'../images/3d_text.png',
              'list_show_2d':['12:50 pm','3:40 pm','6:30 pm','9:10 pm'],
              'list_show_2d_image':'../images/2d_text.png'
          },
          {
              'image': '../images/img1.png',
              'list_show_none': ['1:35 pm', '4:00 pm', '6:35 pm', '9:15 pm']
          }//,
          //{
          //    'image':'../images/img1.png',
          //    'list_show_none':['1:35 pm','4:00 pm','6:35 pm','9:15 pm']
          //},
          //{
          //    'image':'../images/img1.png',
          //    'list_show_none':['1:35 pm','4:00 pm','6:35 pm','9:15 pm']
          //}
      ];
      //$scope.list_show_none = ['1:35 pm','4:00 pm','6:35 pm','9:15 pm'];
      //$scope.list_now_showing = [
      //    {'image':'../images/img1.png'},
      //    {'image':'../images/img2.png'},
      //    {'image':'../images/img3.png'},
      //    {'image':'../images/img1.png'}
      //];
  }]);

'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc directive
 * @name backendTheatreApp.directive:addToCart
 * @description
 * # addToCart
 */
angular.module('backendTheatreApp')
  .directive('addToCart', function () {
    return {
      //template: '<div></div>',
      restrict: 'E',
      template:
                    '<a ng-href=\'#\'>' +
                        '<img src="../images/add_to_cart_button.png" class="align_add_to_cart"  >' +
                    '</a>'

    };
  });
//"<div>" +
// "</div>"
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
  .controller('IndexCtrl' ,["$scope", "$window", "movieTomato", "searchMovieText", "$location", "$uibModalInstance", function ($scope,$window,movieTomato,searchMovieText,$location,$uibModalInstance) {
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
  }]);
'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:SearchmodalCtrl
 * @description
 * # SearchmodalCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  .controller('SearchmodalCtrl', ['$scope','$uibModal',function ($scope,$uibModal) {
      //console.log(searchMovieText);
      //searchMovieText.set("Its hi now");
      $scope.open = function (size) {
          console.log(size);
          $uibModal.open({
              templateUrl: '/views/searchmodal.html',
              controller: 'IndexCtrl',
              size: size
          });
      };
  }]);

'use strict';

/**
 * @ngdoc service
 * @name backendTheatreApp.searchMovieText
 * @description
 * # searchMovieText
 * Service in the backendTheatreApp.
 */
angular.module('backendTheatreApp')
  .factory('searchMovieText', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
      var smt = {};
      smt.obj = "";
      smt.obj1 = "";
      smt.set = function set(param){
          smt.obj = param;
      };
      smt.get = function get(){
          return smt.obj;
      };
      return smt;
  })
  .factory('movieDetails', ["$q", "$http", "apiKey", "searchMovieText", function ($q,$http,apiKey,searchMovieText) {
      return {
          getTomatoResult: function () {
              var deferred = $q.defer();
              var movieFormat = searchMovieText.get();
              // + movieFormat)
              $http.get("" + apiKey.apiUrlFn() + "db/rottenTomatoes/zootopia")
                  .success(function (data) {
                      //console.log("------", data);
                      deferred.resolve(data);
                  }).error(function (data) {
                      //console.log("????", data);
                      deferred.reject(data);
              });
              return deferred.promise;
          },
          getMovieInfo: function () {
              var deferred = $q.defer();
              $http.get("" + apiKey.apiUrlFn() + "/db/movieinfo/zootopia")
                  .success(function (data) {
                      deferred.resolve(data);
                  }).error(function (data){
                  deferred.reject(data);
              });
              return deferred.promise;
          }
      };
  }])
  .factory('movieApiaryInfo', ["$q", "$http", "apiKey", "searchMovieText", function ($q,$http,apiKey,searchMovieText) {
      var movieId = "";
      var movieTitle = "";
      var movieImdbId = "";
      return {
          getSearchDetails: function () {
              var deferred = $q.defer();
              //search movies
              $http.get(""+apiKey.movieApiUrl+"search/movie?api_key="+apiKey.key+"&query="+searchMovieText.get()+"&year=2016")
                  .success(function (data) {
                      movieId = data.results[0].id;
                      movieTitle = data.results[0].title;
                      movieImdbId = data.results[0].imdb_id;
                      //console.log("!!!!!!!!!!!!!!!!", data);
                      deferred.resolve(data,movieId,movieImdbId);
                  }).error(function (data) {
                  //console.log("????", data);
                  deferred.reject(data);
              });
              return deferred.promise;
          },
          getMovieById: function (id) {
              var deferred = $q.defer();
              var results = "";
              $http.get(""+apiKey.movieApiUrl+"movie/"+id+"?api_key="+apiKey.key)
                  .success(function (data) {
                      //console.log("id walka result", data);
                      results = data;
                      deferred.resolve(data);
                  }).error(function (data) {
                  console.log("error", data);
                  results = data;
                  deferred.reject(data);
              });
              //return results;
              return deferred.promise;
          },
          getTomatoResult1: function (id) {
              var deferred = $q.defer();
              console.log("omdb movie title",movieTitle,movieId);
              $http.get("http://www.omdbapi.com/?i="+id+"&year=2016&plot=full&r=json&tomatoes=true")
                  .success(function (dataOmdb){
                      deferred.resolve(dataOmdb);
                      //console.log("omdb data",dataOmdb);
                  }).error(function(data){
                    deferred.reject(data);
              });
              return deferred.promise;
          }
      };
  }]);

'use strict';

/**
 * @ngdoc function
 * @name backendTheatreApp.controller:MoviedetailsCtrl
 * @description
 * # MoviedetailsCtrl
 * Controller of the backendTheatreApp
 */
angular.module('backendTheatreApp')
  .controller('MoviedetailsCtrl', ["$sce", "$route", "$uibModal", "$location", "searchMovieText", "apiKey", "$q", "$scope", "movieTomatoDetails", "movieInfoDetails", function ($sce, $route,$uibModal,$location,searchMovieText,apiKey,
                                            $q,$scope,movieTomatoDetails,movieInfoDetails) {
      console.log(movieTomatoDetails);
      console.log(movieInfoDetails);
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
          $scope.displayTomatoData.allCritics.tomatoImage = "../images/rt_fresh.jpg";
      }else if(tomatometerAC<=59) {
          //rotten
          $scope.displayTomatoData.allCritics.tomatoImage = "../images/rt_rotten.jpg";
      }else{
          //certified
          $scope.displayTomatoData.allCritics.tomatoImage = "../images/rt_certified.jpg";
      }
      //Second for top critics
      var tomatometerTC = $scope.displayTomatoData.topCritics.tomatometer;
      if(tomatometerTC >= 60 && tomatometerTC < 75){
          //fresh
          $scope.displayTomatoData.topCritics.tomatoImage = "../images/rt_fresh.jpg";
      }else if(tomatometerTC<=59) {
          //rotten
          $scope.displayTomatoData.topCritics.tomatoImage = "../images/rt_rotten.jpg";
      }else{
          //certified
          $scope.displayTomatoData.topCritics.tomatoImage = "../images/rt_certified.jpg";
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
          $scope.displayTomatoData.audienceScore.audienceImage = "../images/rt_user_likes.jpg";
      }else if(trimAudienceScore < 3.5){
          $scope.displayTomatoData.audienceScore.audienceImage = "../images/rt_user_dislike.jpg";
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
              $scope.totalCasts[i].profile_path = "../images/credits/image_not_found.jpg";
          }
          else {
              $scope.totalCasts[i].profile_path = "../images/credits"+$scope.totalCasts[i].profile_path;
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

      $scope.displayTomatoData.trailer = "https://www.youtube.com/embed?listType=search&amp;list="+$scope.displayTomatoData.movieTitle+"+Trailer";
      $scope.trustSrc = function(src) {
          console.log(src);
          return $sce.trustAsResourceUrl("https://www.youtube.com/embed?listType=search&amp;list="+src+"+Trailer");
      };
      $sce.trustAsResourceUrl($scope.displayTomatoData.trailer);
      /*End Trailers*/
  }]);

'use strict';

/**
 * @ngdoc service
 * @name backendTheatreApp.apiKey
 * @description
 * # apiKey
 * Service in the backendTheatreApp.
 */
angular.module('backendTheatreApp')
  .service('apiKey', ["$location", function ($location) {
    // AngularJS will instantiate a singleton by calling "new" on this function
      var apiUrl = "";
      return {
          key: '2c9306d42037dfb0de0fc3f153819054',
          movieApiUrl: 'http://api.themoviedb.org/3/',
          apiUrlFn: function(){
              if($location.host()=='localhost')
              {
                  apiUrl = "http://localhost:3000/api/";
              }
              else {
                  apiUrl = "wrong api URL See apiKeyJs";
              }
              return apiUrl;
          }
      }
  }]);

angular.module('backendTheatreApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<p>This is the about view.</p>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"row&quot;\" ng-controller=\"MainCtrl\"> <div class=\"col-md-12\" id=\"main_view\"> <div class=\"row\"> <div class=\"container\"> <div class=\"col-md-1\" id=\"top-angle-left\"> <p><a ng-href=\"\"><i class=\"fa fa-angle-left fa-3x\"></i></a></p> </div> <div class=\"col-md-10\"> <!--<h1><img src=\"../images/Now_Showing.png\"></h1>--> <div class=\"col-md-4\" id=\"left_banner_now_showing\"></div> <div class=\"col-md-4\" id=\"now_showing_text\">NOW SHOWING</div> <div class=\"col-md-4\" id=\"right_banner_now_showing\"></div> </div> <div class=\"col-md-1\" id=\"top-angle-right\"> <p><i class=\"fa fa-angle-right fa-3x\"></i></p> </div> </div> <div class=\"container\" id=\"show_list\"> <div class=\"col-md-3 container list_now_showing\" ng-repeat=\"mvs in movieNowShowing\"> <div class=\"wrap_all\"> <img class=\"images\" ng-src=\"{{mvs.image}}\"> <div class=\"all_timings\"> <div class=\"list-show-none\"> <span ng-repeat=\"list_show in mvs.list_show_none\">{{list_show}}</span> </div> <div class=\"list-show-3d\"> <span><img ng-src=\"{{mvs.list_show_3d_image}}\"> </span> <span ng-repeat=\"list_show in mvs.list_show_3d\">{{list_show}}</span> </div> <div class=\"list-show-2d\"> <!--<img ng-src=\"\">--> <span><img ng-src=\"{{mvs.list_show_2d_image}}\"></span> <span ng-repeat=\"list_show in mvs.list_show_2d\">{{list_show}}</span> </div> </div> <add-to-cart class=\"align_add_to_cart show-cart\"></add-to-cart> </div> </div> </div> </div> <div class=\"row coming-soon\"> <div class=\"container coming-soon\"> <div class=\"col-md-12\"> <div class=\"col-md-5\" id=\"bottom-angle-left\"> <p><i class=\"fa fa-angle-left fa-3x\"></i></p> </div> <div class=\"col-md-2\"> <h1 id=\"coming_soon_text\">Coming Soon</h1> </div> <div class=\"col-md-5\" id=\"bottom-angle-right\"> <p><i class=\"fa fa-angle-right fa-3x\"></i></p> </div> </div> </div> <div class=\"container\" id=\"coming-soon\"> <div class=\"col-md-3\" id=\"list_coming_soon\" ng-repeat=\"mcs in movieComingSoon\"> <div class=\"parent\"> <div class=\"imagewrap\"> <div class=\"date_month\"> <h1 class=\"coming_soon_date\">{{mcs.date}}</h1> <h1 class=\"coming_soon_month\">{{mcs.month}}</h1> </div> <img class=\"coming_soon_circle\" src=\"../images/circle.png\"> </div> <img class=\"coming_soon_images\" ng-src=\"{{mcs.image}}\"> </div> <!--<li>--> <!--<div class=\"parent\">--> <!--<div class=\"imagewrap\">--> <!--<div class=\"date_month\">--> <!--<h1 class=\"coming_soon_date\">23</h1>--> <!--<h1 class=\"coming_soon_month\">September</h1>--> <!--</div>--> <!--<img class=\"coming_soon_circle\" src=\"../images/circle.png\">--> <!--</div>--> <!--<img class=\"coming_soon_images\" src=\"../images/cs3.png\">--> <!--</div>--> <!--</li>--> <!--<li>--> <!--<div class=\"parent\">--> <!--<div class=\"imagewrap\">--> <!--<div class=\"date_month\">--> <!--<h1 class=\"coming_soon_date\">21</h1>--> <!--<h1 class=\"coming_soon_month\">June</h1>--> <!--</div>--> <!--<img class=\"coming_soon_circle\" src=\"../images/circle.png\">--> <!--</div>--> <!--<img class=\"coming_soon_images\" src=\"../images/cs4.png\">--> <!--</div>--> <!--</li>--> <!--<li>--> <!--<div class=\"parent\">--> <!--<div class=\"imagewrap\">--> <!--<div class=\"date_month\">--> <!--<h1 class=\"coming_soon_date\">14</h1>--> <!--<h1 class=\"coming_soon_month\">April</h1>--> <!--</div>--> <!--<img class=\"coming_soon_circle\" src=\"../images/circle.png\">--> <!--</div>--> <!--<img class=\"coming_soon_images\" src=\"../images/cs5.png\">--> <!--</div>--> <!--</li>--> </div> </div> </div> </div> </div>"
  );


  $templateCache.put('views/moviedetails.html',
    "<div class=\"row\" data-ng-cloak> <div class=\"container\"> <div class=\"col-md-8\" data-ng-model=\"displayMovieDetails\" ng-cloak> <!--<p>Hello {{movieTomato}}</p>--> <div class=\"container\"> <div class=\"col-md-4\"> <br> <img ng-src=\"{{displayMovieDetails.infoMoviePosterPath}}\" class=\"mdImage\"> </div> <div class=\"col-md-8\" data-ng-model=\"displayTomatoData\"> <div class=\"movieTitle\"><h1>{{displayTomatoData.movieTitle}} ({{displayMovieDetails.releaseYear}})</h1></div> <br> <div class=\"rottenTomatoesInfo col-md-12\"> <div class=\"col-md-4 scorePanel\" ng-model=\"tomatoMeter\"> <h3>TOMATOMETER</h3> <div class=\"tomatoMeterText\"> <img id=\"tomatoImage\" ng-src=\"{{tomatoMeter.tomatoImage}}\"> <span class=\"tomatoMeterPercentage\">{{tomatoMeter.tomatometer}}%</span> </div> <br> <div class=\"tomatoMeterText\">Average Rating: <span class=\"tomatoMeterTextResults\">{{tomatoMeter.averageRating}}</span> </div> <div class=\"tomatoMeterText\">Reviews Counted: <span class=\"tomatoMeterTextResults\">{{tomatoMeter.reviewCount}}</span> </div> <div class=\"tomatoMeterText\">Fresh: <span class=\"tomatoMeterTextResults\">{{tomatoMeter.freshCount}}</span> </div> <div class=\"tomatoMeterText\">Rotten: <span class=\"tomatoMeterTextResults\">{{tomatoMeter.rottenCount}}</span> </div> </div> <div class=\"col-md-4 scorePanel\" id=\"marginRight\"> <br> <div class=\"shiftRight\"> <span class=\"criticsHead\"><a class=\"{{allBoldOrNormal}}\" ng-click=\"click('all')\">All Critics</a></span> <span class=\"criticsHead\">|</span> <span class=\"criticsHead\"><a class=\"{{topBoldOrNormal}}\" ng-click=\"click('top')\">Top Critics</a></span> </div> <br> <!--Progress Bar--> <div class=\"progress\"> <div class=\"progress-bar\" role=\"progressbar\" style=\"width:0\"></div> <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"{{tomatoMeter.tomatometer}}\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{tomatoMeter.tomatometer}}%\"> </div> </div> <p class=\"criticsConcensus\">Critics Consensus:<span class=\"criticsConcensusInfo\">{{tomatoMeter.criticsConsensus}}</span></p> </div> <div class=\"col-md-4 scorePanel\" ng-model=\"audienceScore\"> <h3>AUDIENCE SCORE</h3> <div class=\"audiencePoint\"> <img id=\"audienceImage\" ng-src=\"{{audienceScore.audienceImage}}\"> <span class=\"tomatoMeterPercentage\">{{audienceScore.tomatometer}}%</span> </div> <br> <div class=\"tomatoMeterText\">Average Rating: <span class=\"tomatoMeterTextResults\">{{audienceScore.averageRating}}</span> </div> <div class=\"tomatoMeterText\">User Rating: <span class=\"tomatoMeterTextResults\">{{audienceScore.ratingCount}}</span> </div> </div> </div> </div> </div> <br> <div class=\"container\" ng-model=\"displayMovieDetails\"> <div class=\"col-md-4\"> <p id=\"showtime\">Showtimes</p> <div class=\"col-md-4 showtimeRow2\">Timing</div> <div class=\"col-md-4 showtimeRow2\">Adults</div> <div class=\"col-md-4 showtimeRow2\">Kids</div> <div class=\"col-md-4 showtimeRow1\">Timing</div> <div class=\"col-md-4 showtimeRow1\">Adults</div> <div class=\"col-md-4 showtimeRow1\">Kids</div> <div class=\"col-md-4 showtimeRow2\">Timing</div> <div class=\"col-md-4 showtimeRow2\">Adults</div> <div class=\"col-md-4 showtimeRow2\">Kids</div> <div class=\"col-md-4 showtimeRow1\">Timing</div> <div class=\"col-md-4 showtimeRow1\">Adults</div> <div class=\"col-md-4 showtimeRow1\">Kids</div> <div class=\"col-md-4 showtimeRow2\">Timing</div> <div class=\"col-md-4 showtimeRow2\">Adults</div> <div class=\"col-md-4 showtimeRow2\">Kids</div> <div class=\"col-md-4 showtimeRow1\">Timing</div> <div class=\"col-md-4 showtimeRow1\">Adults</div> <div class=\"col-md-4 showtimeRow1\">Kids</div> <div class=\"col-md-4 showtimeRow2\">Timing</div> <div class=\"col-md-4 showtimeRow2\">Adults</div> <div class=\"col-md-4 showtimeRow2\">Kids</div> <div class=\"col-md-4 showtimeRow1\">Timing</div> <div class=\"col-md-4 showtimeRow1\">Adults</div> <div class=\"col-md-4 showtimeRow1\">Kids</div> <div class=\"col-md-4 showtimeRow2\">Timing</div> <div class=\"col-md-4 showtimeRow2\">Adults</div> <div class=\"col-md-4 showtimeRow2\">Kids</div> </div> <div class=\"col-md-8\"> <div class=\"movieDes\">{{displayMovieDetails.infoMovieDescription}}</div> <br> <div class=\"col-md-4 movieTopic\"> <div>Rating:</div> </div> <div class=\"col-md-8 movieDetails\"> <div>{{displayMovieDetails.infoMovieRated}}</div> </div> <div class=\"col-md-4 movieTopic\"> <div>Genre:</div> </div> <div class=\"col-md-8 movieDetails\"> <div>{{displayMovieDetails.infoMovieGenre}}</div> </div> <div class=\"col-md-4 movieTopic\"> <div>Directed By:</div> </div> <div class=\"col-md-8 movieDetails\"> <div>{{displayMovieDetails.infoMovieDirectedBy}}</div> </div> <div class=\"col-md-4 movieTopic\"> <div>Written By:</div> </div> <div class=\"col-md-8 movieDetails\"> <div>{{displayMovieDetails.infoMovieWrittenBy}}</div> </div> <div class=\"col-md-4 movieTopic\"> <div>In Theatres:</div> </div> <div class=\"col-md-8 movieDetails\"> <div>{{displayMovieDetails.infoMovieInTheatres}}</div> </div> <div class=\"col-md-4 movieTopic\"> <div>Box Office:</div> </div> <div class=\"col-md-8 movieDetails\"> <div>{{displayMovieDetails.infoMovieBoxOffice}}</div> </div> <div class=\"col-md-4 movieTopic\"> <div>Run Time:</div> </div> <div class=\"col-md-8 movieDetails\"> <div>{{displayMovieDetails.infoMovieRuntime}}</div> </div> <div class=\"col-md-8 movieTopic\"> <div>{{displayMovieDetails.infoMovieProduction}}: <span><a ng-href=\"{{displayMovieDetails.infoMovieWebsite}}\">Official Site</a> </span> </div> </div> </div> <div class=\"col-md-4\"></div> <div class=\"col-md-8\"><hr></div> </div> </div> <div class=\"col-md-4 rightPage\" data-ng-model=\"theMovieDbId\" ng-cloak> <!--Book tickets , Show trailer, Share on social media--> <div class=\"buttonShadow\"> <button type=\"button\" class=\"btn btn-default tickTrailerSocial\"> BUY TICKETS </button> </div> <div class=\"buttonShadow\"> <button type=\"button\" class=\"btn btn-default tickTrailerSocial\"> SHARE ON <a ng-href=\"http://www.facebook.com\"> <img class=\"shareSocial\" src=\"../images/shareOnFacebook.png\"> </a> <span> <a ng-href=\"http://www.twitter.com\"> <img class=\"shareSocial\" src=\"../images/shareOnTwitter.png\"> </a> </span> </button> </div> <div class=\"buttonShadow\"> <button type=\"button\" class=\"btn btn-default tickTrailerSocial\" data-toggle=\"modal\" data-target=\"#myModal\">WATCH TRAILER</button> </div> </div> </div> <div class=\"container\"> <div class=\"col-md-3\"> <div class=\"col-md-12\"><p id=\"cast\">Cast</p></div> </div> <br> <div class=\"col-md-12\"> <div class=\"col-md-9\" data-ng-model=\"casts\"> <div class=\"col-md-4 casts\" ng-repeat=\"casts in show6Casts\"> <div class=\"col-md-4 castsImage\"> <img ng-src=\"{{casts.profile_path}}\"> </div> <div class=\"col-md-8\"> <p>{{casts.name}}</p> <p class=\"castCharacter\">as {{casts.character}}</p> </div> </div> </div> <div class=\"col-md-5\"> <h6 class=\"ngShowAllText\"> <a class=\"cursor4ShowAll\" ng-if=\"ngShowAllText==true\" ng-click=\"showAll(ngShowAllText)\" ng-if=\"ngShowAllText==true\"> Show More Cast <span class=\"glyphicon glyphicon-triangle-bottom cursor4ShowAll\"></span> </a> </h6> <h6 class=\"ngShowAllText\"> <a class=\"cursor4ShowAll\" ng-if=\"ngShowAllText==false\" ng-click=\"showAll(ngShowAllText)\" ng-if=\"ngShowAllText==true\"> Show Less Cast <span class=\"glyphicon glyphicon-triangle-top cursor4ShowAll\"></span> </a> </h6> </div> </div> </div> </div> <!--<button class = \"btn btn-primary btn-lg\" data-toggle = \"modal\" data-target = \"#myModal\">--> <!--Launch demo modal--> <!--</button>--> <!-- Modal --> <div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" data-ng-model=\"displayTomatoData\"> <div class=\"modal-dialog\"> <div class=\"moveCrossRight\"> <span data-dismiss=\"modal\" class=\"glyphicon glyphicon-remove-circle lightGray\"></span> <!--<a data-dismiss=\"modal\"><img clss=\"modalClose\" src=\"../images/modalClose.png\"></a>--> </div> <div class=\"modal-content\" id=\"yt-player\"> <div class=\"embed-responsive embed-responsive-16by9\"> <iframe class=\"embed-responsive-item\" ng-src=\"{{trustSrc(displayTomatoData.movieTitle)}}\" allowfullscreen webkitallowfullscreen=\"true\" mozallowfullscreen=\"true\" scrolling=\"no\"></iframe> </div> </div><!-- /.modal-content --> </div><!-- /.modal-dialog --> </div><!-- /.modal --> <script type=\"text/javascript\">$(\"#myModal\").on('hidden.bs.modal', function (e) {\n" +
    "\n" +
    "        $(\"#myModal iframe\").attr(\"src\", $(\"#myModal iframe\").attr(\"src\"));\n" +
    "    });</script>"
  );


  $templateCache.put('views/searchmodal.html',
    "<div> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button> <h4 class=\"modal-title\">Search Your Movies Here</h4> </div> <div class=\"modal-body\"> <div class=\"input-group stylish-input-group\"> <input type=\"text\" class=\"form-control\" ng-model=\"movieToSearch\" placeholder=\"Type a movie name\"> <span class=\"input-group-addon\" ng-click=\"searchMovies(movieToSearch)\"> <button> <span class=\"glyphicon glyphicon-search\"></span> </button> </span> </div> </div> <div class=\"modal-footer\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"close()\">Close</button> </div> <!-- modal-footer --> </div>"
  );


  $templateCache.put('views/searchresults.html',
    "<p>This is the searchResults view.</p>"
  );


  $templateCache.put('views/trailermodal.html',
    "<div ng-controller=\"MoviedetailsCtrl\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button> <h4 class=\"modal-title\">Search Your Movies Here</h4> </div> <div class=\"modal-body\"> <div class=\"input-group stylish-input-group\"> <input type=\"text\" class=\"form-control\" ng-model=\"movieToSearch\" placeholder=\"Type a movie name\"> <span class=\"input-group-addon\" ng-click=\"searchMovies(movieToSearch)\"> <button> <span class=\"glyphicon glyphicon-search\"></span> </button> </span> </div> </div> <div class=\"modal-footer\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"close()\">Close</button> </div> <!-- modal-footer --> </div>"
  );

}]);
