$(function() {

  //---------------------Gets API Data---------------------

  $("#searchForm").submit(function(e) {

    // Displays the page loader
    $("#cardLoader").addClass("loader");

    // Stops the page jumping to the top on click
    e.preventDefault();

    // Gets the API data based on user input
    getLocation();
  });

//---------------------Creates a new card---------------------
  $("#MainContent").on("click", ".button", function() {

    // If the end of the array is reached search again for more results
    if (index === restaurantsArray.length - 1) {
      $("#cardLoader").addClass("loader");
      getLocation();
    }
    else { // Otherwise continue looking through the current array of cards
      createCard();
      index++;
    }
  });
});

// Function for passing saved card details to the server
function saveCard() {

  // Storing the cards details in variables
  var uname = $("#username").text();
  var name = $("#rName").text();
  var image = $("#rImage").attr("src");
  var rating = $("#rating").text();
  var cuisines = $("#cuisines").text();
  var averageCost = gloablAverageCost;
  var userRating = globalUserRating;
  var address = globalAddress;
  var siteUrl = globalSiteUrl;

  // Storing the cards details in a card object
  var card = {username: uname, name: name, image: image, rating: rating,
    cuisines: cuisines, averageCost: averageCost, userRating: userRating,
    address: address, siteUrl: siteUrl};

  $.ajax({
       method: "POST",
       url: "/card",
       data: {card: card},
       success: function(result) {
         //console.log(result);
       }
    });
}

// Array to store cards the user is browsing through
var restaurantsArray = [];

// References arrays index
var index = 0;

// Some global variables for saving card details
var globalAverageCost = 0;
var globalUserRating = 0;
var globalAddress = "";
var globalSiteUrl = "";

// Creates a card on the page
function createCard() {

  // Finished loading so remove loader
  $("#cardLoader").removeClass("loader");

  // Remove current card with fade out and create new one
  $("#activeCard").fadeOut(500, function() {

    // Creating variables for the values needed to format the card
    var name = restaurantsArray[index].name;
    var thumbnail = restaurantsArray[index].thumbnail;
    var userRating = restaurantsArray[index].userRating;
    var voteCount = restaurantsArray[index].voteCount;
    var foodType = restaurantsArray[index].foodType;
    var averageCost = restaurantsArray[index].averageCost;
    var latitude = restaurantsArray[index].latitude;
    var longitude = restaurantsArray[index].longitude;
    var address = restaurantsArray[index].address;
    var siteUrl = restaurantsArray[index].siteUrl;

    // Setting the value of global variables
    gloablAverageCost = averageCost;
    globalUserRating = userRating;
    globalAddress = address;
    globalSiteUrl = siteUrl;

    // Remove the current card
    $("#activeCard").remove();

    // Format the new card
    formatCard(name, thumbnail, userRating, voteCount, foodType, averageCost,
      latitude, longitude, address, siteUrl);

    // Calls the function to create the google map
    createMap(latitude, longitude);

    // Add the card class to the new card
    $("#activeCard").addClass("card");
  });

  return false;
}

// Formats the new card
function formatCard (name, thumbnail, userRating, voteCount, foodType,
  averageCost, latitude, longitude, address, siteUrl) {

  var restaurantName = "<div id = 'activeCard'><h2 id = 'rName' class = 'paraTitle'>" + name + "</h2>";
  var restaurantFood = "<p class = 'cardText'><b>Cuisine/s:</b> <span id = 'cuisines'>" + foodType + "</span></p>";

  $("#MainContent").append(restaurantName
  + "<div class = 'imageContainer'><img id = 'rImage' class = 'cardImage' src = " + "'" + thumbnail + "'" + ">"
  + "<img class = 'cardImage' src = 'images/foodImage4.jpeg'><img class = 'cardImage' src = 'images/foodImage5.jpeg'>"
  + "<button id = 'leftButton' class = 'btn' onclick = 'plusDivs(-1)'>&#10094;</button>"
  + "<button id = 'rightButton' class = 'btn' onclick = 'plusDivs(1)'>&#10095;</button></div>"
  + getRating(userRating, voteCount)
  + restaurantFood
  + getAverageCost(averageCost)
  + "<input id = 'seeMore' class = 'collapseInfo' type = 'checkbox'>"
  + "<label class = 'collapseLabel' for = 'seeMore'>See more...</label><div class = 'expand'>"
  + "<h3>Location</h3>"
  + "<div id = 'map'></div>" + "<p><b>Address:</b> " + address + "</p>"
  + "<p><b>Further Information: </b>For more information click <a target = '_blank' href = '" + siteUrl + "'>here</a></p>"
  + "</div><form id = 'scrollForm'><button id = 'dislikeButton' class = 'button' type = 'button'>"
  + "<button id = 'likeButton' class = 'button' type = 'button' onclick = 'saveCard()'></button>"
  + "</button></form></div>");

  // Makes sure only the first card image is displayed
  showDivs(slideIndex);
  $("#activeCard").hide().fadeIn("500");
}


//------------------ Start of API getting code -------------------

// This function gets the appropriate ID's to get results from the performSearch function
function getLocation() {

  var loc = $("#location").val();

  var locationUrl = "https://developers.zomato.com/api/v2.1/locations?query=" + loc;

  $.ajax ({
    url: locationUrl,
    type: "GET",
    headers: {"user-key": "3c672f5af7519d65f72ed90953badca5"},
    dataType: "json",
    success: function(result) {
      // deal with data here
      console.log(result);
      var res = JSON.parse(JSON.stringify(result));

      //console.log(res.location_suggestions[0].entity_id);
      var entityId = res.location_suggestions[0].entity_id;

      //console.log(res.location_suggestions[0].entity_type);
      var entityType = res.location_suggestions[0].entity_type;

      var lat = res.location_suggestions[0].latitude;
      var lon = res.location_suggestions[0].longitude;

      // Now we have the location so find restaurants in that area and get a start point
      getStartPoint(entityId, entityType, lat, lon);
    }
  });
}

// This must be called before the performSearch method in order to be able to
// calculate an appropriate start point for searching through the array
function getStartPoint(entityId, entityType, lat, lon) {

  var searchUrl = "https://developers.zomato.com/api/v2.1/search?entity_id="
    + entityId + "&entity_type=" + entityType
    + "&lat=" + lat + "&lon=" + lon;

  $.ajax ({
    url: searchUrl,
    type: "GET",
    headers: {"user-key": "3c672f5af7519d65f72ed90953badca5"},
    dataType: "json",
    success: function(result) {
      // deal with data here
      console.log(result);
      var res = JSON.parse(JSON.stringify(result));

      // Getting how many results are found for the users specified input
      var resultsFound = res.results_found;

      // Now performing the full search which will load the results
      performSearch(entityId, entityType, lat, lon, resultsFound);
    }
  });
}

// This function creates an array of the data to be used locally
// for faster loading. It will also create the first card when the Go button
// is pressed
function performSearch(entityId, entityType, lat, lon, resultsFound) {

  // Checking for user input
  var rad = $("#distance").val();
  if ((rad === "") || (rad == 0)) {
    rad = 50;
  }

  // Converting miles to metres as API works in metres
  rad = rad / 0.00062137;

  // The API allows for a maximum of 100 restaurants per search location to be user_data
  // So here we randomise the point at which we start looking through the API's array
  // so that the user sees a random selection of the available results each time

  // Checking how many results are found to provide an appropriate result
  if (resultsFound >= 100) { // If >= 100 use a random number up to 80
    var randomStart = Math.floor(Math.random() * 80);
  }
  else if (resultsFound > 20) { // If greater than 20 use the number of results found -20
    var randomStart = Math.floor(Math.random() * (resultsFound - 20));
  } else { // If it's less than 20. Just start from 0
    var randomStart = 0;
  }

  // Create the url we search. We could add it so that the resutls are displayed
  // from closest to furthest however results look best when it is random and
  // ultimately it does not matter as the results shown will be within the users parameters
  var searchUrl = "https://developers.zomato.com/api/v2.1/search?entity_id="
    + entityId + "&entity_type=" + entityType + "&start=" + randomStart
    + "&lat=" + lat + "&lon=" + lon + "&radius=" + rad;

  $.ajax ({
    url: searchUrl,
    type: "GET",
    headers: {"user-key": "3c672f5af7519d65f72ed90953badca5"},
    dataType: "json",
    success: function(result) {
      // deal with data here
      console.log(result);
      var res = JSON.parse(JSON.stringify(result));

      // Resetting the index and restaurants array for a fresh set of results
      index = 0;
      restaurantsArray.length = 0;

      // Creating the new restaurants array
      for (var i = 0; i < res.restaurants.length; i++) {
        var name = res.restaurants[i].restaurant.name;
        var thumbnail = res.restaurants[i].restaurant.thumb;
        var userRating = res.restaurants[i].restaurant.user_rating.aggregate_rating;
        var voteCount = res.restaurants[i].restaurant.user_rating.votes;
        var foodType = res.restaurants[i].restaurant.cuisines;
        var averageCost = res.restaurants[i].restaurant.price_range;
        var siteUrl = res.restaurants[i].restaurant.url;
        var latitude = res.restaurants[i].restaurant.location.latitude;
        var longitude = res.restaurants[i].restaurant.location.longitude;
        var address = res.restaurants[i].restaurant.location.address;

        // If no image is found display a sorry no image found image
        if (thumbnail === "") {
          thumbnail = "images/noImage.png";
        }

        // Creating a restaurant object
        var restaurant = {name: name, thumbnail: thumbnail,
          userRating: userRating, voteCount: voteCount,
          foodType: foodType, averageCost: averageCost, siteUrl: siteUrl,
          latitude: latitude, longitude: longitude, address};

        // Adding the new restaurant to the array
        restaurantsArray[i] = restaurant;
      }

      // Shuffle the array. This will help stop the user having to go through
      // restaurants in the same order every time they search
      shuffle(restaurantsArray);

      // Create the first card
      createCard();
    }
  });
}

// Method for shuffling array order
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Uses API data to create a star rating
function getRating(userRating, voteCount) {
  var restaurantRating = "<span class = 'starText'><b>Star Rating:</b> </span>";
  var roundedRating = Math.round(userRating);
  var starCount = 0;

  for (var i = 0; i < roundedRating; i++) {
    restaurantRating += "<span style = 'margin-right: 4px' class = 'fa fa-star starChecked'></span>";
    starCount++;
  }

  for (var i = starCount; i < 5; i++) {
    restaurantRating += "<span style = 'margin-right: 4px' class = 'fa fa-star'></span>";
    starCount ++;
  }

  restaurantRating += "<p class = 'cardText'><b>User Rating:</b> <span id = 'rating'>This restaurant has been rated "
  + userRating + " out of 5 stars based on " + voteCount + " reviews.</span></p>";

  return restaurantRating;
}

//--------------------- End of API getting code ----------------------

// Uses API data to create a rating for the average cost at the restaurant
function getAverageCost(averageCost) {
  var restaurantAverageCost = "<p id = 'cost' class = 'cardText'><b>Average Cost:</b></p>";
  var poundCount = 0;

  for (var i = 0; i < averageCost; i++) {
    restaurantAverageCost += "<span class='fa fa-dollar dollarOn'></span>";
    poundCount++;
  }

  for (var i = poundCount; i < 4; i++) {
    restaurantAverageCost += "<span class='fa fa-dollar dollarOff'></span>";
    poundCount++;
  }

  return restaurantAverageCost;
}

// Creates the google map and sets the location
function createMap(latitude, longitude) {
  var myCenter = new google.maps.LatLng(latitude, longitude);
  var mapCanvas = document.getElementById("map");
  var mapOptions = {center: myCenter, zoom: 16};
  var map = new google.maps.Map(mapCanvas, mapOptions);
  var marker = new google.maps.Marker({position:myCenter});
  marker.setMap(map);
}

// Function for the searches autocomplete feature
function initialize() {
  var input = document.getElementById('location');
  new google.maps.places.Autocomplete(input);
}
