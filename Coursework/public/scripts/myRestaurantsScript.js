const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/saved_cards";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

function removeSavedRestaurant() {

  $.ajax ({
    url: url,
    type: "GET",
    dataType: "json",
    success: function(result) {
      // deal with data here
      console.log(result);
      var res = JSON.parse(JSON.stringify(result));
    }
  });

  $("#MainContent").on("click", ".savedRestaurant", function() {
    $(this).fadeOut(500, function() {
      $(this).remove();
    });
  });
}
