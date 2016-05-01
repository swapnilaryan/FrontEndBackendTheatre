/**
 * Created by !!.Swapnil..Aryan.!! on 13-Apr-16.
 */
var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var fs = require('fs');
var rest = require("./Rest.js");
var app  = express();

function REST(){
    var self = this;
    self.connectMysql();
}
// Read the configuration file
var mysqlConfig = JSON.parse(fs.readFileSync('config.json', 'utf8'));
//console.log(mysqlConfig.mysql);
// End Reading configuration files
REST.prototype.connectMysql = function() {
    var self = this;
    var pool = mysql.createPool({
        connectionLimit : 100000,
        host     : mysqlConfig.mysql.host,
        user     : mysqlConfig.mysql.user,
        password : mysqlConfig.mysql.password,
        port     : mysqlConfig.mysql.port,
        database : mysqlConfig.mysql.database,
        debug    : mysqlConfig.mysql.debug
    });
    pool.getConnection(function(err,connection){
        if(err) {
            self.stop(err);
        } else {
            console.log("Connected");
            self.configureExpress(connection);
        }
    });
};

REST.prototype.configureExpress = function(connection) {
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
    var router = express.Router();
    app.use('/api', router);
    var rest_router = new rest(router,connection);
    self.startServer();
};
var port = process.env.PORT || mysqlConfig.sitePort;        // set our port
REST.prototype.startServer = function() {
    app.listen(port,function(){
        console.log("All right ! I am alive at Port ", port);
    });
};

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
};

new REST();