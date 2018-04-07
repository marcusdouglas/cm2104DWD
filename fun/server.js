const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/swainson_review";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var db;

MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  db = database;
  app.listen(8080);
});

app.get('/all', function(req, res) {
  db.collection('review').find().toArray(function(err, result) {
    if (err) throw err;
    var output = "<h1>All the Reviews</h1>";
    for (var i = 0; i < result.length; i++) {
      output += "<div>"
      output += "<h3>" + result[i].name + "</h3>"
      output += "<p>" + result[i].review + "</p>"
      output += "</div>"
    }
    res.send(output);
  });
});

app.post('/review', function (req, res) {
  db.collection('review').save(req.body, function(err, result) {
    if (err) throw err;
    console.log('saved to database')
    res.redirect('/')
  });
});
