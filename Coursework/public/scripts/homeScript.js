$(function() {

  //---------------------Gets API Data---------------------

  $("#searchForm").submit(function(e) {
    // Stops the page jumping to the top on click
    e.preventDefault();
    getLocation();
/*
    // Stops the page jumping to the top on click
    e.preventDefault();

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
    });*/
/*
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

          //console.log(res.restaurants[0].restaurant.name);
          var name = res.restaurants[0].restaurant.name;
          var thumbnail = res.restaurants[0].restaurant.thumb;
          var userRating = res.restaurants[0].restaurant.user_rating.aggregate_rating;
          var voteCount = res.restaurants[0].restaurant.user_rating.votes;
          var foodType = res.restaurants[0].restaurant.cuisines;
          var averageCost = res.restaurants[0].restaurant.price_range;

          createCard(name, thumbnail, userRating, voteCount, foodType, averageCost);
        }
      });
    }*/

  });

//---------------------Creates a new card---------------------
  $("#MainContent").on("click", ".button", function() {
    index++;
    createCard();

    //createCard(name, thumbnail, userRating, voteCount, foodType, averageCost);
  });
});

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

    $("#activeCard").remove();

    formatCard(name, thumbnail, userRating, voteCount, foodType, averageCost);
    $("#activeCard").addClass("card");

    //index++;
  });

  return false;
}

/*
function createCard(name, thumbnail, userRating, voteCount, foodType, averageCost) {
  // Remove current card with fade out and create new one
  $("#activeCard").fadeOut(500, function() {
    $("#activeCard").remove();

    formatCard(name, thumbnail, userRating, voteCount, foodType, averageCost);
    $("#activeCard").addClass("card");
  });

  return false;
}*/

//var index = 0;

// Formats the new card
function formatCard (name, thumbnail, userRating, voteCount, foodType, averageCost) {

  var restaurantName = "<div id = 'activeCard'><h2 class = 'paraTitle'>" + name + "</h2>";
  var restaurantFood = "<br><b>Cuisine/s:</b> " + foodType;

  $("#MainContent").append(restaurantName
  + "<div class = 'imageContainer'><img class = 'cardImage' src = " + "'" + thumbnail + "'" + "/>"
  + "<img class = 'cardImage' src = 'images/foodImage4.jpeg'/><img class = 'cardImage' src = 'images/foodImage5.jpeg'/>"
  + "<button id = 'leftButton' class = 'btn' onclick = 'plusDivs(-1)''>&#10094;</button>"
  + "<button id = 'rightButton' class = 'btn' onclick = 'plusDivs(1)''>&#10095;</button></div>"
  + getRating(userRating, voteCount)
  + restaurantFood
  + getAverageCost(averageCost)
  + "</p><input id = 'seeMore' class = 'collapseInfo' type = 'checkbox'>"
  + "<label class = 'collapseLabel' for = 'seeMore'>See more...</label><div class = 'expand'>"
  + "<p>This is new text<br><br>In here we will incude extra information that we can obtain from the API."
  + " This may include Google maps to show the location and reviews.</p></div><form id = 'scrollForm'><button id = 'dislikeButton' class = 'button' type = 'button'>"
  + "<button id = 'likeButton' class = 'button' type = 'button'></button></button></form></div>");

  // Makes sure only the first card image is displayed
  showDivs(slideIndex);
  $("#activeCard").hide().fadeIn("500");
}

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

var restaurantsArray = [];

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
/*
      //console.log(res.restaurants[0].restaurant.name);
      var name = res.restaurants[index].restaurant.name;
      var thumbnail = res.restaurants[index].restaurant.thumb;
      var userRating = res.restaurants[index].restaurant.user_rating.aggregate_rating;
      var voteCount = res.restaurants[index].restaurant.user_rating.votes;
      var foodType = res.restaurants[index].restaurant.cuisines;
      var averageCost = res.restaurants[index].restaurant.price_range;
*/

      //var restaurantsArray = [];

      for (var i = 0; i < res.restaurants.length; i++) {
        var name = res.restaurants[i].restaurant.name;
        var thumbnail = res.restaurants[i].restaurant.thumb;
        var userRating = res.restaurants[i].restaurant.user_rating.aggregate_rating;
        var voteCount = res.restaurants[i].restaurant.user_rating.votes;
        var foodType = res.restaurants[i].restaurant.cuisines;
        var averageCost = res.restaurants[i].restaurant.price_range;

        var restaurant = {name: name, thumbnail: thumbnail,
          userRating: userRating, voteCount: voteCount,
          foodType: foodType, averageCost: averageCost};
        //console.log(restaurant);
        restaurantsArray[i] = restaurant;
      }

      //createCard(name, thumbnail, userRating, voteCount, foodType, averageCost);
      createCard();
      //console.log(restaurantsArray);
      //return restaurantsArray;
    }
  });
}

// Uses API data to create a star rating
function getRating(userRating, voteCount) {
  var restaurantRating = "<span class = 'starText'><b>Star Rating:</b> </span>";
  var roundedRating = Math.round(userRating);
  var starCount = 0;

  for (var i = 0; i < roundedRating; i++) {
    restaurantRating += "<span class = 'fa fa-star starChecked'></span>";
    starCount++;
  }

  for (var i = starCount; i < 5; i++) {
    restaurantRating += "<span class = 'fa fa-star'></span>";
    starCount ++;
  }

  restaurantRating += "<p><b>User Rating:</b> This restaurant has been rated "
  + userRating + " out of 5 stars based on " + voteCount + " reviews.";

  return restaurantRating;
}

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
