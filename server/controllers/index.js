var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      if (!req.body) {
        return res.sendResponse(400);
      } else {
        console.log("I am in the controller", req.body);
      }
      models.messages.get().then(messages => {
      console.log(messages);
    });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      if (!req.body) {
        return res.sendResponse(400);
      } else {
        console.log("I am in the post", req.body);
      }
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

