var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  methodOverride = require("method-override"),
  expressLayouts = require('express-ejs-layouts'),

  //  NEW ADDITIONS
 cookieParser = require('cookie-parser'),
 session = require('express-session'),
 passport = require('passport'),
 LocalStrategy = require('passport-local').Strategy;


var db = require("./models");
    // User = db.User;


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



//Configure app
// serve static files from public folder
app.use(express.static('public'));          // Static directory

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true })); // req.body
app.use(expressLayouts);


//Load View Engine
app.set('views', __dirname + '/views');
//set view engine to ejs
app.set('view engine', 'ejs');

app.use(methodOverride("_method"));





// Home Route
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

app.get('/signup', function (req, res) {
  console.log("hello I am sign up");
  res.sendFile('views/signup.html' , { root : __dirname});
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






// Server Started
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
