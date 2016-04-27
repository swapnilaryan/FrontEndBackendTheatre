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
console.log("Mysql is connected",connection);
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;        // set our port

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