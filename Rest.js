/**
 * Created by !!.Swapnil..Aryan.!! on 13-Apr-16.
 */
var mysql = require("mysql");
var RottenCrawler = require("./RottenCrawler.js");
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
console.log("Hi");
REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    });
    router.get("/movie",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["movie_details"];
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
        var rc = new RottenCrawler('/m/'+req.params.movie_name+'/');
        rc.getMovieInfo()
            .then(function() {
                console.log("response",rc);
                res.json(rc);

                /*
                * Saving Them to our Database
                */
                //var query = "INSERT INTO ??(??,??) VALUES (?,?)";
                //var table = ["user_login","user_email","user_password",req.body.email,md5(req.body.password)];
                //query = mysql.format(query,table);
                //connection.query(query,function(err,rows){
                //    if(err) {
                //        res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                //    } else {
                //        res.json({"Error" : false, "Message" : "User Added !"});
                //    }
                //});
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