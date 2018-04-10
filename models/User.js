var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new Schema({
  FirstName: String,
  LastName: String,
  Email: String,
  Password: String,
  Gender: String, //male, female, non-binary
  Orientation: String, //true or false
  Role: String; //admin, student, donor
});


UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);


module.exports = User;
