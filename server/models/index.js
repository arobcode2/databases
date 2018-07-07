var db = require('../db');

module.exports = {
  messages: {
    get: function () {
    return db.sequelize.sync().then(() => db.Message.findAll());
    }, // a function which produces all the messages
    post: function (body) {
      body.createdAt = Date.now();
    return db.sequelize.sync().then(() => db.Message.create(body));
    } // a function which can be used to insert a message into the database
  },

  users: {
    get: function () {
    return db.sequelize.sync().then(() => db.User.findAll());
    }, // a function which produces all the messages
    post: function (body) {
    return db.sequelize.sync().then(() => db.User.create(body));
    } 
  }
};

