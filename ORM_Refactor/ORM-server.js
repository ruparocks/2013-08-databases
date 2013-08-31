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

// Message.sync().success(function() {
//   var newMessage = Message.build({username:'rupa', text:'TGIS'});

//   newMessage.save().success(function() {
//     console.log('save');
//     // newMessage.findAll({ where: {username: "rupa"} }).success(function(msgs) {
//     //   for (var i = 0; i < msgs.length; i++) {
//     //     console.log(msgs[i].username + ": " + msgs[i].text);
//     //   }
//     // });
//   });
// });
// var dbConnection = mysql.createConnection({
//   user: "root",
//   //password: "",
//   database: "chat"
// });

// dbConnection.connect();


var server = http.createServer(function(req, res){
  //req.database = dbConnection;
  handler.requestRouter(req, res);
});

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

// dbConnection.end();
