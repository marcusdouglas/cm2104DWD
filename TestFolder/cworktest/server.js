$(document).ready(function() {

$('retrieve-resources').click(function() {

  var displayResources = $("#display-resources");
  displayResources.text('Loading data from JSON source...');

  $.ajax ({
    url: "https://developers.zomato.com/api/v2.1/locations?query=Aberdeen%2C%20Scotland",
    type: "GET",
    data: {key: "e3be4f880ddb28c4772c0a42ac6180a5"},
    dataType: "json",
    success: function(result) {
      // deal with data here
      console.log(result);
    }
  });
});

});
