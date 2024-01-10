const body = document.querySelector("body"),
      sidebar = body.querySelector(".sidebar"),
      arrow = body.querySelector(".fa-arrow-left-long"),
      homesideinfo = body.querySelector(".home-side-info")

arrow.addEventListener("click", ()=>{
  sidebar.classList.toggle("close");
})

const carousel = document.querySelector(".carousel");
const arrows = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

carouselChildrens.slice();

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrows.forEach(btn =>{
  btn.addEventListener("click", ()=>{
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    // console.log(btn.id);
  });
});

let isDragging = false, startX, startScrollLeft;

const dragStart = (e)=> {
  isDragging = true;
  carousel.classList.add("dragging");

  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const dragging = (e)=>{
  if(!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = ()=>{
  isDragging = false;
  carousel.classList.remove("dragging");
}

const infiniteScroll = ()=>{
  if(carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (2*carousel.offsetWidth);
    carousel.classList.remove("no-transition");

  } else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
}

carousel.addEventListener("scroll", infiniteScroll);
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);


// const firebaseConfig = {
//   apiKey: "AIzaSyA4hauTN-f9RD73RXbTD2HfHjhHcudxNMc",
//   authDomain: "bid-storage.firebaseapp.com",
//   databaseURL: "https://bid-storage-default-rtdb.firebaseio.com",
//   projectId: "bid-storage",
//   storageBucket: "bid-storage.appspot.com",
//   messagingSenderId: "1041276137804",
//   appId: "1:1041276137804:web:4cacb17a3bf13f0d015fe9"
// };

// firebase.initializeApp(firebaseConfig);

// var bidFormDB = firebase.database().ref('bidForm');

// document.getElementById('bidForm').addEventListener('submit', submitForm);

// function submitForm(e) {
//   e.preventDefault();

//   var bid = getElementVal('bid');

//   console.log(bid);

//   saveData(bid);


//   document.querySelector('.alert').style.display = "block";

//   setTimeout(()=>{
//   document.querySelector('.alert').style.display = "none";


//   }, 4000);

//   document.getElementById("bidForm").reset();
// }

// const saveData = (bid) =>{
//   var newBidForm = bidFormDB.push();

//   newBidForm.set({
//     bid : bid
//   })
// }

// const getElementVal = (id) =>{
//   return document.getElementById(id).value;
// };

