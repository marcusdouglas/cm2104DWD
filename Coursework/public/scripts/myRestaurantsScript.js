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

$(function() {
  getAverage();
});

function getAverage() {
  var restaurantAverageCost = "";
  var poundCount = 0;
  averageCost = <%= restaurant.averageCost %>;

  for (var i = 0; i < averageCost; i++) {
    restaurantAverageCost += "<span class='fa fa-dollar dollarOn'></span>";
    poundCount++;
  }

  for (var i = poundCount; i < 4; i++) {
    restaurantAverageCost += "<span class='fa fa-dollar dollarOff'></span>";
    poundCount++;
  }

  console.log(restaurantAverageCost);

  $("#costText").append(restaurantAverageCost);
}
