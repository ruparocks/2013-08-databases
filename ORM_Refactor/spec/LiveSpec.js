/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */
var mysql = require('sequelize-mysql').mysql;
var Sequelize = require('sequelize-mysql').sequelize;
var request = require("request"); // You might need to npm install the request module!
var _ = require('underscore');

describe("ORM-server", function() {
  var sequelize;
  var Message;

  beforeEach(function() {
    sequelize = new Sequelize("chat", "root");

    Message = sequelize.define('Message', {
      username: Sequelize.STRING,
      text: Sequelize.STRING
    });

    Message.sync();
  });

  afterEach(function() {
    Message.deleteAll();
  });

  it("Should insert posted messages to the DB", function(done) {
    // Post a message to the node chat server:
    request({method: "POST",
             uri: "http://127.0.0.1:8080/1/classes/messages",
             json: {username: "Valjean",
                    text: "In mercy's name, three days is all I need."}
            },
            function(error, response, body) {
              var messageObj = {};
              messageObj.results = [];

              Message.findAll().success(function(msgs) {
                 _.each(msgs, function(msg) {
                   messageObj.results.push(msg.dataValues);
                 });
              });
              // var query = database.findAll().success(function(msgs) {
              //  console.log('msgs', msgs);
              // });
              // var queryString = 'SELECT * FROM messages';
              // var queryArgs = {username: "Valjean", text: "In mercy's name, three days is all I need."};
              /* Change the above queryString & queryArgs to match your schema design
               * The exact query string and query args to use
               * here depend on the schema you design, so I'll leave
               * them up to you. */
              // dbConnection.query(queryString, queryArgs,
              // function(err, results, fields) {
              //   console.log(results);
              //   if (err) {
              //     throw new Error(error);
              //   }
              //     // Should have one result:
                   expect(messageObj.results.length).toEqual(1);
                   //expect(results[0].username).toEqual("Valjean");
                   //expect(results[0].text).toEqual("In mercy's name, three days is all I need.");
              //     /*: You will need to change these tests if the
              //      * column names in your schema are different from
              //      * mine! */

                   done();  
    });
  });

  xit("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
    var queryString = "INSERT INTO messages SET ?";
    var queryArgs = {username: "Javert", text: "Men like you can never change!"};
    /* TODO - The exact query string and query args to use
     * here depend on the schema you design, so I'll leave
     * them up to you. */

    dbConnection.query( queryString, queryArgs,
      function(err, results, fields) {
        console.log('results', results);
        /* Now query the Node chat server and see if it returns
         * the message we just inserted: */
        request("http://127.0.0.1:8080/1/classes/messages",
          function(error, response, body) {
            console.log('body', body);
            var messageLog = JSON.parse(body);
            console.log('messageLog', messageLog);
            expect(messageLog.results[0].username).toEqual("Javert");
            expect(messageLog.results[0].text).toEqual("Men like you can never change!");
            done();
          });
      });
  });
});
