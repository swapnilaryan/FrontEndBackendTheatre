/**
 * Created by !!.Swapnil..Aryan.!! on 13-Apr-16.
 */
var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var fs = require('fs');
var rest = require("./Rest.js");
var app  = express();
var server ="";
var flag = 0;
var router = null;
var pool = null;
function REST(){
    var self = this;
    self.connectMysql();
    console.log("-------------------------------------------",flag);
}
// Read the configuration file
var mysqlConfig = JSON.parse(fs.readFileSync('config.json', 'utf8'));
//console.log(mysqlConfig.mysql);
// End Reading configuration files
REST.prototype.connectMysql = function() {
    var self = this;
    pool = mysql.createPool({
        connectionLimit : 1000,
        queueLimit: 0,
        waitForConnections: true,
        host     : mysqlConfig.mysql.host,
        user     : mysqlConfig.mysql.user,
        password : mysqlConfig.mysql.password,
        port     : mysqlConfig.mysql.port,
        database : mysqlConfig.mysql.database,
        debug    : mysqlConfig.mysql.debug
    });
    pool.getConnection(function(err,connection){
        if(err) {
            console.log("Error happened :- ",err);
            new REST();
        } else {
            console.log("Connected");
            setTimeout(function () {
                console.log('boo');
            }, 10000);
            self.configureExpress(connection,pool);
            setTimeout(function() {
                server.close();
                console.log("Hey closing trial", connection);
                connection = null;
            },20000);
            setTimeout(function (){
                console.log("Going to start a new REST");
                new REST();
            },30000);
        }
    });
};

REST.prototype.configureExpress = function(connection,pool) {
    var self = this;
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    //handle cors issue
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //end handling
    router = express.Router();
    app.use('/api', router);
    var rest_router = new rest(router,connection,pool);
    router.get("/db/upcoming", function (req,res) {
        connection.query("SELECT * from ?? where ?? != '/images/upcomingnull' ORDER BY ?? ",
            ["upcomingMovies","upPosterPath","upReleaseDate"],function(err, rows){
                //if(pool._freeConnections.indexOf(connection) == -1){
                //    connection.release();
                //}
                console.log("Something happening");
                if(err){
                    connection.release();
                    res.json({ Error: 'here line 470 An error occured' });
                }else{
                    res.json(rows);
                }
            });
    });

    //3. Get all from movieinfo for now showing
    router.get("/db/nowShowing", function (req,res) {
        connection.query("SELECT ??, ?? , ??, ?? from ??",
            ["infoMovieID","infoImdbID","infoMovieName","infoMoviePosterPath","movieinfo"],function(err, rows){
                //if(pool._freeConnections.indexOf(connection) == -1){
                //    connection.release();
                //}
                console.log("Something happening");
                if(err){
                    connection.release();
                    res.json({ Error: 'Here line 454 An error occured :- '+err });
                }else{
                    res.json(rows);
                }
            });
    });
    self.startServer();
};
var port = process.env.PORT || mysqlConfig.sitePort;        // set our port
REST.prototype.startServer = function() {
    server = app.listen(port,function(){
        console.log("All right ! I am alive at Port ", port);
    });
};

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
};

new REST();

