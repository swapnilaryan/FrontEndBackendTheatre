/**
 * Created by !!.Swapnil..Aryan.!! on 31-Mar-16.
 */
//var gzippo = require('gzippo');
//var express = require('express');
//var morgan = require('morgan');
//var http = require('http');
//var app = express();
//
//app.use(morgan('dev'));
//app.use(gzippo.staticGzip("" + __dirname + "/dist"));
//app.listen(process.env.PORT || 5000);

//var express = require('express');
//var http = require('http');
//var gzippo = require('gzippo');
//
//var app = express();
//app.use(gzippo.staticGzip('' + __dirname));
//app.use('/*', function(req, res){
//    res.sendfile(__dirname + '/index.html');
//});
//
//var server = http.createServer(app);
//server.listen(process.env.PORT || 5000);

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get(/^(.+)$/, function (req, res) {
    res.sendFile(__dirname + req.params[0]);
});

var PORT = process.env.PORT || 3000;

app.listen(PORT);