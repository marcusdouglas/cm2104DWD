function removeSavedRestaurant() {

  var collection = new Mongo.Collection("saved_cards");

  console.log(collection.rawCollection().db.options.url)
  /*
  var url = "mongodb://localhost:27017/saved_cards";

  $.getJSON(url, function(jsondata) {
    console.log(jsondata);
  });*/

  $("#MainContent").on("click", ".savedRestaurant", function() {
    $(this).fadeOut(500, function() {
      $(this).remove();
    });
  });
}
