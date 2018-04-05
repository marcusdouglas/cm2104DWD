$(function() {
  // document document ready
  alert("Document Ready");

  $("#searchform").submit(function() {
    // Variable for user input
    var searchterms = $("#searchterms").val();
    addItemToList(searchterms);
    return false;
  });

  // Adds a new item to the list
  function addItemToList(item) {
    $("#results").append("<li>" + item + "</li>");
  }
});
