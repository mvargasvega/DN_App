var db = require('./models');


var users = [
  {
    firstName: "Marcus",
    lastName: "Cisneros",
    username: "test",
    email: "test@gmail.com",
    password: "test",
    gender: "Male", //male, female, non-binary
    orientation: "false", //true or false
    role: "Member"
  },
  {
    firstName: "Martin",
    lastName: "Vargas",
    username: "test2",
    email: "alsdkfj@galkgj.com",
    password: "123dsfa",
    gender: "Male", //male, female, non-binary
    orientation: "true", //true or false
    role: "Admin"
  },

];


db.User.remove({}, function (err, removed){
  if (err){
    throw err;
  }
  console.log('removed all users');
  db.User.create(users, function (err, all_users){
    if (err){
      console.log("inside create");
      return console.log("Error:", err);
    }
    else{
      console.log('users  '+ all_users );
      console.log('recreated all users');
    }
  });
});
