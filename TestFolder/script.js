$(document).ready(function() {

  $('#searchform').submit(function() {

    //var searchterms = $("#searchterms").val();
    //var zomUrl = "https://developers.zomato.com/api/v2.1/locations?query=" + searchterms;

    $.ajax ({
      type: "GET",
      url: "https://developers.zomato.com/api/v2.1/locations?query=Aberdeen%2C%20Scotland",
      success: function(result) {
        // deal with data here
        console.log(result);
        $("#resultsbox").append(result);
      }
    });
  });
});
