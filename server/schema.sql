-- CREATE DATABASE chat;
DROP DATABASE chat;
CREATE DATABASE chat;

USE chat;


CREATE TABLE rooms (
  /* Describe your table here.*/
  /*id, name*/
  id int, name text, PRIMARY KEY (id)
);

CREATE TABLE users (
  /* Describe your table here.*/
  /* id, name*/
  id int not null auto_increment, username text, PRIMARY KEY (id)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  /*id, time stamp, text, should point to a user id and a room id*/
  id int not null auto_increment, createdAt bigint, message text, username text, roomname text, PRIMARY KEY (id) 
);
/* Create other tables and define schemas for them here! */


alter table messages auto_increment=1001;

alter table users auto_increment=1001;

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

