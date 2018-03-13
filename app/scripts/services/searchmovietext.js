'use strict';

/**
 * @ngdoc service
 * @name backendTheatreApp.searchMovieText
 * @description
 * # searchMovieText
 * Service in the backendTheatreApp.
 */
function commonHTTPCall($http, params, toastr, successMsg, errorMsg) {
    if (successMsg === undefined) {
        successMsg = true;
    }
    if (errorMsg === undefined) {
        errorMsg = true
    }
    
    params.withCredentials = true;
    
    return $http(params)
        .success(function (response) {
            if (successMsg) {
                toastr.success(response.message);
            }
            return response;
        })
        .error(function (response, status) {
            if (status === 401) {
                window.location.replace('/#/login');
                window.location.reload();
            }
            if (errorMsg) {
                toastr.error(response.error.message);
            }
            return response;
        });
}

angular.module('backendTheatreApp')
    .factory('signup', function ($q, $http, apiKey) {
        return {
            registration: function (data) {
                var deferred = $q.defer();
                $http.post("" + config.apiUrlFn + "db/registerUser", data)
                    .success(function (data, status, headers) {
                        deferred.resolve(data);
                    }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            }
        }
    })
    .factory('signin', function ($q, $http, apiKey) {
        return {
            signin: function (data) {
                var deferred = $q.defer();
                $http.post("" + config.apiUrlFn + "db/userLogin", data)
                    .success(function (data, status, headers) {
                        console.log(data);
                        deferred.resolve(data);
                    }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            userLoggedIn: function () {
                var deferred = $q.defer();
                $http.get("" + config.apiUrlFn + "db/check")
                    .success(function (data, status, headers) {
                        console.log(data);
                        deferred.resolve(data);
                    }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            }
        }
    })
    .factory('signout', function ($q, $http, apiKey) {
        return {
            signout: function () {
                var deferred = $q.defer();
                $http.get("" + config.apiUrlFn + "db/userLogout")
                    .success(function (data, status, headers) {
                        console.log(data);
                        deferred.resolve(data);
                    }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            }
        }
    })
    .factory('userLogInStatus', function () {
        // AngularJS will instantiate a singvaron by calling "new" on this function
        var user = {};
        var loginUser = function (newObj) {
            user.emailId = newObj;
            console.log(user);
        };
        
        var getUser = function () {
            console.log(user);
            return user.emailId;
        };
        
        return {
            loginUser: loginUser,
            getUser: getUser
        };
    })
    .factory('searchMovieText', function () {
        // AngularJS will instantiate a singvaron by calling "new" on this function
        var smt = {};
        smt.obj = "";
        smt.obj1 = "";
        smt.set = function set(param) {
            smt.obj = param;
        };
        smt.get = function get() {
            return smt.obj;
        };
        return smt;
    })
    .factory('upcomingMoviesService', function ($q, $http, toastr) {
        return {
            upcoming: function () {
                var req = {
                    method: 'GET',
                    url: siteConfig.apiUrlFn + "/upcomingMovies"
                };
                return commonHTTPCall($http, req, toastr, false);
            }
        }
    })
    .factory('nowShowingService', function ($q, $http, toastr) {
        return {
            nowShowingMovies: function () {
                var req = {
                    method: 'GET',
                    url: siteConfig.apiUrlFn + "/nowShowingMovies"
                };
                return commonHTTPCall($http, req, toastr, false);
            }
        }
    })
    .factory('movieDetails', function ($q, localStorageService, $http, apiKey, searchMovieText) {
        var id = "";
        return {
            postComments: function (data) {
                var deferred = $q.defer();
                //var movieFormat = searchMovieText.get();
                id = searchMovieText.get();
                if (id != "") {
                } else {
                    id = localStorageService.get('storeId');
                }
                var fb_email = null;
                if (localStorage.getItem("FB_LoggedIn_User_EmailID")) {
                    fb_email = localStorage.getItem("FB_LoggedIn_User_EmailID");
                } else {
                    fb_email = "anonymous@email.com"
                }
                $http.post("" + config.apiUrlFn + "db/addComment/" + id + "/" + fb_email, data)
                    .success(function (data) {
                        //console.log("------", data);
                        deferred.resolve(data);
                    }).error(function (data) {
                    console.log("????", data);
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            getComments: function () {
                var deferred = $q.defer();
                //var movieFormat = searchMovieText.get();
                id = searchMovieText.get();
                if (id != "") {
                    var storedId = localStorageService.set('storeId', id);
                } else {
                    id = localStorageService.get('storeId');
                }
                //$http.get("" + config.apiUrlFn + "db/rottenTomatoes/zootopia")
                console.log("" + config.apiUrlFn + "db/getComments/" + id);
                $http.get("" + config.apiUrlFn + "db/getComments/" + id)
                    .success(function (data) {
                        //console.log("------", data);
                        deferred.resolve(data);
                    }).error(function (data) {
                    //console.log("????", data);
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            getTomatoResult: function () {
                var deferred = $q.defer();
                //var movieFormat = searchMovieText.get();
                id = searchMovieText.get();
                if (id != "") {
                    var storedId = localStorageService.set('storeId', id);
                } else {
                    id = localStorageService.get('storeId');
                }
                //$http.get("" + config.apiUrlFn + "db/rottenTomatoes/zootopia")
                console.log('"" + config.apiUrlFn + "db/rottenTomatoes/"+id', "" + config.apiUrlFn + "db/rottenTomatoes/" + id);
                $http.get("" + config.apiUrlFn + "db/rottenTomatoes/" + id)
                    .success(function (data) {
                        deferred.resolve(data);
                    }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            getMovieInfo: function () {
                var deferred = $q.defer();
                //$http.get("" + config.apiUrlFn + "/db/movieinfo/zootopia")
                $http.get("" + config.apiUrlFn + "/db/movieinfo/" + id)
                    .success(function (data) {
                        deferred.resolve(data);
                    }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            movieShowTime: function () {
                var deferred = $q.defer();
                //$http.get("" + config.apiUrlFn + "/db/movieinfo/zootopia")
                $http.get("" + config.apiUrlFn + "/db/admin/get-movie-schedule/" + id)
                    .success(function (data) {
                        deferred.resolve(data);
                    }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            }
        };
    })
    .factory('movieApiaryInfo', function ($q, $http, apiKey, searchMovieText) {
        var movieId = "";
        var movieTitle = "";
        var movieImdbId = "";
        return {
            getSearchDetails: function () {
                var deferred = $q.defer();
                //search movies
                $http.get("" + config.movieApiUrl + "search/movie?api_key=" + config.key + "&query=" + searchMovieText.get() + "&year=2016")
                    .success(function (data) {
                        movieId = data.results[0].id;
                        movieTitle = data.results[0].title;
                        movieImdbId = data.results[0].imdb_id;
                        deferred.resolve(data, movieId, movieImdbId);
                    }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            getMovieById: function (id) {
                var deferred = $q.defer();
                var results = "";
                $http.get("" + config.movieApiUrl + "movie/" + id + "?api_key=" + config.key)
                    .success(function (data) {
                        results = data;
                        deferred.resolve(data);
                    }).error(function (data) {
                    results = data;
                    deferred.reject(data);
                });
                //return results;
                return deferred.promise;
            },
            getTomatoResult1: function (id) {
                var deferred = $q.defer();
                $http.get("http://www.omdbapi.com/?i=" + id + "&year=2016&plot=full&r=json&tomatoes=true")
                    .success(function (dataOmdb) {
                        deferred.resolve(dataOmdb);
                    }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            }
        };
    });
