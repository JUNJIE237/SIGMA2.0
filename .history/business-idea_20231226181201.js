

const body = document.querySelector("body"),
      sidebar = body.querySelector(".sidebar"),
      arrow = body.querySelector(".fa-arrow-left-long")

arrow.addEventListener("click", ()=>{
  sidebar.classList.toggle("close");
})

document.addEventListener('DOMContentLoaded', function() {
  const nextButton = document.getElementById('next-button');

  nextButton.addEventListener('click', function() {
    // Implement the logic to go to the next section of the form
  });

  function onInput(event) {
    if(event.target.value.trim() !== '') {
        event.target.classList.add('input-filled');
    } else {
        event.target.classList.remove('input-filled');
    }
}

// Attach event listeners to input elements
document.addEventListener('DOMContentLoaded', function() {
    var inputs = document.querySelectorAll('input');
    inputs.forEach(function(input) {
        input.addEventListener('input', onInput);
    });
});

});

const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

let formStepsNum = 0;

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}
