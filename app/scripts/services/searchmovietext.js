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
  .factory('movieDetails', function ($q,$http,apiKey,searchMovieText) {
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
  })
  .factory('movieApiaryInfo', function ($q,$http,apiKey,searchMovieText) {
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
  });
