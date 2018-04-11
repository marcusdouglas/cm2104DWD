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

// use res.render to load up an ejs.view file

// index page
//app.get("/", function (req, res) {
  //res.render("pages/index");
//});

// index page
app.get("/", function(req, res) {
  //res.render("pages/index",{pageName:index});
  res.render("pages/index");
});

// about page
app.get("/myrestaurants", function(req, res) {
  //res.render("pages/myrestaurants", {pageName:myrestaurants});
  res.render("pages/myrestaurants");
});

// This works
//app.listen(8080);
console.log("8080 is the magic port");
