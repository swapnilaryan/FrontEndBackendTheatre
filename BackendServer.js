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
var router = null;
var pool = null;
var kill = require("killport");
function REST(){
    var self = this;
    self.connectMysql();
    console.log("-------------------------------------------");
}
// Read the configuration file
var mysqlConfig = JSON.parse(fs.readFileSync('config.json', 'utf8'));
//console.log(mysqlConfig.mysql);
// End Reading configuration files
REST.prototype.connectMysql = function() {
    console.log('-----------------------------------------------------------');
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
            self.stop(err);
            server.close();
            console.log("Going to start a new REST");
            connection.destroy();
            self.connectMysql();
        } else {
            self.configureExpress(connection,pool);
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
    app.listen(port,function(err){
        console.log("All right ! I am alive at Port----- ", port);
    });
    self.startServer();
};
var port = process.env.PORT || mysqlConfig.sitePort;        // set our port
REST.prototype.startServer = function() {
    console.log("trying to craeate error");
    kill(port).then(function(out){
            console.log(out);
        })
        // if failed
        .catch(function(err){
            console.log(err);
        });
    server = app.listen(port,function(err){
        console.log("All right ! I am alive at Port ", port);
    }).on('error', function(err) {
        console.log("qweqwter", err);
        server.close();
        REST.prototype.stop(null);
    });
};

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
};

new REST();

