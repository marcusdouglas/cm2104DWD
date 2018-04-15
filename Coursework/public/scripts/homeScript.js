$(function() {

  //---------------------Gets API Data---------------------

  $("#searchForm").submit(function(e) {
    // Stops the page jumping to the top on click
    e.preventDefault();
    getLocation();
  });

//---------------------Creates a new card---------------------
  $("#MainContent").on("click", ".button", function() {
    createCard();
    index++;
  });
});

function saveCard() {

  var name = "Name";
  var image = "images/foodImage4.jpeg";
  var text = "Some Text";

  console.log(name);
  saveCard();

  $.ajax({
       method: "POST",
       url: "/card",
       data: {"name": name, "image": image, "text": text},
       success: function(result) {
         //console.log(result);
       }
    });
}

var restaurantsArray = [];
var index = 0;

function createCard() {
  // Remove current card with fade out and create new one
  $("#activeCard").fadeOut(500, function() {

    var name = restaurantsArray[index].name;
    var thumbnail = restaurantsArray[index].thumbnail;
    var userRating = restaurantsArray[index].userRating;
    var voteCount = restaurantsArray[index].voteCount;
    var foodType = restaurantsArray[index].foodType;
    var averageCost = restaurantsArray[index].averageCost;
    var siteUrl = restaurantsArray[index].siteUrl;
    var latitude = restaurantsArray[index].latitude;
    var longitude = restaurantsArray[index].longitude;

    $("#activeCard").remove();

    formatCard(name, thumbnail, userRating, voteCount, foodType, averageCost,
      siteUrl, latitude, longitude);

    // Calls the function to create the google map
    createMap(latitude, longitude);

    $("#activeCard").addClass("card");
  });

  return false;
}

// Formats the new card
function formatCard (name, thumbnail, userRating, voteCount, foodType,
  averageCost, siteUrl, latitude, longitude) {

  var restaurantName = "<div id = 'activeCard'><h2 class = 'paraTitle'>" + name + "</h2>";
  var restaurantFood = "<br><b>Cuisine/s:</b> " + foodType;

  $("#MainContent").append(restaurantName
  + "<div class = 'imageContainer'><img class = 'cardImage' src = " + "'" + thumbnail + "'" + ">"
  + "<img class = 'cardImage' src = 'images/foodImage4.jpeg'><img class = 'cardImage' src = 'images/foodImage5.jpeg'>"
  + "<button id = 'leftButton' class = 'btn' onclick = 'plusDivs(-1)'>&#10094;</button>"
  + "<button id = 'rightButton' class = 'btn' onclick = 'plusDivs(1)'>&#10095;</button></div>"
  + getRating(userRating, voteCount)
  + restaurantFood
  + getAverageCost(averageCost)
  + "</p><input id = 'seeMore' class = 'collapseInfo' type = 'checkbox'>"
  + "<label class = 'collapseLabel' for = 'seeMore'>See more...</label><div class = 'expand'>"
  + "<p><b>Site Url: </b>" + siteUrl + "</p><h3>Location</h3>"
  + "<div id = 'map'></div>"
  + "</div><form id = 'scrollForm'><button id = 'dislikeButton' class = 'button' type = 'button'>"
  + "<button id = 'likeButton' class = 'button' type = 'button'></button></button></form></div>");

  // Makes sure only the first card image is displayed
  showDivs(slideIndex);
  $("#activeCard").hide().fadeIn("500");
}


//------------------ Start of API getting code -------------------

// This function gets the appropriate ID's to get results from the performSearch function
function getLocation() {

  var loc = $("#location").val();
  var rad = $("distance").val();

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

      performSearch(entityId, entityType);
    }
  });
}

// This function creates an array of the data to be used locally
// for faster loading. It will also create the first card when the Go button
// is pressed
function performSearch(entityId, entityType) {

  var searchUrl = "https://developers.zomato.com/api/v2.1/search?entity_id=" + entityId + "&entity_type=" + entityType;
  //console.log(searchUrl);

  $.ajax ({
    url: searchUrl,
    type: "GET",
    headers: {"user-key": "3c672f5af7519d65f72ed90953badca5"},
    dataType: "json",
    success: function(result) {
      // deal with data here
      console.log(result);
      var res = JSON.parse(JSON.stringify(result));

      index = 0;
      restaurantsArray.length = 0;

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

        var restaurant = {name: name, thumbnail: thumbnail,
          userRating: userRating, voteCount: voteCount,
          foodType: foodType, averageCost: averageCost, siteUrl: siteUrl,
          latitude: latitude, longitude: longitude};
        //console.log(restaurant);

        restaurantsArray[i] = restaurant;
      }

      createCard();
    }
  });
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

  restaurantRating += "<p><b>User Rating:</b> This restaurant has been rated "
  + userRating + " out of 5 stars based on " + voteCount + " reviews.";

  return restaurantRating;
}

//--------------------- End of API getting code ----------------------

// Uses API data to create a rating for the average cost at the restaurant
function getAverageCost(averageCost) {
  var restaurantAverageCost = "<br><b>Average Cost:</b> ";
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
