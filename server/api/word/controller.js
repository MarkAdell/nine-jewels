var Words = require('./model');

function getAllWords(req, res) {
  Words.find({}, function(err, words) {
    if(err) {
      res.json({success: false, message: err});
    } else {
      res.json({success: true, words: words});
    }
  });
}

module.exports = {
  getAllWords: getAllWords
}