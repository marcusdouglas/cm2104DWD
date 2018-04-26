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

// Calls the topScroll function on scroll
$(document).ready(function () {
  $(window).scroll(function () {
    topScroll();
  });
});

// Displays or removes the scroll button
function topScroll() {
    if ($(window).scrollTop() > 400 || $(window).scrollTop() > 400) {
        $("#topButton").css({display: "block"});
    } else {
        $("#topButton").css({display: "none"});
    }
}

// When the user clicks on the top button, scroll to the top of the document
function topFunction() {
    $(window).scrollTop(0);
}
