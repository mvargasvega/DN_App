var db = require('./models');


var users = [
  {
    firstName: "Marcus",
    lastName: "Cisneros",
    username: "test",
    password: "test",
    email: "test@gmail.com",
    gender: "Male", //male, female, non-binary
    orientation: false, //true or false
    role: "Member"
  },
  {
    firstName: "Martin",
    lastName: "Vargas",
    username: "test2",
    password: "123dsfa",
    email: "alsdkfj@galkgj.com",
    gender: "Male", //male, female, non-binary
    orientation: true, //true or false
    role: "Admin"
  },

];


db.User.remove({}, function (err, removed){
  if (err){
    throw err;
  }
  console.log('removed all users');
  users.forEach(function(user){
    db.User.register(new db.User({firstName:user.firstname,lastName:user.lastName,username:user.username}),user.password, function (err, all_users){
      if (err){
        console.log("inside create");
        return console.log("Error:", err);
      }
      else{
        console.log('users  '+ all_users );
        console.log('recreated all users');
      }
    });
  })

});
