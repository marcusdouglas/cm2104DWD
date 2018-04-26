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

// database variable
var db;

//this is our connection to the mongo db, ts sets the variable db as our database
MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  db = database;
  app.listen(8080);
  console.log('listening on 8080');
});

// Renders the index (Home) page
app.get("/", function(req, res) {

  // If not logged in set current user as no user
  if (!req.session.loggedin) {

    var result = {username: "No User"}

    res.render('pages/index', {
      user: result,
      page: "index",
      logged: "Login or Signup"
    });
    return;
  } else {

    var uname = req.query.username;
    console.log(uname);

    db.collection('users').findOne({"username":uname}, function(err, result) {
     if (err) throw err;
     res.render('pages/index', {
       user: result,
       page: "index",
       logged: "Logout"
     });
   });
  }
});

// Redners the myrestaurants page
app.get("/myrestaurants", function(req, res) {

  // If not logged in redirect the user to the home page
  if (!req.session.loggedin) {
    res.redirect("/");
    return;
  } else {

    var uname = req.query.username;

     db.collection('users').findOne({"username":uname}, function(err, result) {
      if (err) throw err;

      var saved_cards = result.saved_cards;
      var restaurants = [];

      // Creating an array of all the users saved cards
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

        // Stores each card as an object within the restaurants array
        var restaurant = {name: name, imageUrl: imageUrl, rating: rating,
          cuisines: cuisines, averageCost: averageCost,
          placeText: placeText, userRating: userRating, address: address,
          siteUrl: siteUrl};

        // Restaurants array
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

  // If not logged in redirect the user to the home page
  if (!req.session.loggedin) {

    var result = {username: "No User"}

    res.render('pages/index', {
      user: result,
      page: "index",
      logged: "Login or Signup"
    });
    return;
  } else {

    var uname = req.body.card.username;

    db.collection('users').findOne({"username":uname}, function(err, result) {
     if (err) throw err;

     // Saving the results into variables to be stored in a newCard object
     var name = req.body.card.name;
     var image = req.body.card.image;
     var rating = req.body.card.rating;
     var cuisines = req.body.card.cuisines;
     var averageCost = req.body.card.averageCost;
     var userRating = req.body.card.userRating;
     var address = req.body.card.address;
     var siteUrl = req.body.card.siteUrl;

     // New card object to be saved to the users saved cards
     var newCard = {name: name, image: image, rating: rating, cuisines: cuisines,
      averageCost: averageCost, userRating: userRating, address: address,
      siteUrl: siteUrl};

     // Pushing the new value to an array with the users current saved cards
     var saved_cards = result.saved_cards;
     saved_cards.push(newCard);

     // Querying the users username and setting the new set of values to be added
     var query = {username: uname};
     var newValues = {$set: {saved_cards: saved_cards}};

     // Updating the users saved cards
     db.collection('users').updateOne(query, newValues, function(err, result) {
       if (err) throw err;

       //console.log(result);
     });
   });
  }
});

// Deletes a card
app.post("/delete", function(req, res) {

  // If not logged in redirect the user to the home page
  if (!req.session.loggedin) {
    res.redirect("/");
    return;
  } else {

    // Variables for the user needed to be found and the name of the restaurant
    // to be deleted from their saved cards
    var uname = req.body.uname;
    var cardName = req.body.name;

     // Find the user
     db.collection('users').findOne({"username":uname}, function(err, result) {
      if (err) throw err;

      // Variable to hold users current saved cards
      var saved_cards = result.saved_cards;

      // Loop through the users saved cards to find the one to delete
      for (var i = 0; i < saved_cards.length; i++) {
        if (cardName == saved_cards[i].name) {
          saved_cards.splice(i, 1);
          break;
        }
      }

      // Querying the users username and setting the new set of values for saved cards
      var query = {username: uname};
      var newValues = {$set: {saved_cards: saved_cards}};

      // Updating the users saved cards
      db.collection('users').updateOne(query, newValues, function(err, result) {
        if (err) throw err;
        console.log(result);
      });
    });
  }
});

// Logs the user in
app.post('/login', function(req, res) {

  //console.log(JSON.stringify(req.body));

  // Variables of the username and password entered in the form
  var uname = req.body.uname;
  var pword = req.body.psw;

  // Try to find the username provided
  db.collection('users').findOne({"username":uname}, function(err, result) {
    if (err) throw err;

    // If there is no result, redirect the user back to the login system as that username must not exist
    if(!result){
      res.redirect('/');
      return;
    }
    // If there is a result then check the password
    // If it matches send the user to the index page
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
    }
    // Otherwise send them back to the home page without logging them in
    else {
      res.redirect('/');
    }
  });
});

// Creates a new user
app.post('/adduser', function(req, res) {

  //console.log(JSON.stringify(req.body));

  // The username provided in the form
  var uname = req.body.uname;

  // Some descriptive text for place holding and to help the user know how to
  // use the page
  var pageDescription = "On this page you can find all the restaurants that"
    + " you have saved and all their details. To remove a restaurant from this"
    + " page, click the cross at the top right of the restaurants card. You may"
    + " feel free to delete this information card!";

  // Creates the users saved cards array. Adds a placeholder card
  var placeCard = {name: "Welcome to the My Restaurants page!", image: "images/foodImage12.jpeg", placeText: pageDescription};
  var password = req.body.psw;
  var saved_cards = [placeCard];

  // Creates a new user object
  var newUser = {username: uname, password: password, saved_cards: saved_cards};

  // Saves the new user to the database
  db.collection('users').save(newUser, function(err, result) {
    if (err) throw err;
    //console.log('saved to database');

    // This performs a first time login
    db.collection('users').findOne({"username":uname}, function(err, result) {
     if (err) throw err;
      //console.log(result);
      res.render('pages/index', {
        user: result,
        page: "index",
        logged: "Logout"
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

console.log("8080 is the magic port");
