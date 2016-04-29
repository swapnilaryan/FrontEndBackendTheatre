/**
 * Created by !!.Swapnil..Aryan.!! on 27-Apr-16.
 */
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var fs         = require('fs');

// Read the configuration file
var mysqlConfig = JSON.parse(fs.readFileSync('config.json', 'utf8'));
//console.log(mysqlConfig.mysql);
// End Reading configuration files

var connection = mysql.createConnection({ // Mysql Connection
    host     : mysqlConfig.mysql.host,
    user     : mysqlConfig.mysql.user,
    password : mysqlConfig.mysql.password,
    port     : mysqlConfig.mysql.port,
    database : mysqlConfig.mysql.database
});
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
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