var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    /*  passportLocalMongoose takes care of hashing and salting the user's plain-text password when they sign up. */
    passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String,
  gender: String, //male, female, non-binary
  orientation: String, //true or false
  role: String //admin, student, donor
});


UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);


module.exports = User;
