$(function() {
  // document document ready
  alert("Document Ready");

  // The action performed when submit
  // buttons are clicked in the form
  $("#searchform").submit(function() {
    // Variable for user input
    var searchterms = $("#searchterms").val();

    // Call the search function
    getResultsFromOMDB(searchterms);
    return false;
  });
});

  function getResultsFromOMDB(searchterms) {
    // Call youtube API using AJAX
    // Build url for the request
    var url = "http://www.omdbapi.com/?i=tt3896198&apikey=8581c15b" + searchterms;

    // Use the JQuery Json shortcut
    $.getJSON(url, function(jsondata) {
      // Handle the requests
      printJSON(jsondata);
    });
  }

  function printJSON(jsondata) {
    // Prints the json to the screen
    var normal = JSON.stringify(jsondata);
    $("#resultsbox")/append("<p>" + normal + "</p>");
  }

  /*
  // Adds a new item to the list
  function addItemToList(item) {
    $("#results").append("<li>" + item + "</li>");
  }*/
