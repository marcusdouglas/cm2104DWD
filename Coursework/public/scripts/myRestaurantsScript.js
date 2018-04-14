function removeSavedRestaurant() {

  $("#MainContent").on("click", ".savedRestaurant", function() {
    $(this).fadeOut(500, function() {
      $(this).remove();
    });
  });

  $.ajax ({
    url: "mongodb://localhost:27017/saved_cards",
    type: "GET",
    dataType: "json",
    success: function(result) {
      // deal with data here
      console.log(result);
      var res = JSON.parse(JSON.stringify(result));
    }
  });
}
