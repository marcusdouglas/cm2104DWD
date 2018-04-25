function removeSavedRestaurant() {

  $("#MainContent").on("click", ".savedRestaurant", function() {

    var uname = $("#username").text();
    var name = $(this).attr("id");

    $(this).fadeOut(500, function() {
      $(this).remove();
    });

    $.ajax({
         method: "POST",
         url: "/delete",
         data: {"name": name, "uname": uname},
         success: function(result) {
           //console.log(result);
         }
      });
  });
}
