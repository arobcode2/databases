var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      var queryStr = `SELECT * FROM messages`;
    return db.myQuery(queryStr)
    }, // a function which produces all the messages
    post: function (text, user, room) {
      var queryStr = `INSERT INTO messages (time, text, user, room) Values (${Date.now()}, ${text}, ${user}, ${room})`;
    return db.myQuery(queryStr)} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

