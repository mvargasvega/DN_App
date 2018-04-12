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



app.get('/test', function (req, res) {
  console.log("I am ejs test");
  res.render('test');
});

app.post('/signup', function (req, res) {
  console.log("I was hit to sign up");
  User.register(new User({ email: req.body.email }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.send('signed up!!!');
      });
    }
  );
});

// Home Route
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});



app.get('/login', function (req, res) {
  console.log("hello I am login");
  res.sendFile('views/login.html' , { root : __dirname});
});

app.get('/main', function (req, res) {
  console.log("hello I am main");
  res.sendFile('views/main.html' , { root : __dirname});
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

//get all User
app.get('/api/users', function (req , res){
  console.log("I work")
  User.find()
  .exec(function(err, allUsers){
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
    email: req.body.email,
    password: req.body.password ,
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




// Server Started
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
