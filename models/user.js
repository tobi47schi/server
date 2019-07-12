const mongoose = require('mongoose');

//User Schema für Login
var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      bcrypt : true,
    },
    registerDate : {
      type : Date,
      default : Date.now
    }
    /*
    passwordConf: {
      type: String,
      required: true,
      bcrypt : true,
    }
    */
}, {collection : 'users'});
UserSchema.plugin(require('mongoose-bcrypt')); // zum verschlüsseln
var User = mongoose.model('User', UserSchema);

module.exports = User;