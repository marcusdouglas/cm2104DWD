// sever.js
// load the things we need

const MongoClient = require("mongodb").MongoClient;
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

app.post("/delete", function(req, res) {
  console.log(req.body);
  //db.collection("card").deleteOne(req.body, function(err, result) {
    //if (err) throw error;
    //res.redirect("/");
  });
});

// This works
//app.listen(8080);
console.log("8080 is the magic port");
