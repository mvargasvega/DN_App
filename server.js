var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');


var db = require("./models");
    // User = db.User;

var app = express();


//Configure app
app.use(express.static('public'));          // Static directory
app.use(bodyParser.urlencoded({ extended: true })); // req.body
app.use(expressLayouts);


//Load View Engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

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



// Set CORS Headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Homepage -- Display a list of current todos and a form
app.get('/', function(req, res) {
    res.sendFile( __dirname + '/views/index.html')
});




// Server Started
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
