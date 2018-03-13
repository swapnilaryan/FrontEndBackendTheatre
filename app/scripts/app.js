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
        'ui.router',
        'ngIdle',
        'LocalStorageModule',
        'toastr'
    ])
    // .run(['Idle', function(Idle) {
    //   Idle.watch();
    // }])
    .config(function ($routeProvider, localStorageServiceProvider, IdleProvider, KeepaliveProvider, $stateProvider, $urlRouterProvider) {
        localStorageServiceProvider
            .setPrefix('backendTheatreApp')
            .setStorageType('sessionStorage');
        IdleProvider.idle(15 * 60); // to be changed
        IdleProvider.timeout(5); // to be changed
        KeepaliveProvider.interval(10 * 60); // to be changed
        // For any unmatched url, redirect to /
        //$urlRouterProvider.otherwise("/");
        $stateProvider
           .state('main',{
               url: "/",
               templateUrl: "views/main.html",
               controller: 'MainCtrl'
           });
        
        // $routeProvider
        //     .when('/', {
        //         templateUrl: 'views/main.html',
        //         controller: 'MainCtrl',
        //         controllerAs: 'main',
        //         resolve: {
        //             nowShowingInTheatres: function (nowShowing) {
        //                 return nowShowing.nowShowingMovies();
        //             },
        //             upcomingMoviesToBeDisplayed: function (upcomingMovies) {
        //                 console.log(31);
        //                 return upcomingMovies.upcoming();
        //             }
        //         }
        //     })
        // .when('/about', {
        //     templateUrl: 'views/about.html',
        //     controller: 'AboutCtrl',
        //     controllerAs: 'about'
        // })
        //
        // .when('/moviedetails', {
        //     templateUrl: 'views/moviedetails.html',
        //     controller: 'MoviedetailsCtrl',
        //     controllerAS: 'moviedetails',
        //     resolve: {
        //         movieTomatoDetails: function (movieDetails) {
        //             return movieDetails.getTomatoResult();
        //         },
        //         movieInfoDetails: function (movieDetails) {
        //             return movieDetails.getMovieInfo();
        //         },
        //         movieShowTime: function (movieDetails) {
        //             return movieDetails.movieShowTime();
        //         },
        //         getComments: function (movieDetails) {
        //             return movieDetails.getComments();
        //         }
        //     }
        // })
        // .otherwise({
        //     redirectTo: '/'
        // });
        $urlRouterProvider.otherwise('/');
    });
