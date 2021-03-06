var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require("method-override"),
    expressLayouts = require('express-ejs-layouts'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var db = require("./models");
    User = db.User;

//Configure app
// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true })); // req.body

// serve static files from public folder
app.use(express.static('public'));          // Static directory


//Load View Engine
app.set('views', __dirname + '/views');
//set view engine to ejs
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));


// middleware for auth
app.use(cookieParser());
app.use(session({
    secret: 'supersecretkey', // change this!
    resave: false,
    saveUninitialized: false
  }));

app.use(passport.initialize());
app.use(passport.session());

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//Auth Routes

//show signup view
app.get('/signup', function (req, res) {
  console.log("I am ejs signup");
  res.render('signup');
});

// show login view
app.get('/login', function (req, res) {
 res.render('login');
});


//redirect to user page once authenticated
app.post('/login', passport.authenticate('local'), function (req, res) {
  console.log(req.user);
  if(req.user)
  res.render('main',{user:req.user})
    else {
      res.redirect('/login')
    } // sanity check
});

//signing up new user to DB
app.post('/signup', function (req, res) {
  console.log("I was hit to sign up");
  User.register(new User({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    username: req.body.username,
    email:req.body.email,
    gender:req.body.gender
  }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.send('signed up!!!');
      });
    }
  );
});

//log out user
app.get('/logout', function (req, res) {
  console.log("BEFORE logout", JSON.stringify(req.user));
  req.logout();
  console.log("AFTER logout", JSON.stringify(req.user));
  res.redirect('/');
});


// Home Route
app.get('/', function (req, res) {
  res.render('index',{user: req.user});
});

//Main landing page for user
app.get('/main', function (req, res) {
  console.log("hello I am main");
  res.render('main', {user: req.user});
});


app.get('/confirmation', function (req, res) {
  console.log("hello I am main");
  res.sendFile('views/confirmation.html' , { root : __dirname});
});
app.get('/orientation', function (req, res) {
  console.log("hello I am main");
  res.sendFile('views/orientation.html' , { root : __dirname});
});



// Set CORS Headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/***********************  *****************/
//get all User
app.get('/api/users', function (req , res){
  console.log("I work")
  User.find().exec(
    function(err, allUsers){
      if(err) {return console.log("Index error:" + err); }
      res.json(allUsers);
  });
});

//get one User
app.get('/api/users/:id', function  (req , res){
  console.log("one student");
  User.findOne({_id: req.params.id}, function(err,data){
    res.json(data);
  });
});

//create a user
app.post('/api/users', function (req, res) {
  User.create({
    firstName: req.body.firstName ,
    lastName: req.body.lastName ,
    username: req.body.username ,
    password: req.body.password ,
    email: req.body.email,
    gender: req.body.gender ,
    orientation: req.body.orientation ,
    role: req.body.role ,
  }, function (err, user){
    if (err){
      res.status(500);
    }
    res.status(200).json(user);
  });
});

//update a user

app.put('/api/users/:id', function(req, res) {
  console.log('I am in updateing user');

  var userId = req.params.id;

  User.findOne({_id: userId}, function (err, currentUser){
    if(err){
      res.status(500).json("user doesnt exist");
    }
    console.log(currentUser);
    currentUser.firstName = req.body.firstName || currentUser.firstName;
    currentUser.lastName = req.body.lastName || currentUser.lastName;
    currentUser.username = req.body.username || currentUser.username;
    currentUser.password = req.body.password || currentUser.passport;
    currentUser.email = req.body.email || currentUser.email;
    currentUser.gender = req.body.gender || currentUser.gender;
    currentUser.save(function( err , updated ){
      if(err) {
        res.status(500).json("user can't be updated");
        throw err;
      }
      console.log(updated);
      res.status(200).json(updated);
    });
  });
});


// Server Started
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
