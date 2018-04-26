// Function to remove a saved restaurant
function removeSavedRestaurant() {

  $("#MainContent").on("click", ".savedRestaurant", function() {

    // The username of the user deleting a restaurant
    var uname = $("#username").text();

    // The name of the restaurant being deleted
    var name = $(this).attr("id");

    // Visually remove the selected card being deleted on the screen
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
