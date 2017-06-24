var Words = require('./model');

function getWord(req, res) {
  Words.find({}, function(err, words) {
    if(err) {
      res.json({success: false, message: err});
    } else {
      var randomWord = getRandonWord(words);
      res.json({success: true, word: randomWord});
    }
  });
}

function checkSolution(req, res) {
  var wordId = req.query.id;
  var userAnswer = req.query.answer;
  var query = {_id: wordId};
  Words.findOne(query, function(err, word) {
    if(err) {
      res.json({success: false, message: err});
    } else {
      var word = word.toObject();
      if(userAnswer.toLowerCase() === word.unshuffledWord.toLowerCase()) {
        res.json({success: true, correct: true});
      } else {
        res.json({success: true, correct: false});
      }
    }
  });
}

function getHint(req, res) {
  var wordId = req.query.id;
  var query = {_id: wordId};
  Words.findOne(query, function(err, word) {
    if(err) {
      res.json({success: false, message: err});
    } else {
      var word = word.toObject();
      var hint = word.unshuffledWord.slice(0, 2);
      res.json({success: true, hint: hint});
    }
  });
}

function getRandonWord(words) {
  var length = words.length;
  var randomIndex = Math.floor(Math.random() * length);
  var randomWord = words[randomIndex];
  var returnedWord = {
    id: randomWord._id,
    shuffledWord: randomWord.shuffledWord
  }
  return returnedWord;
}


module.exports = {
  getWord: getWord,
  checkSolution: checkSolution,
  getHint: getHint
}