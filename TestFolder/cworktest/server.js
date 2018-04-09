$(document).ready(function() {

$('retrieve-resources').click(function() {

  var displayResources = $("#display-resources");
  displayResources.text('Loading data from JSON source...');

  $.ajax ({
    url: "https://developers.zomato.com/api/v2.1/locations?query=Aberdeen%2C%20Scotland",
    type: "GET",
    headers: {"user-key": "3c672f5af7519d65f72ed90953badca5"},
    dataType: "json",
    success: function(result) {
      // deal with data here
      console.log(result);
    }
  });
});

});
