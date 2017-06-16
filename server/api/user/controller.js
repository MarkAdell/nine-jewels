var mongoose = require('mongoose');
var User = require('./model');

function constructLeaderBoard(req, res) {
  User.find({})
    .sort({ solvedJewels: -1 })
    .exec(function(err, users) {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true, users: users });
      }
    });
}

// first time to join, has no userId
function addUser(req, res) {
  var userName = req.body.userName ? req.body.userName : "";
  // create the user and send the user id to be saved in local storage
  var user = new User({
    userName: userName
  });
  user.save(function(err, user) {
    if (err) {
      res.json({ success: false, message: err });
    } else {
      res.json({ success: true, message: 'user added', userId: user._id });
    }
  });
}

// not first time to join, has userId and entered a username
function updateUserName(req, res) {
  var userId = req.body.userId;
  // update the username to the given id
  var query = { _id: userId };
  var update = { userName: userName };
  User.findOneAndUpdate(query, update)
    .exec(function(err, user) {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true, user: user });
      }
    });
}

function updateUserScore(req, res) {
  var userId = req.body.userId;
  var query = { _id: userId };
  var update = { $inc: { solvedJewels: 1 } };
  User.findOneAndUpdate(query, update)
    .exec(function(err, user) {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true, user: user });
      }
    });
}

module.exports = {
  constructLeaderBoard: constructLeaderBoard,
  addUser: addUser,
  updateUserName: updateUserName,
  updateUserScore: updateUserScore
}
