$(function() {

  //---------------------Gets API Data---------------------

  $("#searchForm").submit(function(e) {

    e.preventDefault();

    var loc = $("#location").val();
    var rad = $("distance").val();

    var locationUrl = "https://developers.zomato.com/api/v2.1/locations?query=" + loc;
    var entityId = "";
    var entityType = "";

    $.ajax ({
      url: locationUrl,
      type: "GET",
      headers: {"user-key": "3c672f5af7519d65f72ed90953badca5"},
      dataType: "json",
      success: function(result) {
        // deal with data here
        console.log(result);
        var res = JSON.parse(JSON.stringify(result));

        console.log(res.location_suggestions[0].entity_id);
        entityId = res.location_suggestions[0].entity_id;

        console.log(res.location_suggestions[0].entity_type);
        entityType = res.location_suggestions[0].entity_type;
      }
    });

    var searchUrl = "https://developers.zomato.com/api/v2.1/search?"
      + "entity_id=" + entityId + "&entity_type=" + entityType;

    $.ajax ({
      url: searchUrl,
      type: "GET",
      headers: {"user-key": "3c672f5af7519d65f72ed90953badca5"},
      dataType: "json",
      success: function(result) {
        // deal with data here
        console.log(result);
        var res = JSON.parse(JSON.stringify(result));
      }
    });
  });

//---------------------Creates a new card---------------------
  $("#MainContent").on("click", ".button", function() {

    // Remove current card with fade out and create new one
    $("#activeCard").fadeOut(500, function() {
      $("#activeCard").remove();

      formatCard();
      $("#activeCard").addClass("card");
    });

    return false;
  });
});

// Formats the new card
function formatCard () {
  $("#MainContent").append("<div id = 'activeCard'>" + "<h2 class = 'paraTitle'>Restaurant Name</h2>"
  + "<div class = 'imageContainer'><img class = 'cardImage' src = 'images/foodImage3.jpeg'/>"
  + "<img class = 'cardImage' src = 'images/foodImage4.jpeg'/><img class = 'cardImage' src = 'images/foodImage5.jpeg'/>"
  + "<button id = 'leftButton' class = 'btn' onclick = 'plusDivs(-1)''>&#10094;</button>"
  + "<button id = 'rightButton' class = 'btn' onclick = 'plusDivs(1)''>&#10095;</button></div>"
  + "<p>Example Text</p><input id = 'seeMore' class = 'collapseInfo' type = 'checkbox'>"
  + "<label class = 'collapseLabel' for = 'seeMore'>See more...</label><div class = 'expand'>"
  + "<p>This is new text<br><br>In here we will incude extra information that we can obtain from the API."
  + " This may include Google maps to show the location and reviews.</p></div><form id = 'scrollForm'><button id = 'dislikeButton' class = 'button' type = 'button'>"
  + "<button id = 'likeButton' class = 'button' type = 'button'></button></button></form></div>");

  // Makes sure only the first card image is displayed
  showDivs(slideIndex);
  $("#activeCard").hide().fadeIn("500");
}
