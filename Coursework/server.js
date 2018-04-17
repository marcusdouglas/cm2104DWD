// sever.js
// load the things we need

/*const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/saved_cards";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var db;

MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  db = database;
  app.listen(8080);
});*/

const MongoClient = require('mongodb').MongoClient; //npm install mongodb@2.2.32
const url = "mongodb://localhost:27017/user_data";
const express = require('express'); //npm install express
const session = require('express-session'); //npm install express-session
const bodyParser = require('body-parser'); //npm install body-parser
const app = express();

//this tells express we are using sesssions. These are variables that only belong to one user of the site at a time.
app.use(session({ secret: 'example' }));

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));
// set the view engine to ejs
app.set('view engine', 'ejs');

var db;


//this is our connection to the mongo db, ts sets the variable db as our database
MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  db = database;
  app.listen(8080);
  console.log('listening on 8080');
});

// This works
/*var express = require("express");
var app = express();

//set the view engine to EJS
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));*/

// index page
app.get("/", function(req, res) {
  //res.render("pages/index",{pageName:index});
  res.render("pages/index");
});

// myrestaurants page
app.get("/myrestaurants", function(req, res) {
  //res.render("pages/myrestaurants", {pageName:myrestaurants});

  db.collection('card').find().toArray(function(err, result) {
    if (err) throw err;

    var restaurants = [];

    for (var i = 0; i < result.length; i++) {
      var name = result[i].name;
      var imageUrl = result[i].image;
      var text = result[i].text;

      var restaurant = {name: name, imageUrl: imageUrl, text: text};
      restaurants[i] = restaurant;
    }
    res.render("pages/myrestaurants", {
      restaurants: restaurants
    });
  });
});

app.post('/card', function (req, res) {
  db.collection('card').save(req.body, function(err, result) {
    if (err) throw err;
    console.log(req.body);
  });
});

app.post("/delete", function(req, res) {
  //console.log(req.body);

  var name = req.body.name;
  db.collection("card").deleteOne(req.body, function(err, result) {
    if (err) throw error;
  });
});

app.post('/login', function(req, res) {
  console.log(JSON.stringify(req.body));
  var uname = req.body.uname;
  var pword = req.body.psw;

  db.collection('users').findOne({"username":uname}, function(err, result) {
    if (err) throw err;//if there is an error, throw the error
    //if there is no result, redirect the user back to the login system as that username must not exist
    if(!result){res.redirect('/');return}
    //if there is a result then check the password, if the password is correct set session loggedin to true and send the user to the index
    if(result.password == pword){ req.session.loggedin = true; res.redirect('/') }
    //otherwise send them back to login
    else{res.redirect('/')}
    console.log("logged in as " + uname);
  });
});

app.post('/adduser', function(req, res) {
  console.log(req.body);
  //once created we just run the data string against the database and all our new data will be saved/
  db.collection('users').save(req.body, function(err, result) {
    if (err) throw err;
    console.log('saved to database');
    //when complete redirect to the index
    console.log(req.body);
    res.redirect('/');
  });
});

app.get('/logout', function(req, res) {
  req.session.loggedin = false;
  req.session.destroy();
  console.log("logged out");
  res.redirect('/');
});

// This works
//app.listen(8080);
console.log("8080 is the magic port");
