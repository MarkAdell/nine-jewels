var mongoose = require('mongoose');
var User = require('./model');

function constructLeaderBoard(req, res) {
  User.find({})
    .where('solvedJewels').gt(0)
    .sort({ solvedJewels: -1 })
    .exec(function(err, users) {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true, users: users });
      }
    });
}

 function getUserName(req, res) {
   var userId = req.params.id;
   var query = {_id: userId};
   User.findOne(query) 
    .select('userName')
    .exec(function(err, userName) {
      if(err) {
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true, userName: userName });
      }
    });
 }

// first time to join, has no userId
function addUser(req, res) {
  var userName = req.body.userName? req.body.userName : "";
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
  var userName = req.body.userName? req.body.userName : "";
  // update the username to the given id
  var query = { _id: userId };
  var update = { userName: userName };
  User.findOneAndUpdate(query, update)
    .exec(function(err, user) {
      if (err) {
        res.json({ success: false, message: err });
      } else if(!user) {
        res.json({ success: false, found: false});
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
  updateUserScore: updateUserScore,
  getUserName: getUserName
}
