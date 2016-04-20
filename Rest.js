/**
 * Created by !!.Swapnil..Aryan.!! on 13-Apr-16.
 */
var mysql = require("mysql");
var reqPro = require('request-promise');
var RottenCrawler = require("./RottenCrawler.js");
var fs = require('fs'),
    request = require('request');
var conn="";
function REST_ROUTER(router,connection,md5) {
    var self = this;
    conn = connection;
    self.handleRoutes(router,connection,md5);
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
var cronJob = cron.job("*/3600 * * * * *", function(){
    // perform operation e.g. GET request http.get() etc.
    request('http://localhost:3000/api/upcoming',function(response){
            console.log("Started");
            });
    var today = new Date();
    var time = today.toISOString().substring(0, 10);
    /*Delete Released Movies*/
    var query = "DELETE FROM upcomingMovies WHERE upReleaseDate = ?";
    var table = [time];
    query = mysql.format(query,table);
    conn.query(query,function(err,rows){
        if(err) {
            console.log("Error",err);
        } else {
            console.log("Success",rows);
        }
    });
    /*End Deleting*/
    console.info('cron job completed');
});
cronJob.start();


console.log("Hi");
REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    router.get("/upcoming",function(req,res) {
        var async = require("async");
        var items = [1];
        var totPage = [];
        var ret = [];
        async.eachSeries(items, function(item, callback){
            var url = "http://api.themoviedb.org/3/movie/upcoming?api_key=2c9306d42037dfb0de0fc3f153819054&page=" + item + "&language=en";
            reqPro(url).then(function(response){
                for(var i =1;i<=JSON.parse(response).total_pages;i++){
                    totPage.push(i);
                }
                console.log("total pages fetched is",totPage);
                callback();
            });
        },function (err){
            if(err){
                console.log("Some Error happened at url fetching. Do manually");
            }
            else{
                console.log("All Upcoming Movies Fetched");
                async.eachSeries(totPage, function(item, callback) {

                    // Perform operation on file here.
                    var url = "http://api.themoviedb.org/3/movie/upcoming?api_key=2c9306d42037dfb0de0fc3f153819054&page=" + item + "&language=en";
                    console.log('Processing page ' + url);
                    reqPro(url).then(function(response){
                        var t = [];
                        for(var x = 0;x<JSON.parse(response).results.length;x++){
                            t.push(x);
                        }
                        console.log("t is ",t);
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
                                upC["poster_path"] = './app/images/upcoming'+JSON.parse(response).results[i].poster_path;
                                upC["original_language"] = JSON.parse(response).results[i].original_language;

                                /*Adding to Database*/
                                var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
                                var table = ["upcomingMovies","upMovieId","upMovieName","upReleaseDate","upPosterPath",
                                    JSON.parse(response).results[i].id,
                                    JSON.parse(response).results[i].title,
                                    JSON.parse(response).results[i].release_date,
                                    "./app/images/upcoming"+JSON.parse(response).results[i].poster_path
                                ];
                                query = mysql.format(query,table);
                                conn.query(query,function(err,rows){
                                    if(err) {
                                        console.log("Error",err);
                                    } else {
                                        console.log("Success",rows);
                                    }
                                });
                                /*End adding*/

                                if(JSON.parse(response).results[i].poster_path != null){
                                    var ll =[i];
                                    async.eachSeries(ll, function(i, callback) {
                                        download('http://image.tmdb.org/t/p/w500'+JSON.parse(response).results[i].poster_path
                                            , './app/images/upcoming'+JSON.parse(response).results[i].poster_path, function(){
                                                console.log('done');
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

    router.get("/movie",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["upcomingmovies"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
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
    router.get("/theMovieDB/:movie_name", function (req,res) {
        var rc = new RottenCrawler(req.params.movie_name);
        rc.theMovieDB()
            .then(function() {
                res.json(rc.movieResponse);
            });
    });
};

module.exports = REST_ROUTER;