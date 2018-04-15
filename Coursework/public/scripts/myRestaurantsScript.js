var db;

MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  db = database;
  app.listen(8080);
});

function removeSavedRestaurant() {
  /*
  var url = "mongodb://localhost:27017/saved_cards";

  $.getJSON(url, function(jsondata) {
    console.log(jsondata);
  });*/

  db.collection('card').find().toArray(function(err, result) {
    console.log(result);
  });

  $("#MainContent").on("click", ".savedRestaurant", function() {
    $(this).fadeOut(500, function() {
      $(this).remove();
    });
  });
}
