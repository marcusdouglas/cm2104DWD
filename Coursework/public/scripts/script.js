$(function() {
  // Checking the navigation bar is correct for the loaded device / screen size
  responsiveNav();

  // Makes sure only the first card image is displayed
  showDivs(slideIndex);

});

$(function() {

//---------------------Creates a new card---------------------
  $("#MainContent").on("click", ".button", function() {

    // Remove current card with fade out and create new one
    $("#activeCard").fadeOut(500, function() {
      $("#activeCard").remove();

      formatCard();
      $("#activeCard").addClass("card");
    });

    return false;
  });
});

// Formats the new card
function formatCard () {
  $("#MainContent").append("<div id = 'activeCard'>" + "<h2 class = 'paraTitle'>Restaurant Name</h2>"
  + "<div class = 'imageContainer'><img class = 'cardImage' src = 'images/foodImage3.jpeg'/>"
  + "<img class = 'cardImage' src = 'images/foodImage4.jpeg'/><img class = 'cardImage' src = 'images/foodImage5.jpeg'/>"
  + "<button id = 'leftButton' class = 'btn' onclick = 'plusDivs(-1)''>&#10094;</button>"
  + "<button id = 'rightButton' class = 'btn' onclick = 'plusDivs(1)''>&#10095;</button></div>"
  + "<p>Example Text</p><input id = 'seeMore' class = 'collapseInfo' type = 'checkbox'>"
  + "<label class = 'collapseLabel' for = 'seeMore'>See more...</label><div class = 'expand'>"
  + "<p>This is new text<br><br>In here we will incude extra information that we can obtain from the API."
  + " This may include Google maps to show the location and reviews.</p></div><form id = 'scrollForm'><button id = 'dislikeButton' class = 'button' type = 'button'>"
  + "<button id = 'likeButton' class = 'button' type = 'button'></button></button></form></div>");

  // Makes sure only the first card image is displayed
  showDivs(slideIndex);
  $("#activeCard").hide().fadeIn("500");
}


//----------------------Browse Card Images-----------------------
var slideIndex = 1;

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var imgs = $(".cardImage");

  if (n > imgs.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = imgs.length;
  }
  for (i = 0; i < imgs.length; i++) {
     $(imgs[i]).css({display: "none"});
  }
  $(imgs[slideIndex-1]).css({display: "block"});
  $("#nav").css({zIndex: "+1"});
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

      // Make navigation border radius responsive on resize
      if ($(window).width() > 700) {
        $(".nav-tabs").css({borderRadius: "6px"});
      }
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
      $(".nav-tabs").css({borderRadius: "6px"});
    }
  }
  else {
    $("#nav").css({marginLeft: "0", width: "100%", marginRight: "0", position: "fixed", top: 0});
    $(".nav-tabs").css({borderRadius: "0"});
  }
}

// Will remove login form elements visibility
function loginDisplayNone() {
  $("#loginForm").css({display: "none"});
}
