//---------------------Responsive Nav Bar---------------------

function navCollapse() {
    var x = document.getElementById("collapseNav");
    if (x.className === "nav-tabs") {
        x.className += " responsive";
    } else {
        x.className = "nav-tabs";
    }
}
