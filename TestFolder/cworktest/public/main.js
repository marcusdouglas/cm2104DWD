$(document).ready(function() {

  $("#retrieve-resources").click(function() {

    $.ajax ({
      url: "https://developers.zomato.com/api/v2.1/locations?query=Aberdeen%2C%20Scotland",
      type: "GET",
      headers: {"user-key": "3c672f5af7519d65f72ed90953badca5"},
      dataType: "json",
      success: function(result) {
        // deal with data here
        console.log(result);
        var res = JSON.parse(JSON.stringify(result));
        console.log(res.location_suggestions[0].city_id);
      }
    });
  });
});
