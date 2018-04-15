function removeSavedRestaurant() {

  $("#MainContent").on("click", ".savedRestaurant", function() {

    var name = $(this).attr("id");

    $(this).fadeOut(500, function() {
      $(this).remove();
    });

    $.ajax({
         method: "POST",
         url: "/delete",
         data: {"name": name},
         success: function(result) {
           //console.log(result);
         }
      });
  });
}
