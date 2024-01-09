const body = document.querySelector("body"),
      sidebar = body.querySelector(".sidebar"),
      arrow = body.querySelector(".fa-arrow-left-long")

arrow.addEventListener("click", ()=>{
  sidebar.classList.toggle("close");
})

// const carousel = document.querySelector(".carousel");
// const arrows = document.querySelectorAll(".wrapper i");
// const firstCardWidth = carousel.querySelector(".card").offsetWidth;

// arrows.forEach(btn =>{
//   btn.addEventListener("click", ()=>{
//     carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
//     // console.log(btn.id);
//   });
// });

// let isDragging = false, startX, startScrollLeft;

// const dragStart = (e)=> {
//   isDragging = true;
//   carousel.classList.add("dragging");

//   startX = e.pageX;
//   startScrollLeft = carousel.scrollLeft;
// }

// const dragging = (e)=>{
//   if(!isDragging) return;
//   carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
// }

// const dragStop = ()=>{
//   isDragging = false;
//   carousel.classList.remove("dragging");
// }

// carousel.addEventListener("mousedown", dragStart);
// carousel.addEventListener("mousemove", dragging);
// document.addEventListener("mouseup", dragStop);