var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      if (!req.body) {
        return res.status(400).send('Invalid GET Request');
      } else {
        models.messages.get().then(messages => {
        var response = {results: messages};
        return res.status(200).send(response);
      });
    }
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      if (!req.body) {
        return res.status(400).send('Invalid POST Request');
      } else {
        var result = models.messages.post(req.body.message,req.body.username,req.body.roomname);
        result.then(val=>{
          return res.status(201).send('Message Added');
        }).catch(err=>{
          return res.status(500).send('Unable to Add Message');
        });
      }
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      if (!req.body) {
        return res.status(400).send('Invalid GET Request');
      } else {
        models.users.get().then(users => {
        var response = {results: users};
        return res.status(200).send(response);
      });
    }
    },
    post: function (req, res) {
      if (!req.body) {
        return res.status(400).send('Invalid POST Request');
      } else {
        var result = models.users.post(req.body.username);
        result.then(val=>{
          return res.status(201).send('User Added');
        }).catch(err=>{
          console.log(err);
          return res.status(500).send('Unable to Add User');
        });
      }
    }
  }
};

