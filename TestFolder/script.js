$(document).ready(function() {

  $('#searchform').submit(function() {

    //var searchterms = $("#searchterms").val();
    //var zomUrl = "https://developers.zomato.com/api/v2.1/locations?query=" + searchterms;

    $.ajax ({
      type: "GET",
      data: {key: "e3be4f880ddb28c4772c0a42ac6180a5", q: search.slice(0, -1)},
      url: "https://developers.zomato.com/api/v2.1/locations?query=Aberdeen%2C%20Scotland",
      success: function(result) {
        // deal with data here
        console.log(result);
        var pretty = JSON.stringify(jsondata, null, 4);
        $("#resultsbox").append("<pre>" + pretty + "</pre>");
      }
    });
  });
});
