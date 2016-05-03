/**
 * Created by !!.Swapnil..Aryan.!! on 13-Apr-16.
 */
var mysql = require("mysql");
var reqPro = require('request-promise');
var RottenCrawler = require("./RottenCrawler.js");
var async = require("async");
var apiKey = "2c9306d42037dfb0de0fc3f153819054";
var fs = require('fs'),
    request = require('request');
var conn="";
function REST_ROUTER(router,connection,pool) {
    var self = this;
    conn = connection;
    var rc = new RottenCrawler("For Connection");
    var con = rc.getConnection(conn,pool);
    self.handleRoutes(router,connection,pool);
}


//Run the upcoming api everyday
var cron = require('cron');
var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        //console.log('content-type:', res.headers['content-type']);
        //console.log('content-length:', res.headers['content-length']);
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};
//var cronJob = cron.job("00 06 01 * * *", function(){
//    // perform operation e.g. GET request http.get() etc.
//    request('http://localhost:3000/api/upcoming',function(response){
//            console.log("Started");
//            });
//    var today = new Date();
//    var time = today.toISOString().substring(0, 10);
//    /*Delete Released Movies*/
//    var query = "DELETE FROM upcomingMovies WHERE upReleaseDate = ?";
//    var table = [time];
//    query = mysql.format(query,table);
//    conn.query(query,function(err,rows){
//        if(err) {
//            console.log("Error",err);
//        } else {
//            console.log("Success");
//        }
//    });
//    /*End Deleting*/
//    console.info('cron job completed');
//});
//cronJob.start();

console.log("Hi");
REST_ROUTER.prototype.handleRoutes= function(router,connection,pool) {
    router.get("/upcoming",function(req,res) {
        var items = [1];
        var totPage = [];
        var ret = [];
        async.eachSeries(items, function(item, callback){
            var url = "http://api.themoviedb.org/3/movie/upcoming?api_key=2c9306d42037dfb0de0fc3f153819054&page=" + item + "&language=en";
            reqPro(url).then(function(response){
                for(var i =1;i<=JSON.parse(response).total_pages;i++){
                    totPage.push(i);
                }
                //console.log("total pages fetched is",totPage);
                callback();
            });
        },function (err){
            if(err){
                console.log("Some Error happened at url fetching. Do manually",err);
            }
            else{
                console.log("All Upcoming Movies Fetched");
                async.eachSeries(totPage, function(item, callback) {

                    // Perform operation on file here.
                    var url = "http://api.themoviedb.org/3/movie/upcoming?api_key=2c9306d42037dfb0de0fc3f153819054&page=" + item + "&language=en";
                    reqPro(url).then(function(response){
                        var t = [];
                        for(var x = 0;x<JSON.parse(response).results.length;x++){
                            t.push(x);
                        }
                        async.eachSeries(t, function(i, callback) {
                            var upC = {
                                "id": "",
                                "title": "",
                                "release_date":"",
                                "poster_path":"",
                                "original_language":"",
                                "page":""
                            };
                            if(JSON.parse(response).results[i].original_language=='en'){
                                upC["id"] = JSON.parse(response).results[i].id;
                                upC["page"] = JSON.parse(response).page;
                                upC["title"] = JSON.parse(response).results[i].title;
                                upC["release_date"] = JSON.parse(response).results[i].release_date;
                                upC["poster_path"] = '/images/upcoming'+JSON.parse(response).results[i].poster_path;
                                upC["original_language"] = JSON.parse(response).results[i].original_language;

                                /*Adding to Database*/
                                var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
                                var table = ["upcomingMovies","upMovieId","upMovieName","upReleaseDate","upPosterPath",
                                    JSON.parse(response).results[i].id,
                                    JSON.parse(response).results[i].title,
                                    JSON.parse(response).results[i].release_date,
                                    "/images/upcoming"+JSON.parse(response).results[i].poster_path
                                ];
                                query = mysql.format(query,table);
                                conn.query(query,function(err,rows){
                                    if(pool._freeConnections.indexOf(conn) == -1){
                                        conn.release();
                                    }
                                    if(err) {
                                        console.log("Error",err);
                                    } else {
                                        console.log("Success");
                                    }
                                });
                                /*End adding*/

                                if(JSON.parse(response).results[i].poster_path != null){
                                    var ll =[i];
                                    async.eachSeries(ll, function(i, callback) {
                                        download('http://image.tmdb.org/t/p/w500'+JSON.parse(response).results[i].poster_path
                                            , './app/images/upcoming'+JSON.parse(response).results[i].poster_path, function(){
                                                console.log('image downloaded');
                                            });
                                        callback();
                                    }, function(err){
                                        // if any of the file processing produced an error, err would equal that error
                                        if( err ) {
                                            // One of the iterations produced an error.
                                            // All processing will now stop.
                                            console.log('A file failed to process',err);
                                        } else {
                                            console.log('All files have been processed successfully');
                                        }
                                    });
                                }
                                ret.push(upC);
                                //console.log("ret is ",ret);
                            }
                            callback();
                        },function(err){
                            // if any of the file processing produced an error, err would equal that error
                            if( err ) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                console.log('A file failed to process',err);
                            } else {
                                console.log('All files have been processed successfully');
                            }
                        });
                        callback();
                    });
                }, function(err){
                    // if any of the file processing produced an error, err would equal that error
                    if( err ) {
                        // One of the iterations produced an error.
                        // All processing will now stop.
                        console.log('A file failed to process',err);
                    } else {
                        console.log('All files have been processed successfully');
                        res.json(ret);
                    }
                });
            }
        });
    });

    router.get("/rt/:movie_name", function (req,res) {
        var rc = new RottenCrawler();
        rc.getMovieInfo()
            .then(function() {
                res.json(rc);
            });
    });
    router.get("/rt/:movie_name/critics", function (req,res) {
        //console.log(req.params.movie_name);
        var rc = new RottenCrawler('/m/'+req.params.movie_name+'/');
        rc.getCriticsInfo()
            .then(function() {
                res.json(rc);
            });
    });
    router.get("/rotten_tomatoes/:movie_name", function (req,res) {
        var rc = new RottenCrawler(req.params.movie_name);
        var tomatoURL = "";
        var imdb_id = "";
        var crawlTomatoData = "";
        async.series([
            function(callback){
                rc.theMovieDB()
                    .then(function() {
                        //console.log(rc.movieResponse["movieInfo"]);
                        imdb_id = rc.movieResponse["movieInfo"][0].imdb_id;
                        tomatoURL = rc.movieResponse["omdbData"][0].tomatoURL;
                        tomatoURL = tomatoURL.replace("http://www.rottentomatoes.com","");
                        //console.log("Done",tomatoURL);
                        callback();
                    });
            },
            function(callback){
                var rc = new RottenCrawler(tomatoURL);
                rc.getMovieInfo()
                    .then(function() {
                        crawlTomatoData = rc.crawlTomato;
                        callback();
                    });
            }
        ],function(err){
            if(err){
                res.json({"Error" : true, "Message" : "Error Details:- "+err});
            }
            else{
                res.json({"Error" : false, "Message" : "Success"});
            }
        });
    });
    router.get("/the_movie_db/:movie_name", function (req,res){
        /*Using Async WaterFall Model to collect Data for the year 2016*/
        var date = new Date();
        var year = date.getFullYear();
        var searchElementID = '';
        var url = 'http://api.themoviedb.org/3/search/movie?api_key='+apiKey+"&query="+req.params.movie_name+"&year="+year;
        var re = {};
        async.waterfall([
            //1stly Search Movies via apiary/search/movie
           function(callback) {
                reqPro(url).then(function(response){
                    var ret = JSON.parse(response).results;
                    //console.log(re.response[0].poster_path);
                    // if movie not found
                    //console.log("total results",response,);
                    if( JSON.parse(response).total_results!=0){
                        if(ret[0].poster_path!=null){
                            download('http://image.tmdb.org/t/p/w500'+ret[0].poster_path
                                , './app/images/nowShowing'+ret[0].poster_path, function(){
                                    console.log('saved image');
                                });
                        }
                        callback(null, ret[0].id);
                    }else{
                        res.json({"Error":true, "Message":"No Movies Found"});
                    }
                });
            },
            function(id, callback) {
                // id now equals 2nd parameter from previous callback
                //2ndly get movie details as per id(set by apiary)
                var url2 = 'http://api.themoviedb.org/3/movie/'+id+'?api_key='+apiKey;
                reqPro(url2).then(function(response){
                    re.movieDetails = JSON.parse(response);
                    //console.log(JSON.parse(response));
                    callback(null, re.movieDetails.imdb_id,id);
                });
            },
            function(imdb_id, id,callback) {
                //3rdly call OMDB API for extra results
                searchElementID = id;
                var url3 = "http://www.omdbapi.com/?i="+imdb_id+"&plot=full&r=json&tomatoes=true";
                reqPro(url3).then(function(response){
                    re.omdbData = JSON.parse(response);
                    callback(null,id);
                });
            },
            //lastly call the casts and crews
            function(id,callback){
                var url4 = 'http://api.themoviedb.org/3/movie/'+id+'/credits?api_key='+apiKey;
                reqPro(url4).then(function(response){
                    re.credits = JSON.parse(response);
                    //console.log(";;;;;",re.credits.cast.length);
                    var times2iterate = [];
                    for(var i=0;i<re.credits.cast.length;i++){
                        times2iterate.push(i);
                    }
                    //save cast images to credits
                    async.eachSeries(times2iterate, function(i, callback) {
                        if(re.credits.cast[i].profile_path != null){
                            download('http://image.tmdb.org/t/p/w500'+re.credits.cast[i].profile_path
                                , './app/images/credits'+re.credits.cast[i].profile_path, function(){
                                    console.log('saved image');
                                });
                        }
                        callback();
                    },
                        function(err){
                            // if any of the file processing produced an error, err would equal that error
                            if( err ) {
                                // One of the iterations produced an error.
                                // All processing will now stop.
                                res.json({"Error":true, "Message":err});
                                console.log('A file failed to process',err);
                            } else {
                                console.log('All files have been processed successfully');
                                //res.json(ret);
                            }
                        });
                    callback(null,re);
                });
            },
            //Now we are ready to save them to database
            function(toBeSaved,callback){
                //for(var k = 0;k<toBeSaved.credits.cast.length;k++){
                //    console.log("---",toBeSaved.omdbData);
                //}
                /*Beautifying our data*/

                toBeSaved.movieDetails.id = (toBeSaved.movieDetails.id)?toBeSaved.movieDetails.id:"N/A";
                toBeSaved.movieDetails.imdb_id = (toBeSaved.movieDetails.imdb_id)?toBeSaved.movieDetails.imdb_id:"N/A";
                toBeSaved.omdbData.Title = (toBeSaved.omdbData.Title)?toBeSaved.omdbData.Title:"N/A";
                toBeSaved.omdbData.Released = (toBeSaved.omdbData.Released)?toBeSaved.omdbData.Released:"N/A";
                toBeSaved.omdbData.Runtime = (toBeSaved.omdbData.Runtime)?toBeSaved.omdbData.Runtime:"N/A";
                toBeSaved.omdbData.Rated = (toBeSaved.omdbData.Rated)?toBeSaved.omdbData.Rated:"N/A";
                toBeSaved.omdbData.Writer = (toBeSaved.omdbData.Writer)?toBeSaved.omdbData.Writer:"N/A";
                toBeSaved.omdbData.Genre = (toBeSaved.omdbData.Genre)?toBeSaved.omdbData.Genre:"N/A";
                toBeSaved.omdbData.imdbRating = (toBeSaved.omdbData.imdbRating)?toBeSaved.omdbData.imdbRating:"N/A";
                toBeSaved.omdbData.Production = (toBeSaved.omdbData.Production)?toBeSaved.omdbData.Production:"N/A";
                toBeSaved.omdbData.Production = (toBeSaved.omdbData.Production)?toBeSaved.omdbData.Production:"N/A";
                toBeSaved.omdbData.Website = (toBeSaved.omdbData.Website)?toBeSaved.omdbData.Website:"N/A";
                toBeSaved.omdbData.Plot = (toBeSaved.omdbData.Plot)?toBeSaved.omdbData.Plot:"N/A";
                toBeSaved.movieDetails.poster_path = (toBeSaved.movieDetails.poster_path)?toBeSaved.movieDetails.poster_path:"N/A";
                toBeSaved.omdbData.BoxOffice = (toBeSaved.omdbData.BoxOffice)?toBeSaved.omdbData.BoxOffice:"N/A";

                /*End Beautifying data*/
                /*Adding to Database*/
                var query = "INSERT INTO movieinfo " +
                    "(infoMovieID, " +
                    "infoImdbID, " +
                    "infoMovieName," +
                    "infoMovieInTheatres, " +
                    "infoMovieRuntime, " +
                    "infoMovieRated, " +
                    "infoMovieDirectedBy, " +
                    "infoMovieWrittenBy, "+
                    "infoMovieGenre, " +
                    "infoMovieImdbRating, " +
                    "infoMovieProduction, " +
                    "infoMovieWebsite, " +
                    "infoMovieDescription, " +
                    "infoMoviePosterPath, " +
                    "infoMovieCasts, "+
                    "infoMovieBoxOffice) VALUES " +
                    "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                var table = [
                    toBeSaved.movieDetails.id,
                    toBeSaved.movieDetails.imdb_id,
                    toBeSaved.omdbData.Title,
                    toBeSaved.omdbData.Released,
                    toBeSaved.omdbData.Runtime,
                    toBeSaved.omdbData.Rated,
                    toBeSaved.omdbData.Director,
                    toBeSaved.omdbData.Writer,
                    toBeSaved.omdbData.Genre,
                    toBeSaved.omdbData.imdbRating,
                    toBeSaved.omdbData.Production,
                    toBeSaved.omdbData.Website,
                    toBeSaved.omdbData.Plot,
                    "/images/nowShowing"+toBeSaved.movieDetails.poster_path,
                    JSON.stringify(toBeSaved.credits.cast),
                    toBeSaved.omdbData.BoxOffice
                ];
                query = mysql.format(query,table);
                //console.log(query);
                conn.query(query,function(err,rows){
                    if(pool._freeConnections.indexOf(conn) == -1){
                        conn.release();
                    }
                    if(err) {
                        console.log("Error",err);
                    } else {
                        console.log("Success");
                    }
                });
                /*End adding*/
                callback(null,toBeSaved);
            }
        ], function (err, result) {
            // result now equals 'done'
            if(err){
                res.json({"Error":true, "Message":err});
            }else{
                console.log("seacrghc ekelment is ",searchElementID);
                var query = 'SELECT * FROM ?? WHERE infoMovieID = ?';
                var table = ["movieinfo",searchElementID];
                query = mysql.format(query,table);
                //console.log(query);
                conn.query(query,function(err,rows){
                    if(pool._freeConnections.indexOf(conn) == -1){
                        conn.release();
                    }
                    if(err) {
                        console.log("Error",err);
                    } else {
                        console.log("Success");
                        res.json(rows);
                    }
                });
            }
        });
        /*End Waterfall*/
    } );
    /*Fetch from our database*/
    // 1. Get all from movietomatoes
    router.get("/db/rottenTomatoes/:imdbID", function (req,res) {
        var query = 'SELECT * FROM ?? WHERE mtImdbID = ?';
        //var table = ["movietomatoes","tt1608290"];
        console.log("So the here siasbh -==========",req.params.imdbID);
        var table = ["movietomatoes",req.params.imdbID];
        query = mysql.format(query,table);
        //console.log(query);
        conn.query(query,function(err,rows){
            if(pool._freeConnections.indexOf(conn) == -1){
                conn.release();
            }
            if(err) {
                console.log("Error",err);
                res.json( {"Error":rows} );
            } else {
                console.log("Success");
                res.json(rows[0]);
            }
        });
    });

    //2. Get all from movieinfo
    router.get("/db/movieinfo/:imdbID", function (req,res) {
        //var query = 'SELECT * FROM ?? WHERE infoImdbID = ?';
        //var table = ["movieinfo","tt2948356"];
        //query = mysql.format(query,table);
        //console.log(query);
         connection.query("SELECT * from movieinfo where infoImdbID = ?",
             [req.params.imdbID],function(err, rows){
                 if(pool._freeConnections.indexOf(conn) == -1){
                     conn.release();
                 }
                 console.log("Something happening");
                 if(err){
                     res.json({ Error: 'An error occured' });
                 }else{
                     res.json(rows[0]);
                 }
            });
    });
    //3. Get all from movieinfo for now showing
    router.get("/db/nowShowing", function (req,res) {
        connection.query("SELECT ??, ?? , ??, ?? from ??",
            ["infoMovieID","infoImdbID","infoMovieName","infoMoviePosterPath","movieinfo"],function(err, rows){
                if(pool._freeConnections.indexOf(conn) == -1){
                    conn.release();
                }
                console.log("Something happening");
                if(err){
                    res.json({ Error: 'An error occured :- '+err });
                }else{
                    res.json(rows);
                }
            });
    });

    //4. Get all from upcomingmovies for upcoming
    router.get("/db/upcoming", function (req,res) {
        connection.query("SELECT * from ?? where ?? != '/images/upcomingnull' ORDER BY ?? ",
            ["upcomingMovies","upPosterPath","upReleaseDate"],function(err, rows){
                if(pool._freeConnections.indexOf(conn) == -1){
                    conn.release();
                }
                console.log("Something happening");
                if(err){
                    res.json({ Error: 'An error occured' });
                }else{
                    res.json(rows);
                }
            });
    });

};

module.exports = REST_ROUTER;