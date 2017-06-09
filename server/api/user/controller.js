var mongoose = require('mongoose');
var User     = require('./model');

function getAllUsers(req, res) {
  User.find({})
    .sort({solvedJewels: -1})
    .exec(function(err, users) {
      if(err) {
        res.json({success: false, message: err});
      } else {
        res.json({success: true, users: users});
      }
    });
}

function addUser(req, res) {
  var userName = req.body.userName;
  var user = new User({
    userName: userName
  })
  user.save(function(err, user) {
    if(err) {
      if(err.code == 11000) {
        res.json({success: false, message: 'username is taken'});
      } else {
        res.json({success: false, message: err});
      }
    } else {
      res.json({success: true, message: 'user added'});
    }
  })
}

function updateUserScore(req, res) {
  var userName = req.body.userName;
  User.findOneAndUpdate(
    {userName: userName},
    {$inc: {solvedJewels: 1}}
  )
  .exec(function(err, user) {
    if(err) {
      res.json({success: false, message: err});
    } else {
      res.json({success: true, user: user});
    }
  });
}

module.exports = {
  getAllUsers: getAllUsers,
  addUser: addUser,
  updateUserScore: updateUserScore
}