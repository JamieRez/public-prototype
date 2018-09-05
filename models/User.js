const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username : String,
  name : String,
  password : String,
  email : String,
  interests : [String],
  people : [String],
  coord : {
    x : Number,
    y : Number
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
