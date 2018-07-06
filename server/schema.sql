-- CREATE DATABASE chat;

USE chat;


CREATE TABLE rooms (
  /* Describe your table here.*/
  /*id, name*/
  id int, name text, PRIMARY KEY (id)
);

CREATE TABLE users (
  /* Describe your table here.*/
  /* id, name*/
  id int, name text, PRIMARY KEY (id)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  /*id, time stamp, text, should point to a user id and a room id*/
  id int, time int, text text, user int, room int, PRIMARY KEY (id), FOREIGN KEY (user) REFERENCES users(id), FOREIGN KEY (room) REFERENCES rooms(id)
);
/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

