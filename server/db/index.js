var mysql = require('mysql');
var Sequelize = require('sequelize');
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var sequelize = new Sequelize('chat', 'student', 'student', {host: 'localhost', dialect: 'mysql'});

var Message = sequelize.define('messages', {
  createdAt: Sequelize.BIGINT,
  roomname: Sequelize.TEXT,
  username: Sequelize.TEXT,
  message: Sequelize.TEXT
}, {
  timestamps: false
})

var User = sequelize.define('users', {
  username: Sequelize.TEXT
}, {
  timestamps: false
})

module.exports = {sequelize, Message, User}
