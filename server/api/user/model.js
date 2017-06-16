var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  userName: {
    type: String,
    unique: false
  },
  solvedJewels: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('user', userSchema);
