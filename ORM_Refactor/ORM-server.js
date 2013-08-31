var mysql = require('sequelize-mysql').mysql;
var handler = require('/Users/hackreactor/code/kbrainwave/2013-08-databases/ORM_Refactor/route-handler.js');
var Sequelize = require('sequelize-mysql').sequelize;
var http = require("http");
var url = require('url');
var port = 8080;
var ip = "127.0.0.1";

var sequelize = new Sequelize("chat", "root");

var Message = sequelize.define('Message', {
  username: Sequelize.STRING,
  text: Sequelize.STRING
});

var server = http.createServer(function(req, res){
  req.database = Message;
  handler.requestRouter(req, res);
});

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

