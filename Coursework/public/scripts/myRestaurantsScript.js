function removeSavedRestaurant() {
  /*
  var url = "mongodb://localhost:27017/saved_cards";

  $.getJSON(url, function(jsondata) {
    console.log(jsondata);
  });*/

  $("#MainContent").on("click", ".savedRestaurant", function() {

    var name = $(this).attr(id);

    $(this).fadeOut(500, function() {
      $(this).remove();
    });

    $.ajax({
         method: "POST",
         url: "/delete",
         data: {"name": name},
         success: function(result) {
            if(/* check if it is ok */) {
                location.reload();
            }
         }
      })
  });
}
