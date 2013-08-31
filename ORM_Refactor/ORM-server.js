var mysql = require('mysql');
var handler = require('/Users/hackreactor/code/kbrainwave/2013-08-databases/ORM_Refactor/route-handler.js');
var http = require("http");
var url = require('url');
var port = 8080;
var ip = "127.0.0.1";

var dbConnection = mysql.createConnection({
  user: "root",
  //password: "",
  database: "chat"
});

dbConnection.connect();


var server = http.createServer( function(req, res){
  req.database = dbConnection;
  handler.requestRouter(req, res);
});

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

// dbConnection.end();
