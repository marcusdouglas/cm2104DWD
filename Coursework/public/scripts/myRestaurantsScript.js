var url = "mongodb://localhost:27017/saved_cards";

function removeSavedRestaurant() {

  $.ajax ({
    url: url,
    type: "GET",
    dataType: "json",
    success: function(result) {
      // deal with data here
      console.log(result);
      var res = JSON.parse(JSON.stringify(result));
    }
  });

  $("#MainContent").on("click", ".savedRestaurant", function() {
    $(this).fadeOut(500, function() {
      $(this).remove();
    });
  });
}
