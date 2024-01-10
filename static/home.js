const body = document.querySelector("body"),
      sidebar = body.querySelector(".sidebar"),
      arrow = body.querySelector(".fa-arrow-left-long")

arrow.addEventListener("click", ()=>{
  sidebar.classList.toggle("close");
})



document.addEventListener("scroll", function () {
  // Get the scroll position
  var scrollPosition = window.scrollY;

  // Move #main-title vertically
  var titlePosition = 50 + 0.5 * scrollPosition;
  document.getElementById("main-title").style.top = titlePosition + "px";



  // Crop #two-chads based on scroll position
  var break1Height = document.getElementById("break-1").offsetHeight;
  var w = window.innerHeight;
  var cropMainAmount = Math.max(
    0,
    Math.min(1, (scrollPosition - 450) / break1Height * (730 / w))
  );
  document.getElementById("two-chads").style.clipPath =
    "inset(0% 0% " + cropMainAmount * 100 + "% 0%)";


//selling
  var scrollElement = document.getElementById("two-selling-chads");
  if (scrollPosition > 100) {
    scrollElement.style.display = "block";
  } else {
    scrollElement.style.display = "none";
  }
  var revealSellingAmount = Math.max(
    0,
    Math.min(1, (scrollPosition - 300) / break1Height * (730 / w))
  );
  var cropSellingAmount = Math.max(
    0,
    Math.min(1, (scrollPosition-1850) / break1Height * (730 / w))
  );

  document.getElementById("two-selling-chads").style.clipPath =
    "inset(" + (100 - revealSellingAmount * 100) + "% 0%"+ cropSellingAmount * 100 +"% 0%)";


  var sellingPosition = -1500 + 1.25 * scrollPosition;
  document.getElementById("selling-title").style.top = sellingPosition + "px";

//buying
var scrollElement = document.getElementById("two-buying-chads");
if (scrollPosition > 100) {
  scrollElement.style.display = "block";
} else {
  scrollElement.style.display = "none";
}

var revealbuyingAmount = Math.max(
  0,
  Math.min(1, (scrollPosition - 1850) / break1Height * (730 / w))
);
var cropbuyingAmount = Math.max(
  0,
  Math.min(1, (scrollPosition-3300) / break1Height * (730 / w))
);

document.getElementById("two-buying-chads").style.clipPath =
  "inset(" + (100 - revealbuyingAmount * 100) + "% 0%"+ cropbuyingAmount * 100 +"% 0%)";


var buyingPosition = -1550 + 0.5 * scrollPosition;
document.getElementById("buying-title").style.top = buyingPosition + "px";

//report
var scrollElement = document.getElementById("two-report-chads");
if (scrollPosition > 100) {
  scrollElement.style.display = "block";
} else {
  scrollElement.style.display = "none";
}
// Reveal #two-report-chads based on scroll position
var revealreportAmount = Math.max(
  0,
  Math.min(1, (scrollPosition - 3300) / break1Height * (730 / w))
);
var cropreportAmount = Math.max(
  0,
  Math.min(1, (scrollPosition-4750) / break1Height * (730 / w))
);

document.getElementById("two-report-chads").style.clipPath =
  "inset(" + (100 - revealreportAmount * 100) + "% 0%"+ cropreportAmount * 100 +"% 0%)";

// Move #feature-title vertically
var reportPosition = -5100 + 1.25 * scrollPosition;
document.getElementById("report-title").style.top = reportPosition + "px";


//conference
var scrollElement = document.getElementById("two-conference-chads");
if (scrollPosition > 100) {
  scrollElement.style.display = "block";
  console.log("aaaaa")
} else {
  scrollElement.style.display = "none";
}

var revealconferenceAmount = Math.max(
  0,
  Math.min(1, (scrollPosition - 4750) / break1Height * (730 / w))
);
var cropconferenceAmount = Math.max(
  0,
  Math.min(1, (scrollPosition-6300) / break1Height * (730 / w))
);

document.getElementById("two-conference-chads").style.clipPath =
  "inset(" + (100 - revealconferenceAmount * 100) + "% 0%"+ cropconferenceAmount * 100 +"% 0%)";

// Move #feature-title vertically
var conferencePosition = -3100 + 0.5 * scrollPosition;
document.getElementById("conference-title").style.top = conferencePosition + "px";
});
