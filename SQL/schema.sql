CREATE database chat;

USE chat;

CREATE TABLE messages (
  id INT AUTO_INCREMENT,
  text TEXT(160),
  created_At TIMESTAMP,
  room_id INT,
  username VARCHAR(20),
  PRIMARY KEY(id)
);

CREATE TABLE rooms (
  id INT AUTO_INCREMENT,
  name VARCHAR(20),
  PRIMARY KEY(id)
);

CREATE TABLE users (
  id INT AUTO_INCREMENT,
  username VARCHAR(20),
  PRIMARY KEY (id)
);

/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
