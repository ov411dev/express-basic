var mongoose = require("mongoose");
var mongoosastic = require('mongoosastic');

var userSchema = mongoose.Schema({
  name: "string",
  email: "string",
  password: "string"
});

userSchema.plugin(mongoosastic, {index: 'users', type: 'user'});

module.exports = mongoose.model('User', userSchema);