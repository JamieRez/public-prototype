const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
  username : String,
  name : String,
  password : String,
  email : String,
  age : Number,
  interests : [String],
  people : [String],
  coord : {
    x : Number,
    y : Number
  }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
