/**
 * Created by !!.Swapnil..Aryan.!! on 27-Apr-16.
 */
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var fs         = require('fs');
var RottenCrawler = require("./RottenCrawler.js");
var async = require("async");
var reqPro = require('request-promise');
var apiKey = "2c9306d42037dfb0de0fc3f153819054";
var request = require('request');

// Read the configuration file
var mysqlConfig = JSON.parse(fs.readFileSync('config.json', 'utf8'));
//console.log(mysqlConfig.mysql);
// End Reading configuration
var connection = mysql.createPool({ // Mysql Connection
    connectionLimit : 100000,
    host     : mysqlConfig.mysql.host,
    user     : mysqlConfig.mysql.user,
    password : mysqlConfig.mysql.password,
    port     : mysqlConfig.mysql.port,
    database : mysqlConfig.mysql.database
});
//var connection = mysql.createConnection({ // Mysql Connection
//    host     : mysqlConfig.mysql.host,
//    user     : mysqlConfig.mysql.user,
//    password : mysqlConfig.mysql.password,
//    port     : mysqlConfig.mysql.port,
//    database : mysqlConfig.mysql.database
//});
function handleDisconnect(){
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            console.error('error connecting: ' + err.code);
            setTimeout(handleDisconnect, 20);
            //return;
        }
        console.log('connected as id ' + connection.threadId);
    });
}
connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
        console.log("Error is ", err.code);                          // server variable configures this)
        handleDisconnect();
    }
});
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// handle CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// End handling CORS

var port = process.env.PORT || mysqlConfig.sitePort;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

// ROUTES FOR OUR API
// =============================================================================

// ======= These are the ones which will be used by actual application =========
// 1. Get all from movieinfo
router.get('/db/movieinfo/:movie_name',function(req,res){
    //connection.query("SELECT * from movieinfo where infoImdbID = ?",[req.params.movie_name],function(err, rows, fields){
    connection.query("SELECT * from movieinfo where infoImdbID = ?",["tt2948356"],function(err, rows, fields){
        console.log("Something happening");
        if(rows.length != 0){
            console.log(rows.length);
            res.json(rows[0]);
        }else{
            res.json({ Error: 'An error occured' });
        }
    });
});
// 2. Get all from movietomatoes
router.get("/db/rottenTomatoes/:movie_name", function (req,res) {
    var query = 'SELECT * FROM ?? WHERE mtImdbID = ?';
    var table = ["movietomatoes","tt2948356"];
    query = mysql.format(query,table);
    //console.log(query);
    connection.query(query,function(err,rows){
        if(rows.length != 0){
            console.log(rows.length);
            res.json(rows[0]);
        }else{
            res.json({ Error: 'An error occured' });
        }
    });
});
// ============= End of writing API's to be used by our database ===============

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        //console.log('content-type:', res.headers['content-type']);
        //console.log('content-length:', res.headers['content-length']);
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};
// ================================= Online API=================================
// 1. fetch upcoming movies
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
                            connection.query(query,function(err,rows){
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
// ================================End online API===============================