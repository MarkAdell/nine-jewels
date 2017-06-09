var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var wordSchema = new Schema({
  word: String,
  shuffledWord: String
});

module.exports = mongoose.model('word', wordSchema);