var url = require('url');
var http = require("http");
var _ = require('underscore');
var fs = require('fs');
var moment = require('moment');

module.exports.requestRouter = function (request, response) {
  var urlObj = url.parse(request.url);
  if (urlObj.path === '/') {
    sendIndex(response);

  } else if (urlObj.path.indexOf('static') !== -1 ) {
    sendRemaining(urlObj.path, response);

  } else if (urlObj.path === '/1/classes/messages') {

    if (request.method === 'OPTIONS') {
      response.writeHead(200, responseHeaders);
      response.end();
    }

    if (request.method === 'POST') {
      messageHandler(request, response);
    }

    if (request.method === 'GET') {
      sendMessageHandler(request, response);
    }
  } else {
    response.writeHead(404);
    response.end();
  }
};

var messageHandler = function(request, response) {
  response.writeHead(201, responseHeaders);

  request.on('data', function(data) {
    var messageObj = {};
    var database = request.database;
    var messageData = JSON.parse(data.toString());

    messageObj.username = messageData.username;
    messageObj.text = messageData.text;

    insertMessageQuery(messageObj, database);
  });

  request.on('end', function() {
     response.end();
  });
};

var insertMessageQuery = function(obj, database) {
  var newMessage = database.build(obj);

  newMessage.save().success(function() {
    console.log('success');
  });
};


var sendMessageHandler = function(request, response) {
  var messageObj = {};
    messageObj.results = [];

  var database = request.database;
  var query = database.findAll().success(function(msgs) {
    _.each(msgs, function(msg) {
      messageObj.results.push(msg.dataValues);
    });

    responseHeaders['Content-Type'] = 'application/json';
    response.writeHead(200, responseHeaders);
    response.write(JSON.stringify(messageObj));
    response.end();
  });
};


var responseHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10 // Seconds.
};

var write = function(data, response, responseHeaders) {
  var dataString = data.toString();
  response.writeHead(200, responseHeaders);
  response.write(dataString);
  response.end();
};

var sendIndex = function(response) {
  fs.readFile('/Users/hackreactor/code/kbrainwave/2013-08-databases/2013-08-chat-server/index.html', function(err, data) {
    if (err) {
      throw new Error('oh nose! </3');
    }

    responseHeaders['Content-Type'] = 'text/html';
    write(data, response, responseHeaders);
  });
};

var sendRemaining = function(path, response) {
  if (path.indexOf('.css') !== -1) {
    fs.readFile('/Users/hackreactor/code/kbrainwave/2013-08-databases/2013-08-chat-server/'+ path, function(err, data) {
      responseHeaders['Content-Type'] = 'text/css';
      write(data, response, responseHeaders);
    });
  } else {
    fs.readFile('/Users/hackreactor/code/kbrainwave/2013-08-databases/2013-08-chat-server/' + path, function(err, data) {
      responseHeaders['Content-Type'] = 'text/javscript';
      write(data, response, responseHeaders);
    });
  }
};
