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

  if (!req.session.loggedin) {

    var result = {username: "No User"}

    res.render('pages/index', {
      user: result,
      page: "index",
      logged: "Login or Signup",
      logAttempt: "accept"
    });
    return;
  } else {

    //var uname = "marcus";
    var uname = req.query.username;
    console.log(uname);

    db.collection('users').findOne({"username":uname}, function(err, result) {
     if (err) throw err;
     res.render('pages/index', {
       user: result,
       page: "index",
       logged: "Logout",
       logAttempt: "accept"
     });
   });
  }
  //res.render("pages/index");
});

// myrestaurants page
app.get("/myrestaurants", function(req, res) {
  //res.render("pages/myrestaurants", {pageName:myrestaurants});

  if (!req.session.loggedin) {
    res.redirect("/");
    return;
  } else {
    var uname = req.query.username;

     db.collection('users').findOne({"username":uname}, function(err, result) {
      if (err) throw err;

      var saved_cards = result.saved_cards;
      var restaurants = [];

      for (var i = 0; i < saved_cards.length; i++) {
        var name = saved_cards[i].name;
        var imageUrl = saved_cards[i].image;
        var placeText = saved_cards[i].placeText;
        var rating = saved_cards[i].rating;
        var cuisines = saved_cards[i].cuisines;
        var averageCost = saved_cards[i].averageCost;
        var userRating = saved_cards[i].userRating;
        var address = saved_cards[i].address;
        var siteUrl = saved_cards[i].siteUrl;

        var restaurant = {name: name, imageUrl: imageUrl, rating: rating,
          cuisines: cuisines, averageCost: averageCost,
          placeText: placeText, userRating: userRating, address: address,
          siteUrl: siteUrl};

        restaurants[i] = restaurant;
      }
      res.render("pages/myrestaurants", {
        user: result,
        restaurants: restaurants,
        page: "myrestaurants",
        logged: "Logout"
      });
    });
  }
});


// Saves a card
app.post('/card', function (req, res) {

  if (!req.session.loggedin) {

    var result = {username: "No User"}

    res.render('pages/index', {
      user: result,
      page: "index",
      logged: "Login or Signup",
      logAttempt: "accept"
    });
    return;
  } else {

    //var uname = "marcus";
    var uname = req.body.card.username;
    //console.log(req.body);
    //console.log(uname);

    db.collection('users').findOne({"username":uname}, function(err, result) {
     if (err) throw err;

     var name = req.body.card.name;
     var image = req.body.card.image;
     var rating = req.body.card.rating;
     var cuisines = req.body.card.cuisines;
     var averageCost = req.body.card.averageCost;
     var userRating = req.body.card.userRating;
     var address = req.body.card.address;
     var siteUrl = req.body.card.siteUrl;
     var newCard = {name: name, image: image, rating: rating, cuisines: cuisines,
      averageCost: averageCost, userRating: userRating, address: address,
      siteUrl: siteUrl};

     var saved_cards = result.saved_cards;
    // console.log(saved_cards);
     saved_cards.push(newCard);
     //console.log(saved_cards);
     //console.log(req.body);
     //console.log(result);
     //console.log(uname);
     var query = {username: uname};
     var newValues = {$set: {saved_cards: saved_cards}};
     console.log(query);
     console.log(newValues);
     db.collection('users').updateOne(query, newValues, function(err, result) {
       if (err) throw err;
       console.log(result);
     });
   });
  }
  //res.render("pages/index");
  /*
  db.collection('card').save(req.body, function(err, result) {
    if (err) throw err;
    console.log(req.body);
  });*/
});

// Deletes a card
app.post("/delete", function(req, res) {
  //console.log(req.body);

  if (!req.session.loggedin) {
    res.redirect("/");
    return;
  } else {

    var uname = req.body.uname;
    var cardName = req.body.name;

     db.collection('users').findOne({"username":uname}, function(err, result) {
      if (err) throw err;

      var saved_cards = result.saved_cards;

      for (var i = 0; i < saved_cards.length; i++) {
        if (cardName == saved_cards[i].name) {
          saved_cards.splice(i, 1);
          break;
        }
      }

      var query = {username: uname};
      var newValues = {$set: {saved_cards: saved_cards}};
      console.log(query);
      console.log(newValues);
      db.collection('users').updateOne(query, newValues, function(err, result) {
        if (err) throw err;
        console.log(result);
      });
    });
  }
/*
  var name = req.body.name;
  db.collection("card").deleteOne(req.body, function(err, result) {
    if (err) throw error;
  });*/
});

// Logs the user in
app.post('/login', function(req, res) {
  console.log(JSON.stringify(req.body));
  var uname = req.body.uname;
  var pword = req.body.psw;

  db.collection('users').findOne({"username":uname}, function(err, result) {
    if (err) throw err;//if there is an error, throw the error
    //if there is no result, redirect the user back to the login system as that username must not exist
    if(!result){
      var result = {username: "No User"}
      
      res.render('pages/index', {
        user: result,
        page: "index",
        logged: "Logout",
        logAttempt: "denied"
      });
      return;
    }
    //if there is a result then check the password, if the password is correct set session loggedin to true and send the user to the index
    if (result.password == pword){

      db.collection('users').findOne({"username":uname}, function(err, result) {
       if (err) throw err;
       res.render('pages/index', {
         user: result,
         page: "index",
         logged: "Logout"
       });
     });
     req.session.loggedin = true;
     console.log("logged in as " + uname);
      /*
      req.session.loggedin = true;
      res.redirect('/');
      console.log("logged in as " + uname);*/
    }
    //otherwise send them back to login
    else{
      res.redirect('/');
    }
  });
});

// Creates a new user
app.post('/adduser', function(req, res) {
  console.log(JSON.stringify(req.body));
  var uname = req.body.uname;

  // Some descriptive text loaded in the rating part of EJS for place holding
  var pageDescription = "On this page you can find all the restaurants that"
    + " you have saved and all their details. To remove a restaurant from this"
    + " page, click the cross at the top right of the restaurants card. You may"
    + " feel free to delete this information card!";

  var placeCard = {name: "Welcome to the My Restaurants page!", image: "images/logo.png", placeText: pageDescription};
  var password = req.body.psw;
  var saved_cards = [placeCard];

  var newUser = {username: uname, password: password, saved_cards: saved_cards};

  db.collection('users').save(newUser, function(err, result) {
    if (err) throw err;
    //console.log(result);
    console.log('saved to database');

    db.collection('users').findOne({"username":uname}, function(err, result) {
     if (err) throw err;
      //console.log(result);
      res.render('pages/index', {
        user: result,
        page: "index",
        logged: "Logout",
        logAttempt: "accept"
      });
    });
    req.session.loggedin = true;
    console.log("logged in as " + uname);

  });
});

// Logs the user out
app.get('/logout', function(req, res) {
  req.session.loggedin = false;
  req.session.destroy();
  console.log("logged out");
  res.redirect('/');
});

// This works
//app.listen(8080);
console.log("8080 is the magic port");
