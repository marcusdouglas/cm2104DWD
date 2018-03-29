function removeSavedRestaurant() {

  $("#MainContent").on("click", ".savedRestaurant", function() {
    $(this).fadeOut(500, function() {
      $(this).remove();
    });
  });
}
