$(function() {
  // document document ready
  alert("Document Ready");

  $("#searchform").submit(function() {
    addItemToList("example item");
    return false;
  });

  function addItemToList(item) {
    $("#results").append("<li>" + item + "</li>");
  }
});
