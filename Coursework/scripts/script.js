$(function() {
  // Checking the navigation bar is correct for the loaded device / screen size
  responsiveNav();

  //---------------------Changing page content---------------------
  $("#MainContent").on("click", ".button", function() {

    // Remove current card with fade out and create new one
    $("#activeCard").fadeOut(500, function() {
      $("#activeCard").remove();

      addItemToList("<img id='cardImage' src='images/foodImage3.jpeg'/>");
      $("#activeCard").addClass("card");
    });

    return false;
  });
});

function addItemToList (item) {
  $("#MainContent").append("<div id = 'activeCard'>" + "<h2 class = 'paraTitle'>Restaurant Name</h2>" + item
  + "<p>Example Text</p><input id = 'seeMore' class = 'collapseInfo' type = 'checkbox'>"
  + "<label class = 'collapseLabel' for = 'seeMore'>See more...</label><div class = 'expand'>"
  + "<p>New Text</p></div><form id = 'scrollForm'><button id = 'dislikeButton' class = 'button' type = 'button'>"
  + "<button id = 'likeButton' class = 'button' type = 'button'></button></button></form></div>");

  $("#activeCard").hide().fadeIn("500");
}

//---------------------Responsive Nav Bar---------------------

function navCollapse() {
    var x = document.getElementById("collapseNav");
    if (x.className === "nav-tabs") {
        x.className += " responsive";
    } else {
        x.className = "nav-tabs";
    }
}

//---------------------Sticky Nav Bar---------------------

$(document).ready(function () {
  $(window).resize(function () {
      responsiveNav();
  });
});

$(document).ready(function () {
  $(window).scroll(function () {
    responsiveNav();
  });
});

function responsiveNav() {
  if ($(window).width() > 700) {
    if ($(window).scrollTop() > 30) {
      $("#nav").css({marginLeft: "0", width: "100%", marginRight: "0", position: "fixed", top: 0});
      //$("#MainContent").addClass("sticky");
    }
    if($(window).scrollTop() < 330) {
      $("#nav").css({marginLeft: "15%", width: "70%", marginRight: "15%", position: "static"});
      //$("#MainContent").removeClass("sticky");
    }
  }
  else {
    $("#nav").css({marginLeft: "0", width: "100%", marginRight: "0", position: "fixed", top: 0});
  }
}

/*
$(window).scroll(function () {//30 and 300
  if ($(window).scrollTop() > 30) {
    $("#nav").css({marginLeft: "0", width: "100%", marginRight: "0", position: "fixed", top: 0});
    $("#MainContent").addClass("sticky");
  }
  if($(window).scrollTop() < 300) {
    $("#nav").css({marginLeft: "15%", width: "70%", marginRight: "15%", position: "static"});
    $("#MainContent").removeClass("sticky");
  }
});*/
