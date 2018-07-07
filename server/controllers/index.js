var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      if (!req.body) {
        return res.status(400).send('Invalid GET Request');
      } else {
        console.log("I am in the controller", req.body);
        return res.status(200).send('you jade it');
      }
      models.messages.get().then(messages => {
      console.log(messages);
    });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      if (!req.body) {
        return res.status(400).send('Invalid POST Request');
      } else {
        console.log(req.body);
        console.log(req.body.message,req.body.username,req.body.roomname)
        var result = models.messages.post(req.body.message,req.body.username,req.body.roomname);
        result.then(val=>{
          return res.status(201).send('Message Added');
        }).catch(err=>{
          console.log(err)
          return res.status(500).send('Unable to Add Message');
        });
      }
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

