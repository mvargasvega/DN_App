var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/DN_App");
console.log(mongoose.connection.readyState);

module.exports.User = require("./user");
