document.addEventListener("DOMContentLoaded", function() {
  let currentStep = 0;

  const formStep2 = document.getElementById('form-step-2');

  function updateProgress() {
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.form-content');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    const submitButton = document.querySelector('.submit-btn');

    forms.forEach((form, index) => {
        form.style.display = index === currentStep ? 'block' : 'none';
    });

    tabs.forEach((tab, index) => {
        tab.classList.toggle('active', index === currentStep);
        tab.classList.toggle('complete', index < currentStep);
    });

    prevButton.style.display = currentStep === 0 ? 'none' : 'inline-block';
    nextButton.style.display = currentStep === forms.length - 1 ? 'none' : 'inline-block';
    submitButton.style.display = currentStep === forms.length - 2 ? 'inline-block' : 'none'; // Show on the second-to-last form
  }

  function move(direction) {
      const forms = document.querySelectorAll('.form-content');
      if (direction === 'next' && currentStep < forms.length - 1) {
          currentStep++;
      } else if (direction === 'prev' && currentStep > 0) {
          currentStep--;
      } else if (direction === 'submit') {
          currentStep = forms.length - 1;
      }
      updateProgress();
  }

  function validateInputs() {
      const activeForm = document.querySelector('.form-content.active');
      const inputs = activeForm.querySelectorAll('input[required], select[required]');
      const errorMessages = activeForm.querySelectorAll('.error-message');
      let allValid = true;

      inputs.forEach((input, index) => {
          if (!input.value.trim()) {
              allValid = false;
              errorMessages[index].style.display = 'block';
          } else {
              errorMessages[index].style.display = 'none';
          }
      });

      return allValid;
  }

  document.querySelector('.container').addEventListener('click', function(event) {
      if (event.target.classList.contains('next-btn')) {
          event.preventDefault();
          if (validateInputs()) {
              move('next');
          }
      } else if (event.target.classList.contains('prev-btn')) {
          event.preventDefault();
          move('prev');
      } else if (event.target.classList.contains('submit-btn')) {
          event.preventDefault();
          if (validateInputs()) {
              move('submit');
          }
      }
  });

  updateProgress();


  const body = document.querySelector("body"),
        sidebar = body.querySelector(".sidebar"),
        arrow = body.querySelector(".fa-arrow-left-long");

  arrow.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
  });

  const formStep1 = document.getElementById('form-step-1');
  const formStep3 = document.getElementById('form-step-3');

  
  document.getElementById('dropZone').addEventListener('click', function() {
    document.getElementById('fileInput').click();
  });

  document.getElementById('fileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    handleFile(file);
  });

  document.getElementById('dropZone').addEventListener('dragover', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.add('drag-over');
  });

  document.getElementById('dropZone').addEventListener('dragleave', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.remove('drag-over');
  });

  document.getElementById('dropZone').addEventListener('drop', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.remove('drag-over');
    var file = event.dataTransfer.files[0];
    handleFile(file);
  });


  function handleFile(file) {
    var MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    var SUPPORTED_FILE_TYPES = ['application/pdf']; 

    if (!file) {
      alert('No file selected!');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('File is too large. Maximum size is 5MB.');
      return;
    }

    if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
      alert('Unsupported file type. Allowed types are PDF.');
      return;
    }

    document.getElementById('dropZoneText').textContent = 'File selected: ' + file.name;
  }


  window.triggerFileInput = function() {
    event.preventDefault();
    document.getElementById('fileInput').click();
  };



  function grabFormData() {
    const firstName = formStep1.querySelector('#fname').value;
    const lastName = formStep1.querySelector('#lastname').value;
    const email = formStep1.querySelector('#email').value;
    const myKadPassport = formStep1.querySelector('#pass').value;
    const phoneNumber = formStep1.querySelector('#phone-number').value;
    const phoneCountryCode=formStep1.querySelector('#phone').value;
    const nationality = formStep1.querySelector('#nationality').value;
  
    const ideaTitle = formStep2.querySelector('#ideatitle').value;
    const ideaDescription= formStep2.querySelector('#ideadescription').value;
    const ideaCat = formStep2.querySelector('#ideacat').value;
    const targetUser = formStep2.querySelector('#targetuser').value;
    const ideaDuration = formStep2.querySelector('#ideaduration').value;
    const priceMin = formStep2.querySelector('#price-min').value;
    const priceMax = formStep2.querySelector('#price-max').value;

    const problemStatement= formStep3.querySelector('#problemstatement').value;
    const Solution= formStep3.querySelector('#solution').value;
    const Model=formStep3.querySelector('#model').value;
    const SWOT= formStep3.querySelector('#swot').value;
  
    localStorage.setItem('formData', JSON.stringify({
      firstName,
      lastName,
      email,
      myKadPassport,
      phoneCountryCode,
      phoneNumber,
      nationality,
      ideaTitle,
      ideaDescription,
      ideaCat,
      targetUser,
      ideaDuration,
      priceMin,
      priceMax,
      problemStatement,
      Solution,
      Model,
      SWOT
    }));
  }
  
  function populateStep3() {
    const formData = JSON.parse(localStorage.getItem('formData2'));
  
    if (formData) {
      document.getElementById('profile-name').textContent = `${formData.firstName} ${formData.lastName}`;
      document.getElementById('profile-email').textContent = formData.email;
      document.getElementById('profile-pass').textContent = formData.pass;
      document.getElementById('profile-fphonenumber').textContent = `${formData.phoneCountryCode} ${formData.phoneNumber}`;
      document.getElementById('idea-title-summary').textContent = formData.ideatitle;
      document.getElementById('idea-description-summary').textContent = formData.ideadescription;
      document.getElementById('idea-category-summary').textContent = formData.ideacat;
      document.getElementById('target-user-summary').textContent = formData.targetuser;
      document.getElementById('idea-duration-summary').textContent = formData.ideaduration;
      document.getElementById('problem-statement-summary').textContent = formData.problemstatement;
      document.getElementById('solution-summary').textContent = formData.solution;
      document.getElementById('model-summary').textContent = formData.model;
      document.getElementById('swot-summary').textContent = formData.swot;
    }
  }
  
  
  document.querySelector('.download-btn').addEventListener('click', function(event) {
    event.preventDefault(); 
    downloadReport();
  });
  
  document.querySelector('.home-btn').addEventListener('click', function(event) {
    event.preventDefault(); 
    goHome();
  });
    document.querySelector('.submit-btn').addEventListener('click', (e) => {
    e.preventDefault(); 
    grabFormData(); 
    populateStep3(); 
  });


  function saveFormData() {
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const myKadPassport = document.getElementById('pass').value;
    const phoneCountryCode = document.getElementById('phone').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const nationality = document.getElementById('nationality').value;
    
    const ideaTitle = document.getElementById('ideatitle').value;
    const ideaDescription =document.getElementById ('ideadescription').value;
    const ideaDuration = document.getElementById('ideaduration').value;
    const ideaCat = document.getElementById('ideacat').value;
    const targetUser = document.getElementById('targetuser').value;
    const priceMin = document.getElementById('price-min').value;
    const priceMax = document.getElementById('price-max').value;

    const problemStatement= document.getElementById('problemstatement').value;
    const Model= document.getElementById('model').value;
    const Solution= document.getElementById('solution').value;
    const SWOT= document.getElementById('swot').value;
    
    const formData = {
      firstName,
      lastName,
      email,
      myKadPassport,
      phoneCountryCode,
      phoneNumber,
      nationality,
      ideaTitle,
      ideaDescription,
      ideaDuration,
      ideaCat,
      targetUser,
      priceMin,
      priceMax,
      problemStatement,
      Model,
      Solution,
      SWOT
    };
  

  }
  


  function loadSummary() {
    const formData = JSON.parse(localStorage.getItem('formData'));
  
    if (formData) {
      document.getElementById('profile-name').textContent = `${formData.firstName} ${formData.lastName}`;
      document.getElementById('profile-email').textContent = formData.email;
      document.getElementById('profile-pass').textContent = formData.myKadPassport;
      document.getElementById('profile-fphonenumber').textContent = `${formData.phoneCountryCode} ${formData.phoneNumber}`;
      document.getElementById('profile-nationality').textContent = formData.nationality;
      document.getElementById('idea-title-summary').textContent = formData.ideaTitle;
      document.getElementById('idea-description-summary').textContent = formData.ideaDescription;
      document.getElementById('idea-category-summary').textContent = formData.ideaCat;
      document.getElementById('target-user-summary').textContent = formData.targetUser;
      document.getElementById('idea-duration-summary').textContent=formData.ideaDuration;
      document.getElementById('problem-statement-summary').textContent = formData.problemStatement;
      document.getElementById('solution-summary').textContent = formData.Solution;
      document.getElementById('model-summary').textContent = formData.Model;
      document.getElementById('swot-summary').textContent = formData.SWOT;
      document.getElementById('price-range-summary').textContent = `${formData.priceMin} - ${formData.priceMax}`;
    } else {
      console.log('No data found in localStorage.');
    }
  }
  

function navigateForm(step) {
  if (step === 'submit') {
    saveFormData();
    loadSummary();
  }
}

document.querySelector('.submit-btn').addEventListener('click', function(event) {
  event.preventDefault(); 
  navigateForm('submit');
});


function showReport() {
  const formContent = document.querySelectorAll('.form-content');
  formContent.forEach(form => form.classList.remove('active'));
  document.getElementById('form-step-3').classList.add('active');
}

function onFormSubmission() {
  saveFormData();
  showReport();
  loadSummary();
}

document.querySelector('.submit-btn').addEventListener('click', function(event) {
  event.preventDefault(); 
  onFormSubmission(); 
});

function goHome() {
  window.location.href = 'home.html'; 
}


});document.addEventListener("DOMContentLoaded", function() {
  let currentStep = 0;

  const formStep2 = document.getElementById('form-step-2');

  function updateProgress() {
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.form-content');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    const submitButton = document.querySelector('.submit-btn');

    forms.forEach((form, index) => {
        form.style.display = index === currentStep ? 'block' : 'none';
    });

    tabs.forEach((tab, index) => {
        tab.classList.toggle('active', index === currentStep);
        tab.classList.toggle('complete', index < currentStep);
    });

    prevButton.style.display = currentStep === 0 ? 'none' : 'inline-block';
    nextButton.style.display = currentStep === forms.length - 1 ? 'none' : 'inline-block';
    submitButton.style.display = currentStep === forms.length - 2 ? 'inline-block' : 'none'; // Show on the second-to-last form
  }

  function move(direction) {
      const forms = document.querySelectorAll('.form-content');
      if (direction === 'next' && currentStep < forms.length - 1) {
          currentStep++;
      } else if (direction === 'prev' && currentStep > 0) {
          currentStep--;
      } else if (direction === 'submit') {
          currentStep = forms.length - 1;
      }
      updateProgress();
  }

  function validateInputs() {
      const activeForm = document.querySelector('.form-content.active');
      const inputs = activeForm.querySelectorAll('input[required], select[required]');
      const errorMessages = activeForm.querySelectorAll('.error-message');
      let allValid = true;

      inputs.forEach((input, index) => {
          if (!input.value.trim()) {
              allValid = false;
              errorMessages[index].style.display = 'block';
          } else {
              errorMessages[index].style.display = 'none';
          }
      });

      return allValid;
  }

  document.querySelector('.container').addEventListener('click', function(event) {
      if (event.target.classList.contains('next-btn')) {
          event.preventDefault();
          if (validateInputs()) {
              move('next');
          }
      } else if (event.target.classList.contains('prev-btn')) {
          event.preventDefault();
          move('prev');
      } else if (event.target.classList.contains('submit-btn')) {
          event.preventDefault();
          if (validateInputs()) {
              move('submit');
          }
      }
  });

  updateProgress();


  const body = document.querySelector("body"),
        sidebar = body.querySelector(".sidebar"),
        arrow = body.querySelector(".fa-arrow-left-long");

  arrow.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
  });

  const formStep1 = document.getElementById('form-step-1');
  const formStep3 = document.getElementById('form-step-3');

  
  document.getElementById('dropZone').addEventListener('click', function() {
    document.getElementById('fileInput').click();
  });

  document.getElementById('fileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    handleFile(file);
  });

  document.getElementById('dropZone').addEventListener('dragover', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.add('drag-over');
  });

  document.getElementById('dropZone').addEventListener('dragleave', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.remove('drag-over');
  });

  document.getElementById('dropZone').addEventListener('drop', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.remove('drag-over');
    var file = event.dataTransfer.files[0];
    handleFile(file);
  });


  function handleFile(file) {
    var MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    var SUPPORTED_FILE_TYPES = ['application/pdf']; 

    if (!file) {
      alert('No file selected!');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('File is too large. Maximum size is 5MB.');
      return;
    }

    if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
      alert('Unsupported file type. Allowed types are PDF.');
      return;
    }

    document.getElementById('dropZoneText').textContent = 'File selected: ' + file.name;
  }


  window.triggerFileInput = function() {
    event.preventDefault();
    document.getElementById('fileInput').click();
  };



  function grabFormData() {
    const firstName = formStep1.querySelector('#fname').value;
    const lastName = formStep1.querySelector('#lastname').value;
    const email = formStep1.querySelector('#email').value;
    const myKadPassport = formStep1.querySelector('#pass').value;
    const phoneNumber = formStep1.querySelector('#phone-number').value;
    const phoneCountryCode=formStep1.querySelector('#phone').value;
    const nationality = formStep1.querySelector('#nationality').value;
  
    const ideaTitle = formStep2.querySelector('#ideatitle').value;
    const ideaDescription= formStep2.querySelector('#ideadescription').value;
    const ideaCat = formStep2.querySelector('#ideacat').value;
    const targetUser = formStep2.querySelector('#targetuser').value;
    const ideaDuration = formStep2.querySelector('#ideaduration').value;
    const priceMin = formStep2.querySelector('#price-min').value;
    const priceMax = formStep2.querySelector('#price-max').value;

    const problemStatement= formStep3.querySelector('#problemstatement').value;
    const Solution= formStep3.querySelector('#solution').value;
    const Model=formStep3.querySelector('#model').value;
    const SWOT= formStep3.querySelector('#swot').value;
  
    localStorage.setItem('formData', JSON.stringify({
      firstName,
      lastName,
      email,
      myKadPassport,
      phoneCountryCode,
      phoneNumber,
      nationality,
      ideaTitle,
      ideaDescription,
      ideaCat,
      targetUser,
      ideaDuration,
      priceMin,
      priceMax,
      problemStatement,
      Solution,
      Model,
      SWOT
    }));
  }
  
  function populateStep3() {
    const formData = JSON.parse(localStorage.getItem('formData2'));
  
    if (formData) {
      document.getElementById('profile-name').textContent = `${formData.firstName} ${formData.lastName}`;
      document.getElementById('profile-email').textContent = formData.email;
      document.getElementById('profile-pass').textContent = formData.pass;
      document.getElementById('profile-fphonenumber').textContent = `${formData.phoneCountryCode} ${formData.phoneNumber}`;
      document.getElementById('idea-title-summary').textContent = formData.ideatitle;
      document.getElementById('idea-description-summary').textContent = formData.ideadescription;
      document.getElementById('idea-category-summary').textContent = formData.ideacat;
      document.getElementById('target-user-summary').textContent = formData.targetuser;
      document.getElementById('idea-duration-summary').textContent = formData.ideaduration;
      document.getElementById('problem-statement-summary').textContent = formData.problemstatement;
      document.getElementById('solution-summary').textContent = formData.solution;
      document.getElementById('model-summary').textContent = formData.model;
      document.getElementById('swot-summary').textContent = formData.swot;
    }
  }
  
  
  document.querySelector('.download-btn').addEventListener('click', function(event) {
    event.preventDefault(); 
    downloadReport();
  });
  
  document.querySelector('.home-btn').addEventListener('click', function(event) {
    event.preventDefault(); 
    goHome();
  });
    document.querySelector('.submit-btn').addEventListener('click', (e) => {
    e.preventDefault(); 
    grabFormData(); 
    populateStep3(); 
  });


  function saveFormData() {
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const myKadPassport = document.getElementById('pass').value;
    const phoneCountryCode = document.getElementById('phone').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const nationality = document.getElementById('nationality').value;
    
    const ideaTitle = document.getElementById('ideatitle').value;
    const ideaDescription =document.getElementById ('ideadescription').value;
    const ideaDuration = document.getElementById('ideaduration').value;
    const ideaCat = document.getElementById('ideacat').value;
    const targetUser = document.getElementById('targetuser').value;
    const priceMin = document.getElementById('price-min').value;
    const priceMax = document.getElementById('price-max').value;

    const problemStatement= document.getElementById('problemstatement').value;
    const Model= document.getElementById('model').value;
    const Solution= document.getElementById('solution').value;
    const SWOT= document.getElementById('swot').value;
    
    const formData = {
      firstName,
      lastName,
      email,
      myKadPassport,
      phoneCountryCode,
      phoneNumber,
      nationality,
      ideaTitle,
      ideaDescription,
      ideaDuration,
      ideaCat,
      targetUser,
      priceMin,
      priceMax,
      problemStatement,
      Model,
      Solution,
      SWOT
    };
  

  }
  


  function loadSummary() {
    const formData = JSON.parse(localStorage.getItem('formData'));
  
    if (formData) {
      document.getElementById('profile-name').textContent = `${formData.firstName} ${formData.lastName}`;
      document.getElementById('profile-email').textContent = formData.email;
      document.getElementById('profile-pass').textContent = formData.myKadPassport;
      document.getElementById('profile-fphonenumber').textContent = `${formData.phoneCountryCode} ${formData.phoneNumber}`;
      document.getElementById('profile-nationality').textContent = formData.nationality;
      document.getElementById('idea-title-summary').textContent = formData.ideaTitle;
      document.getElementById('idea-description-summary').textContent = formData.ideaDescription;
      document.getElementById('idea-category-summary').textContent = formData.ideaCat;
      document.getElementById('target-user-summary').textContent = formData.targetUser;
      document.getElementById('idea-duration-summary').textContent=formData.ideaDuration;
      document.getElementById('problem-statement-summary').textContent = formData.problemStatement;
      document.getElementById('solution-summary').textContent = formData.Solution;
      document.getElementById('model-summary').textContent = formData.Model;
      document.getElementById('swot-summary').textContent = formData.SWOT;
      document.getElementById('price-range-summary').textContent = `${formData.priceMin} - ${formData.priceMax}`;
    } else {
      console.log('No data found in localStorage.');
    }
  }
  

function navigateForm(step) {
  if (step === 'submit') {
    saveFormData();
    loadSummary();
  }
}

document.querySelector('.submit-btn').addEventListener('click', function(event) {
  event.preventDefault(); 
  navigateForm('submit');
});


function showReport() {
  const formContent = document.querySelectorAll('.form-content');
  formContent.forEach(form => form.classList.remove('active'));
  document.getElementById('form-step-3').classList.add('active');
}

function onFormSubmission() {
  saveFormData();
  showReport();
  loadSummary();
}

document.querySelector('.submit-btn').addEventListener('click', function(event) {
  event.preventDefault(); 
  onFormSubmission(); 
});

function goHome() {
  window.location.href = 'home.html'; 
}


});document.addEventListener("DOMContentLoaded", function() {
  let currentStep = 0;

  const formStep2 = document.getElementById('form-step-2');

  function updateProgress() {
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.form-content');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    const submitButton = document.querySelector('.submit-btn');

    forms.forEach((form, index) => {
        form.style.display = index === currentStep ? 'block' : 'none';
    });

    tabs.forEach((tab, index) => {
        tab.classList.toggle('active', index === currentStep);
        tab.classList.toggle('complete', index < currentStep);
    });

    prevButton.style.display = currentStep === 0 ? 'none' : 'inline-block';
    nextButton.style.display = currentStep === forms.length - 1 ? 'none' : 'inline-block';
    submitButton.style.display = currentStep === forms.length - 2 ? 'inline-block' : 'none'; // Show on the second-to-last form
  }

  function move(direction) {
      const forms = document.querySelectorAll('.form-content');
      if (direction === 'next' && currentStep < forms.length - 1) {
          currentStep++;
      } else if (direction === 'prev' && currentStep > 0) {
          currentStep--;
      } else if (direction === 'submit') {
          currentStep = forms.length - 1;
      }
      updateProgress();
  }

  function validateInputs() {
      const activeForm = document.querySelector('.form-content.active');
      const inputs = activeForm.querySelectorAll('input[required], select[required]');
      const errorMessages = activeForm.querySelectorAll('.error-message');
      let allValid = true;

      inputs.forEach((input, index) => {
          if (!input.value.trim()) {
              allValid = false;
              errorMessages[index].style.display = 'block';
          } else {
              errorMessages[index].style.display = 'none';
          }
      });

      return allValid;
  }

  document.querySelector('.container').addEventListener('click', function(event) {
      if (event.target.classList.contains('next-btn')) {
          event.preventDefault();
          if (validateInputs()) {
              move('next');
          }
      } else if (event.target.classList.contains('prev-btn')) {
          event.preventDefault();
          move('prev');
      } else if (event.target.classList.contains('submit-btn')) {
          event.preventDefault();
          if (validateInputs()) {
              move('submit');
          }
      }
  });

  updateProgress();


  const body = document.querySelector("body"),
        sidebar = body.querySelector(".sidebar"),
        arrow = body.querySelector(".fa-arrow-left-long");

  arrow.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
  });

  const formStep1 = document.getElementById('form-step-1');
  const formStep3 = document.getElementById('form-step-3');

  
  document.getElementById('dropZone').addEventListener('click', function() {
    document.getElementById('fileInput').click();
  });

  document.getElementById('fileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    handleFile(file);
  });

  document.getElementById('dropZone').addEventListener('dragover', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.add('drag-over');
  });

  document.getElementById('dropZone').addEventListener('dragleave', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.remove('drag-over');
  });

  document.getElementById('dropZone').addEventListener('drop', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.remove('drag-over');
    var file = event.dataTransfer.files[0];
    handleFile(file);
  });


  function handleFile(file) {
    var MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    var SUPPORTED_FILE_TYPES = ['application/pdf']; 

    if (!file) {
      alert('No file selected!');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('File is too large. Maximum size is 5MB.');
      return;
    }

    if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
      alert('Unsupported file type. Allowed types are PDF.');
      return;
    }

    document.getElementById('dropZoneText').textContent = 'File selected: ' + file.name;
  }


  window.triggerFileInput = function() {
    event.preventDefault();
    document.getElementById('fileInput').click();
  };



  function grabFormData() {
    const firstName = formStep1.querySelector('#fname').value;
    const lastName = formStep1.querySelector('#lastname').value;
    const email = formStep1.querySelector('#email').value;
    const myKadPassport = formStep1.querySelector('#pass').value;
    const phoneNumber = formStep1.querySelector('#phone-number').value;
    const phoneCountryCode=formStep1.querySelector('#phone').value;
    const nationality = formStep1.querySelector('#nationality').value;
  
    const ideaTitle = formStep2.querySelector('#ideatitle').value;
    const ideaDescription= formStep2.querySelector('#ideadescription').value;
    const ideaCat = formStep2.querySelector('#ideacat').value;
    const targetUser = formStep2.querySelector('#targetuser').value;
    const ideaDuration = formStep2.querySelector('#ideaduration').value;
    const priceMin = formStep2.querySelector('#price-min').value;
    const priceMax = formStep2.querySelector('#price-max').value;

    const problemStatement= formStep3.querySelector('#problemstatement').value;
    const Solution= formStep3.querySelector('#solution').value;
    const Model=formStep3.querySelector('#model').value;
    const SWOT= formStep3.querySelector('#swot').value;
  
    localStorage.setItem('formData', JSON.stringify({
      firstName,
      lastName,
      email,
      myKadPassport,
      phoneCountryCode,
      phoneNumber,
      nationality,
      ideaTitle,
      ideaDescription,
      ideaCat,
      targetUser,
      ideaDuration,
      priceMin,
      priceMax,
      problemStatement,
      Solution,
      Model,
      SWOT
    }));
  }
  
  function populateStep3() {
    const formData = JSON.parse(localStorage.getItem('formData2'));
  
    if (formData) {
      document.getElementById('profile-name').textContent = `${formData.firstName} ${formData.lastName}`;
      document.getElementById('profile-email').textContent = formData.email;
      document.getElementById('profile-pass').textContent = formData.pass;
      document.getElementById('profile-fphonenumber').textContent = `${formData.phoneCountryCode} ${formData.phoneNumber}`;
      document.getElementById('idea-title-summary').textContent = formData.ideatitle;
      document.getElementById('idea-description-summary').textContent = formData.ideadescription;
      document.getElementById('idea-category-summary').textContent = formData.ideacat;
      document.getElementById('target-user-summary').textContent = formData.targetuser;
      document.getElementById('idea-duration-summary').textContent = formData.ideaduration;
      document.getElementById('problem-statement-summary').textContent = formData.problemstatement;
      document.getElementById('solution-summary').textContent = formData.solution;
      document.getElementById('model-summary').textContent = formData.model;
      document.getElementById('swot-summary').textContent = formData.swot;
    }
  }
  
  
  document.querySelector('.download-btn').addEventListener('click', function(event) {
    event.preventDefault(); 
    downloadReport();
  });
  
  document.querySelector('.home-btn').addEventListener('click', function(event) {
    event.preventDefault(); 
    goHome();
  });
    document.querySelector('.submit-btn').addEventListener('click', (e) => {
    e.preventDefault(); 
    grabFormData(); 
    populateStep3(); 
  });


  function saveFormData() {
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const myKadPassport = document.getElementById('pass').value;
    const phoneCountryCode = document.getElementById('phone').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const nationality = document.getElementById('nationality').value;
    
    const ideaTitle = document.getElementById('ideatitle').value;
    const ideaDescription =document.getElementById ('ideadescription').value;
    const ideaDuration = document.getElementById('ideaduration').value;
    const ideaCat = document.getElementById('ideacat').value;
    const targetUser = document.getElementById('targetuser').value;
    const priceMin = document.getElementById('price-min').value;
    const priceMax = document.getElementById('price-max').value;

    const problemStatement= document.getElementById('problemstatement').value;
    const Model= document.getElementById('model').value;
    const Solution= document.getElementById('solution').value;
    const SWOT= document.getElementById('swot').value;
    
    const formData = {
      firstName,
      lastName,
      email,
      myKadPassport,
      phoneCountryCode,
      phoneNumber,
      nationality,
      ideaTitle,
      ideaDescription,
      ideaDuration,
      ideaCat,
      targetUser,
      priceMin,
      priceMax,
      problemStatement,
      Model,
      Solution,
      SWOT
    };
  

  }
  


  function loadSummary() {
    const formData = JSON.parse(localStorage.getItem('formData'));
  
    if (formData) {
      document.getElementById('profile-name').textContent = `${formData.firstName} ${formData.lastName}`;
      document.getElementById('profile-email').textContent = formData.email;
      document.getElementById('profile-pass').textContent = formData.myKadPassport;
      document.getElementById('profile-fphonenumber').textContent = `${formData.phoneCountryCode} ${formData.phoneNumber}`;
      document.getElementById('profile-nationality').textContent = formData.nationality;
      document.getElementById('idea-title-summary').textContent = formData.ideaTitle;
      document.getElementById('idea-description-summary').textContent = formData.ideaDescription;
      document.getElementById('idea-category-summary').textContent = formData.ideaCat;
      document.getElementById('target-user-summary').textContent = formData.targetUser;
      document.getElementById('idea-duration-summary').textContent=formData.ideaDuration;
      document.getElementById('problem-statement-summary').textContent = formData.problemStatement;
      document.getElementById('solution-summary').textContent = formData.Solution;
      document.getElementById('model-summary').textContent = formData.Model;
      document.getElementById('swot-summary').textContent = formData.SWOT;
      document.getElementById('price-range-summary').textContent = `${formData.priceMin} - ${formData.priceMax}`;
    } else {
      console.log('No data found in localStorage.');
    }
  }
  

function navigateForm(step) {
  if (step === 'submit') {
    saveFormData();
    loadSummary();
  }
}

document.querySelector('.submit-btn').addEventListener('click', function(event) {
  event.preventDefault(); 
  navigateForm('submit');
});


function showReport() {
  const formContent = document.querySelectorAll('.form-content');
  formContent.forEach(form => form.classList.remove('active'));
  document.getElementById('form-step-3').classList.add('active');
}

function onFormSubmission() {
  saveFormData();
  showReport();
  loadSummary();
}

document.querySelector('.submit-btn').addEventListener('click', function(event) {
  event.preventDefault(); 
  onFormSubmission(); 
});

function goHome() {
  window.location.href = 'home.html'; 
}


});document.addEventListener("DOMContentLoaded", function() {
  let currentStep = 0;

  const formStep2 = document.getElementById('form-step-2');

  function updateProgress() {
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.form-content');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    const submitButton = document.querySelector('.submit-btn');

    forms.forEach((form, index) => {
        form.style.display = index === currentStep ? 'block' : 'none';
    });

    tabs.forEach((tab, index) => {
        tab.classList.toggle('active', index === currentStep);
        tab.classList.toggle('complete', index < currentStep);
    });

    prevButton.style.display = currentStep === 0 ? 'none' : 'inline-block';
    nextButton.style.display = currentStep === forms.length - 1 ? 'none' : 'inline-block';
    submitButton.style.display = currentStep === forms.length - 2 ? 'inline-block' : 'none'; // Show on the second-to-last form
  }

  function move(direction) {
      const forms = document.querySelectorAll('.form-content');
      if (direction === 'next' && currentStep < forms.length - 1) {
          currentStep++;
      } else if (direction === 'prev' && currentStep > 0) {
          currentStep--;
      } else if (direction === 'submit') {
          currentStep = forms.length - 1;
      }
      updateProgress();
  }

  function validateInputs() {
      const activeForm = document.querySelector('.form-content.active');
      const inputs = activeForm.querySelectorAll('input[required], select[required]');
      const errorMessages = activeForm.querySelectorAll('.error-message');
      let allValid = true;

      inputs.forEach((input, index) => {
          if (!input.value.trim()) {
              allValid = false;
              errorMessages[index].style.display = 'block';
          } else {
              errorMessages[index].style.display = 'none';
          }
      });

      return allValid;
  }

  document.querySelector('.container').addEventListener('click', function(event) {
      if (event.target.classList.contains('next-btn')) {
          event.preventDefault();
          if (validateInputs()) {
              move('next');
          }
      } else if (event.target.classList.contains('prev-btn')) {
          event.preventDefault();
          move('prev');
      } else if (event.target.classList.contains('submit-btn')) {
          event.preventDefault();
          if (validateInputs()) {
              move('submit');
          }
      }
  });

  updateProgress();


  const body = document.querySelector("body"),
        sidebar = body.querySelector(".sidebar"),
        arrow = body.querySelector(".fa-arrow-left-long");

  arrow.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
  });

  const formStep1 = document.getElementById('form-step-1');
  const formStep3 = document.getElementById('form-step-3');

  
  document.getElementById('dropZone').addEventListener('click', function() {
    document.getElementById('fileInput').click();
  });

  document.getElementById('fileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    handleFile(file);
  });

  document.getElementById('dropZone').addEventListener('dragover', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.add('drag-over');
  });

  document.getElementById('dropZone').addEventListener('dragleave', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.remove('drag-over');
  });

  document.getElementById('dropZone').addEventListener('drop', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.remove('drag-over');
    var file = event.dataTransfer.files[0];
    handleFile(file);
  });


  function handleFile(file) {
    var MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    var SUPPORTED_FILE_TYPES = ['application/pdf']; 

    if (!file) {
      alert('No file selected!');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('File is too large. Maximum size is 5MB.');
      return;
    }

    if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
      alert('Unsupported file type. Allowed types are PDF.');
      return;
    }

    document.getElementById('dropZoneText').textContent = 'File selected: ' + file.name;
  }


  window.triggerFileInput = function() {
    event.preventDefault();
    document.getElementById('fileInput').click();
  };



  function grabFormData() {
    const firstName = formStep1.querySelector('#fname').value;
    const lastName = formStep1.querySelector('#lastname').value;
    const email = formStep1.querySelector('#email').value;
    const myKadPassport = formStep1.querySelector('#pass').value;
    const phoneNumber = formStep1.querySelector('#phone-number').value;
    const phoneCountryCode=formStep1.querySelector('#phone').value;
    const nationality = formStep1.querySelector('#nationality').value;
  
    const ideaTitle = formStep2.querySelector('#ideatitle').value;
    const ideaDescription= formStep2.querySelector('#ideadescription').value;
    const ideaCat = formStep2.querySelector('#ideacat').value;
    const targetUser = formStep2.querySelector('#targetuser').value;
    const ideaDuration = formStep2.querySelector('#ideaduration').value;
    const priceMin = formStep2.querySelector('#price-min').value;
    const priceMax = formStep2.querySelector('#price-max').value;

    const problemStatement= formStep3.querySelector('#problemstatement').value;
    const Solution= formStep3.querySelector('#solution').value;
    const Model=formStep3.querySelector('#model').value;
    const SWOT= formStep3.querySelector('#swot').value;
  
    localStorage.setItem('formData', JSON.stringify({
      firstName,
      lastName,
      email,
      myKadPassport,
      phoneCountryCode,
      phoneNumber,
      nationality,
      ideaTitle,
      ideaDescription,
      ideaCat,
      targetUser,
      ideaDuration,
      priceMin,
      priceMax,
      problemStatement,
      Solution,
      Model,
      SWOT
    }));
  }
  
  function populateStep3() {
    const formData = JSON.parse(localStorage.getItem('formData2'));
  
    if (formData) {
      document.getElementById('profile-name').textContent = `${formData.firstName} ${formData.lastName}`;
      document.getElementById('profile-email').textContent = formData.email;
      document.getElementById('profile-pass').textContent = formData.pass;
      document.getElementById('profile-fphonenumber').textContent = `${formData.phoneCountryCode} ${formData.phoneNumber}`;
      document.getElementById('idea-title-summary').textContent = formData.ideatitle;
      document.getElementById('idea-description-summary').textContent = formData.ideadescription;
      document.getElementById('idea-category-summary').textContent = formData.ideacat;
      document.getElementById('target-user-summary').textContent = formData.targetuser;
      document.getElementById('idea-duration-summary').textContent = formData.ideaduration;
      document.getElementById('problem-statement-summary').textContent = formData.problemstatement;
      document.getElementById('solution-summary').textContent = formData.solution;
      document.getElementById('model-summary').textContent = formData.model;
      document.getElementById('swot-summary').textContent = formData.swot;
    }
  }
  
  
  document.querySelector('.download-btn').addEventListener('click', function(event) {
    event.preventDefault(); 
    downloadReport();
  });
  
  document.querySelector('.home-btn').addEventListener('click', function(event) {
    event.preventDefault(); 
    goHome();
  });
    document.querySelector('.submit-btn').addEventListener('click', (e) => {
    e.preventDefault(); 
    grabFormData(); 
    populateStep3(); 
  });


  function saveFormData() {
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const myKadPassport = document.getElementById('pass').value;
    const phoneCountryCode = document.getElementById('phone').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const nationality = document.getElementById('nationality').value;
    
    const ideaTitle = document.getElementById('ideatitle').value;
    const ideaDescription =document.getElementById ('ideadescription').value;
    const ideaDuration = document.getElementById('ideaduration').value;
    const ideaCat = document.getElementById('ideacat').value;
    const targetUser = document.getElementById('targetuser').value;
    const priceMin = document.getElementById('price-min').value;
    const priceMax = document.getElementById('price-max').value;

    const problemStatement= document.getElementById('problemstatement').value;
    const Model= document.getElementById('model').value;
    const Solution= document.getElementById('solution').value;
    const SWOT= document.getElementById('swot').value;
    
    const formData = {
      firstName,
      lastName,
      email,
      myKadPassport,
      phoneCountryCode,
      phoneNumber,
      nationality,
      ideaTitle,
      ideaDescription,
      ideaDuration,
      ideaCat,
      targetUser,
      priceMin,
      priceMax,
      problemStatement,
      Model,
      Solution,
      SWOT
    };
  

  }
  


  function loadSummary() {
    const formData = JSON.parse(localStorage.getItem('formData'));
  
    if (formData) {
      document.getElementById('profile-name').textContent = `${formData.firstName} ${formData.lastName}`;
      document.getElementById('profile-email').textContent = formData.email;
      document.getElementById('profile-pass').textContent = formData.myKadPassport;
      document.getElementById('profile-fphonenumber').textContent = `${formData.phoneCountryCode} ${formData.phoneNumber}`;
      document.getElementById('profile-nationality').textContent = formData.nationality;
      document.getElementById('idea-title-summary').textContent = formData.ideaTitle;
      document.getElementById('idea-description-summary').textContent = formData.ideaDescription;
      document.getElementById('idea-category-summary').textContent = formData.ideaCat;
      document.getElementById('target-user-summary').textContent = formData.targetUser;
      document.getElementById('idea-duration-summary').textContent=formData.ideaDuration;
      document.getElementById('problem-statement-summary').textContent = formData.problemStatement;
      document.getElementById('solution-summary').textContent = formData.Solution;
      document.getElementById('model-summary').textContent = formData.Model;
      document.getElementById('swot-summary').textContent = formData.SWOT;
      document.getElementById('price-range-summary').textContent = `${formData.priceMin} - ${formData.priceMax}`;
    } else {
      console.log('No data found in localStorage.');
    }
  }
  

function navigateForm(step) {
  if (step === 'submit') {
    saveFormData();
    loadSummary();
  }
}

document.querySelector('.submit-btn').addEventListener('click', function(event) {
  event.preventDefault(); 
  navigateForm('submit');
});


function showReport() {
  const formContent = document.querySelectorAll('.form-content');
  formContent.forEach(form => form.classList.remove('active'));
  document.getElementById('form-step-3').classList.add('active');
}

function onFormSubmission() {
  saveFormData();
  showReport();
  loadSummary();
}

document.querySelector('.submit-btn').addEventListener('click', function(event) {
  event.preventDefault(); 
  onFormSubmission(); 
});

function goHome() {
  window.location.href = 'home.html'; 
}


});document.addEventListener("DOMContentLoaded", function() {
  let currentStep = 0;

  const formStep2 = document.getElementById('form-step-2');

  function updateProgress() {
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.form-content');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    const submitButton = document.querySelector('.submit-btn');

    forms.forEach((form, index) => {
        form.style.display = index === currentStep ? 'block' : 'none';
    });

    tabs.forEach((tab, index) => {
        tab.classList.toggle('active', index === currentStep);
        tab.classList.toggle('complete', index < currentStep);
    });

    prevButton.style.display = currentStep === 0 ? 'none' : 'inline-block';
    nextButton.style.display = currentStep === forms.length - 1 ? 'none' : 'inline-block';
    submitButton.style.display = currentStep === forms.length - 2 ? 'inline-block' : 'none'; // Show on the second-to-last form
  }

  function move(direction) {
      const forms = document.querySelectorAll('.form-content');
      if (direction === 'next' && currentStep < forms.length - 1) {
          currentStep++;
      } else if (direction === 'prev' && currentStep > 0) {
          currentStep--;
      } else if (direction === 'submit') {
          currentStep = forms.length - 1;
      }
      updateProgress();
  }

  function validateInputs() {
      const activeForm = document.querySelector('.form-content.active');
      const inputs = activeForm.querySelectorAll('input[required], select[required]');
      const errorMessages = activeForm.querySelectorAll('.error-message');
      let allValid = true;

      inputs.forEach((input, index) => {
          if (!input.value.trim()) {
              allValid = false;
              errorMessages[index].style.display = 'block';
          } else {
              errorMessages[index].style.display = 'none';
          }
      });

      return allValid;
  }

  document.querySelector('.container').addEventListener('click', function(event) {
      if (event.target.classList.contains('next-btn')) {
          event.preventDefault();
          if (validateInputs()) {
              move('next');
          }
      } else if (event.target.classList.contains('prev-btn')) {
          event.preventDefault();
          move('prev');
      } else if (event.target.classList.contains('submit-btn')) {
          event.preventDefault();
          if (validateInputs()) {
              move('submit');
          }
      }
  });

  updateProgress();


  const body = document.querySelector("body"),
        sidebar = body.querySelector(".sidebar"),
        arrow = body.querySelector(".fa-arrow-left-long");

  arrow.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
  });

  const formStep1 = document.getElementById('form-step-1');
  const formStep3 = document.getElementById('form-step-3');

  
  document.getElementById('dropZone').addEventListener('click', function() {
    document.getElementById('fileInput').click();
  });

  document.getElementById('fileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    handleFile(file);
  });

  document.getElementById('dropZone').addEventListener('dragover', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.add('drag-over');
  });

  document.getElementById('dropZone').addEventListener('dragleave', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.remove('drag-over');
  });

  document.getElementById('dropZone').addEventListener('drop', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.remove('drag-over');
    var file = event.dataTransfer.files[0];
    handleFile(file);
  });


  function handleFile(file) {
    var MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    var SUPPORTED_FILE_TYPES = ['application/pdf']; 

    if (!file) {
      alert('No file selected!');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('File is too large. Maximum size is 5MB.');
      return;
    }

    if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
      alert('Unsupported file type. Allowed types are PDF.');
      return;
    }

    document.getElementById('dropZoneText').textContent = 'File selected: ' + file.name;
  }


  window.triggerFileInput = function() {
    event.preventDefault();
    document.getElementById('fileInput').click();
  };



  function grabFormData() {
    const firstName = formStep1.querySelector('#fname').value;
    const lastName = formStep1.querySelector('#lastname').value;
    const email = formStep1.querySelector('#email').value;
    const myKadPassport = formStep1.querySelector('#pass').value;
    const phoneNumber = formStep1.querySelector('#phone-number').value;
    const phoneCountryCode=formStep1.querySelector('#phone').value;
    const nationality = formStep1.querySelector('#nationality').value;
  
    const ideaTitle = formStep2.querySelector('#ideatitle').value;
    const ideaDescription= formStep2.querySelector('#ideadescription').value;
    const ideaCat = formStep2.querySelector('#ideacat').value;
    const targetUser = formStep2.querySelector('#targetuser').value;
    const ideaDuration = formStep2.querySelector('#ideaduration').value;
    const priceMin = formStep2.querySelector('#price-min').value;
    const priceMax = formStep2.querySelector('#price-max').value;

    const problemStatement= formStep3.querySelector('#problemstatement').value;
    const Solution= formStep3.querySelector('#solution').value;
    const Model=formStep3.querySelector('#model').value;
    const SWOT= formStep3.querySelector('#swot').value;
  
    localStorage.setItem('formData', JSON.stringify({
      firstName,
      lastName,
      email,
      myKadPassport,
      phoneCountryCode,
      phoneNumber,
      nationality,
      ideaTitle,
      ideaDescription,
      ideaCat,
      targetUser,
      ideaDuration,
      priceMin,
      priceMax,
      problemStatement,
      Solution,
      Model,
      SWOT
    }));
  }
  
  function populateStep3() {
    const formData = JSON.parse(localStorage.getItem('formData2'));
  
    if (formData) {
      document.getElementById('profile-name').textContent = `${formData.firstName} ${formData.lastName}`;
      document.getElementById('profile-email').textContent = formData.email;
      document.getElementById('profile-pass').textContent = formData.pass;
      document.getElementById('profile-fphonenumber').textContent = `${formData.phoneCountryCode} ${formData.phoneNumber}`;
      document.getElementById('idea-title-summary').textContent = formData.ideatitle;
      document.getElementById('idea-description-summary').textContent = formData.ideadescription;
      document.getElementById('idea-category-summary').textContent = formData.ideacat;
      document.getElementById('target-user-summary').textContent = formData.targetuser;
      document.getElementById('idea-duration-summary').textContent = formData.ideaduration;
      document.getElementById('problem-statement-summary').textContent = formData.problemstatement;
      document.getElementById('solution-summary').textContent = formData.solution;
      document.getElementById('model-summary').textContent = formData.model;
      document.getElementById('swot-summary').textContent = formData.swot;
    }
  }
  
  
  document.querySelector('.download-btn').addEventListener('click', function(event) {
    event.preventDefault(); 
    downloadReport();
  });
  
  document.querySelector('.home-btn').addEventListener('click', function(event) {
    event.preventDefault(); 
    goHome();
  });
    document.querySelector('.submit-btn').addEventListener('click', (e) => {
    e.preventDefault(); 
    grabFormData(); 
    populateStep3(); 
  });


  function saveFormData() {
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const myKadPassport = document.getElementById('pass').value;
    const phoneCountryCode = document.getElementById('phone').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const nationality = document.getElementById('nationality').value;
    
    const ideaTitle = document.getElementById('ideatitle').value;
    const ideaDescription =document.getElementById ('ideadescription').value;
    const ideaDuration = document.getElementById('ideaduration').value;
    const ideaCat = document.getElementById('ideacat').value;
    const targetUser = document.getElementById('targetuser').value;
    const priceMin = document.getElementById('price-min').value;
    const priceMax = document.getElementById('price-max').value;

    const problemStatement= document.getElementById('problemstatement').value;
    const Model= document.getElementById('model').value;
    const Solution= document.getElementById('solution').value;
    const SWOT= document.getElementById('swot').value;
    
    const formData = {
      firstName,
      lastName,
      email,
      myKadPassport,
      phoneCountryCode,
      phoneNumber,
      nationality,
      ideaTitle,
      ideaDescription,
      ideaDuration,
      ideaCat,
      targetUser,
      priceMin,
      priceMax,
      problemStatement,
      Model,
      Solution,
      SWOT
    };
  

  }
  


  function loadSummary() {
    const formData = JSON.parse(localStorage.getItem('formData'));
  
    if (formData) {
      document.getElementById('profile-name').textContent = `${formData.firstName} ${formData.lastName}`;
      document.getElementById('profile-email').textContent = formData.email;
      document.getElementById('profile-pass').textContent = formData.myKadPassport;
      document.getElementById('profile-fphonenumber').textContent = `${formData.phoneCountryCode} ${formData.phoneNumber}`;
      document.getElementById('profile-nationality').textContent = formData.nationality;
      document.getElementById('idea-title-summary').textContent = formData.ideaTitle;
      document.getElementById('idea-description-summary').textContent = formData.ideaDescription;
      document.getElementById('idea-category-summary').textContent = formData.ideaCat;
      document.getElementById('target-user-summary').textContent = formData.targetUser;
      document.getElementById('idea-duration-summary').textContent=formData.ideaDuration;
      document.getElementById('problem-statement-summary').textContent = formData.problemStatement;
      document.getElementById('solution-summary').textContent = formData.Solution;
      document.getElementById('model-summary').textContent = formData.Model;
      document.getElementById('swot-summary').textContent = formData.SWOT;
      document.getElementById('price-range-summary').textContent = `${formData.priceMin} - ${formData.priceMax}`;
    } else {
      console.log('No data found in localStorage.');
    }
  }
  

function navigateForm(step) {
  if (step === 'submit') {
    saveFormData();
    loadSummary();
  }
}

document.querySelector('.submit-btn').addEventListener('click', function(event) {
  event.preventDefault(); 
  navigateForm('submit');
});


function showReport() {
  const formContent = document.querySelectorAll('.form-content');
  formContent.forEach(form => form.classList.remove('active'));
  document.getElementById('form-step-3').classList.add('active');
}

function onFormSubmission() {
  saveFormData();
  showReport();
  loadSummary();
}

document.querySelector('.submit-btn').addEventListener('click', function(event) {
  event.preventDefault(); 
  onFormSubmission(); 
});

function goHome() {
  window.location.href = 'home.html'; 
}


});document.addEventListener("DOMContentLoaded", function() {
  let currentStep = 0;

  const formStep2 = document.getElementById('form-step-2');

  function updateProgress() {
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.form-content');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    const submitButton = document.querySelector('.submit-btn');

    forms.forEach((form, index) => {
        form.style.display = index === currentStep ? 'block' : 'none';
    });

    tabs.forEach((tab, index) => {
        tab.classList.toggle('active', index === currentStep);
        tab.classList.toggle('complete', index < currentStep);
    });

    prevButton.style.display = currentStep === 0 ? 'none' : 'inline-block';
    nextButton.style.display = currentStep === forms.length - 1 ? 'none' : 'inline-block';
    submitButton.style.display = currentStep === forms.length - 2 ? 'inline-block' : 'none'; // Show on the second-to-last form
  }

  function move(direction) {
      const forms = document.querySelectorAll('.form-content');
      if (direction === 'next' && currentStep < forms.length - 1) {
          currentStep++;
      } else if (direction === 'prev' && currentStep > 0) {
          currentStep--;
      } else if (direction === 'submit') {
          currentStep = forms.length - 1;
      }
      updateProgress();
  }

  function validateInputs() {
      const activeForm = document.querySelector('.form-content.active');
      const inputs = activeForm.querySelectorAll('input[required], select[required]');
      const errorMessages = activeForm.querySelectorAll('.error-message');
      let allValid = true;

      inputs.forEach((input, index) => {
          if (!input.value.trim()) {
              allValid = false;
              errorMessages[index].style.display = 'block';
          } else {
              errorMessages[index].style.display = 'none';
          }
      });

      return allValid;
  }

  document.querySelector('.container').addEventListener('click', function(event) {
      if (event.target.classList.contains('next-btn')) {
          event.preventDefault();
          if (validateInputs()) {
              move('next');
          }
      } else if (event.target.classList.contains('prev-btn')) {
          event.preventDefault();
          move('prev');
      } else if (event.target.classList.contains('submit-btn')) {
          event.preventDefault();
          if (validateInputs()) {
              move('submit');
          }
      }
  });

  updateProgress();


  const body = document.querySelector("body"),
        sidebar = body.querySelector(".sidebar"),
        arrow = body.querySelector(".fa-arrow-left-long");

  arrow.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
  });

  const formStep1 = document.getElementById('form-step-1');
  const formStep3 = document.getElementById('form-step-3');

  
  document.getElementById('dropZone').addEventListener('click', function() {
    document.getElementById('fileInput').click();
  });

  document.getElementById('fileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    handleFile(file);
  });

  document.getElementById('dropZone').addEventListener('dragover', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.add('drag-over');
  });

  document.getElementById('dropZone').addEventListener('dragleave', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.remove('drag-over');
  });

  document.getElementById('dropZone').addEventListener('drop', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.remove('drag-over');
    var file = event.dataTransfer.files[0];
    handleFile(file);
  });


  function handleFile(file) {
    var MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    var SUPPORTED_FILE_TYPES = ['application/pdf']; 

    if (!file) {
      alert('No file selected!');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('File is too large. Maximum size is 5MB.');
      return;
    }

    if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
      alert('Unsupported file type. Allowed types are PDF.');
      return;
    }

    document.getElementById('dropZoneText').textContent = 'File selected: ' + file.name;
  }


  window.triggerFileInput = function() {
    event.preventDefault();
    document.getElementById('fileInput').click();
  };



  function grabFormData() {
    const firstName = formStep1.querySelector('#fname').value;
    const lastName = formStep1.querySelector('#lastname').value;
    const email = formStep1.querySelector('#email').value;
    const myKadPassport = formStep1.querySelector('#pass').value;
    const phoneNumber = formStep1.querySelector('#phone-number').value;
    const phoneCountryCode=formStep1.querySelector('#phone').value;
    const nationality = formStep1.querySelector('#nationality').value;
  
    const ideaTitle = formStep2.querySelector('#ideatitle').value;
    const ideaDescription= formStep2.querySelector('#ideadescription').value;
    const ideaCat = formStep2.querySelector('#ideacat').value;
    const targetUser = formStep2.querySelector('#targetuser').value;
    const ideaDuration = formStep2.querySelector('#ideaduration').value;
    const priceMin = formStep2.querySelector('#price-min').value;
    const priceMax = formStep2.querySelector('#price-max').value;

    const problemStatement= formStep3.querySelector('#problemstatement').value;
    const Solution= formStep3.querySelector('#solution').value;
    const Model=formStep3.querySelector('#model').value;
    const SWOT= formStep3.querySelector('#swot').value;
  
    localStorage.setItem('formData', JSON.stringify({
      firstName,
      lastName,
      email,
      myKadPassport,
      phoneCountryCode,
      phoneNumber,
      nationality,
      ideaTitle,
      ideaDescription,
      ideaCat,
      targetUser,
      ideaDuration,
      priceMin,
      priceMax,
      problemStatement,
      Solution,
      Model,
      SWOT
    }));
  }
  
  function populateStep3() {
    const formData = JSON.parse(localStorage.getItem('formData2'));
  
    if (formData) {
      document.getElementById('profile-name').textContent = `${formData.firstName} ${formData.lastName}`;
      document.getElementById('profile-email').textContent = formData.email;
      document.getElementById('profile-pass').textContent = formData.pass;
      document.getElementById('profile-fphonenumber').textContent = `${formData.phoneCountryCode} ${formData.phoneNumber}`;
      document.getElementById('idea-title-summary').textContent = formData.ideatitle;
      document.getElementById('idea-description-summary').textContent = formData.ideadescription;
      document.getElementById('idea-category-summary').textContent = formData.ideacat;
      document.getElementById('target-user-summary').textContent = formData.targetuser;
      document.getElementById('idea-duration-summary').textContent = formData.ideaduration;
      document.getElementById('problem-statement-summary').textContent = formData.problemstatement;
      document.getElementById('solution-summary').textContent = formData.solution;
      document.getElementById('model-summary').textContent = formData.model;
      document.getElementById('swot-summary').textContent = formData.swot;
    }
  }
  
  
  document.querySelector('.download-btn').addEventListener('click', function(event) {
    event.preventDefault(); 
    downloadReport();
  });
  
  document.querySelector('.home-btn').addEventListener('click', function(event) {
    event.preventDefault(); 
    goHome();
  });
    document.querySelector('.submit-btn').addEventListener('click', (e) => {
    e.preventDefault(); 
    grabFormData(); 
    populateStep3(); 
  });


  function saveFormData() {
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const myKadPassport = document.getElementById('pass').value;
    const phoneCountryCode = document.getElementById('phone').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const nationality = document.getElementById('nationality').value;
    
    const ideaTitle = document.getElementById('ideatitle').value;
    const ideaDescription =document.getElementById ('ideadescription').value;
    const ideaDuration = document.getElementById('ideaduration').value;
    const ideaCat = document.getElementById('ideacat').value;
    const targetUser = document.getElementById('targetuser').value;
    const priceMin = document.getElementById('price-min').value;
    const priceMax = document.getElementById('price-max').value;

    const problemStatement= document.getElementById('problemstatement').value;
    const Model= document.getElementById('model').value;
    const Solution= document.getElementById('solution').value;
    const SWOT= document.getElementById('swot').value;
    
    const formData = {
      firstName,
      lastName,
      email,
      myKadPassport,
      phoneCountryCode,
      phoneNumber,
      nationality,
      ideaTitle,
      ideaDescription,
      ideaDuration,
      ideaCat,
      targetUser,
      priceMin,
      priceMax,
      problemStatement,
      Model,
      Solution,
      SWOT
    };
  

  }
  


  function loadSummary() {
    const formData = JSON.parse(localStorage.getItem('formData'));
  
    if (formData) {
      document.getElementById('profile-name').textContent = `${formData.firstName} ${formData.lastName}`;
      document.getElementById('profile-email').textContent = formData.email;
      document.getElementById('profile-pass').textContent = formData.myKadPassport;
      document.getElementById('profile-fphonenumber').textContent = `${formData.phoneCountryCode} ${formData.phoneNumber}`;
      document.getElementById('profile-nationality').textContent = formData.nationality;
      document.getElementById('idea-title-summary').textContent = formData.ideaTitle;
      document.getElementById('idea-description-summary').textContent = formData.ideaDescription;
      document.getElementById('idea-category-summary').textContent = formData.ideaCat;
      document.getElementById('target-user-summary').textContent = formData.targetUser;
      document.getElementById('idea-duration-summary').textContent=formData.ideaDuration;
      document.getElementById('problem-statement-summary').textContent = formData.problemStatement;
      document.getElementById('solution-summary').textContent = formData.Solution;
      document.getElementById('model-summary').textContent = formData.Model;
      document.getElementById('swot-summary').textContent = formData.SWOT;
      document.getElementById('price-range-summary').textContent = `${formData.priceMin} - ${formData.priceMax}`;
    } else {
      console.log('No data found in localStorage.');
    }
  }
  

function navigateForm(step) {
  if (step === 'submit') {
    saveFormData();
    loadSummary();
  }
}

document.querySelector('.submit-btn').addEventListener('click', function(event) {
  event.preventDefault(); 
  navigateForm('submit');
});


function showReport() {
  const formContent = document.querySelectorAll('.form-content');
  formContent.forEach(form => form.classList.remove('active'));
  document.getElementById('form-step-3').classList.add('active');
}

function onFormSubmission() {
  saveFormData();
  showReport();
  loadSummary();
}

document.querySelector('.submit-btn').addEventListener('click', function(event) {
  event.preventDefault(); 
  onFormSubmission(); 
});

function goHome() {
  window.location.href = 'home.html'; 
}


});document.addEventListener("DOMContentLoaded", function() {
  let currentStep = 0;

  const formStep2 = document.getElementById('form-step-2');

  function updateProgress() {
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.form-content');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    const submitButton = document.querySelector('.submit-btn');

    forms.forEach((form, index) => {
        form.style.display = index === currentStep ? 'block' : 'none';
    });

    tabs.forEach((tab, index) => {
        tab.classList.toggle('active', index === currentStep);
        tab.classList.toggle('complete', index < currentStep);
    });

    prevButton.style.display = currentStep === 0 ? 'none' : 'inline-block';
    nextButton.style.display = currentStep === forms.length - 1 ? 'none' : 'inline-block';
    submitButton.style.display = currentStep === forms.length - 2 ? 'inline-block' : 'none'; // Show on the second-to-last form
  }

  function move(direction) {
      const forms = document.querySelectorAll('.form-content');
      if (direction === 'next' && currentStep < forms.length - 1) {
          currentStep++;
      } else if (direction === 'prev' && currentStep > 0) {
          currentStep--;
      } else if (direction === 'submit') {
          currentStep = forms.length - 1;
      }
      updateProgress();
  }

  function validateInputs() {
      const activeForm = document.querySelector('.form-content.active');
      const inputs = activeForm.querySelectorAll('input[required], select[required]');
      const errorMessages = activeForm.querySelectorAll('.error-message');
      let allValid = true;

      inputs.forEach((input, index) => {
          if (!input.value.trim()) {
              allValid = false;
              errorMessages[index].style.display = 'block';
          } else {
              errorMessages[index].style.display = 'none';
          }
      });

      return allValid;
  }

  document.querySelector('.container').addEventListener('click', function(event) {
      if (event.target.classList.contains('next-btn')) {
          event.preventDefault();
          if (validateInputs()) {
              move('next');
          }
      } else if (event.target.classList.contains('prev-btn')) {
          event.preventDefault();
          move('prev');
      } else if (event.target.classList.contains('submit-btn')) {
          event.preventDefault();
          if (validateInputs()) {
              move('submit');
          }
      }
  });

  updateProgress();


  const body = document.querySelector("body"),
        sidebar = body.querySelector(".sidebar"),
        arrow = body.querySelector(".fa-arrow-left-long");

  arrow.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
  });

  const formStep1 = document.getElementById('form-step-1');
  const formStep3 = document.getElementById('form-step-3');

  
  document.getElementById('dropZone').addEventListener('click', function() {
    document.getElementById('fileInput').click();
  });

  document.getElementById('fileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    handleFile(file);
  });

  document.getElementById('dropZone').addEventListener('dragover', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.add('drag-over');
  });

  document.getElementById('dropZone').addEventListener('dragleave', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.remove('drag-over');
  });

  document.getElementById('dropZone').addEventListener('drop', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.remove('drag-over');
    var file = event.dataTransfer.files[0];
    handleFile(file);
  });


  function handleFile(file) {
    var MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    var SUPPORTED_FILE_TYPES = ['application/pdf']; 

    if (!file) {
      alert('No file selected!');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('File is too large. Maximum size is 5MB.');
      return;
    }

    if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
      alert('Unsupported file type. Allowed types are PDF.');
      return;
    }

    document.getElementById('dropZoneText').textContent = 'File selected: ' + file.name;
  }


  window.triggerFileInput = function() {
    event.preventDefault();
    document.getElementById('fileInput').click();
  };



  function grabFormData() {
    const firstName = formStep1.querySelector('#fname').value;
    const lastName = formStep1.querySelector('#lastname').value;
    const email = formStep1.querySelector('#email').value;
    const myKadPassport = formStep1.querySelector('#pass').value;
    const phoneNumber = formStep1.querySelector('#phone-number').value;
    const phoneCountryCode=formStep1.querySelector('#phone').value;
    const nationality = formStep1.querySelector('#nationality').value;
  
    const ideaTitle = formStep2.querySelector('#ideatitle').value;
    const ideaDescription= formStep2.querySelector('#ideadescription').value;
    const ideaCat = formStep2.querySelector('#ideacat').value;
    const targetUser = formStep2.querySelector('#targetuser').value;
    const ideaDuration = formStep2.querySelector('#ideaduration').value;
    const priceMin = formStep2.querySelector('#price-min').value;
    const priceMax = formStep2.querySelector('#price-max').value;

    const problemStatement= formStep3.querySelector('#problemstatement').value;
    const Solution= formStep3.querySelector('#solution').value;
    const Model=formStep3.querySelector('#model').value;
    const SWOT= formStep3.querySelector('#swot').value;
  
    localStorage.setItem('formData', JSON.stringify({
      firstName,
      lastName,
      email,
      myKadPassport,
      phoneCountryCode,
      phoneNumber,
      nationality,
      ideaTitle,
      ideaDescription,
      ideaCat,
      targetUser,
      ideaDuration,
      priceMin,
      priceMax,
      problemStatement,
      Solution,
      Model,
      SWOT
    }));
  }
  
  function populateStep3() {
    const formData = JSON.parse(localStorage.getItem('formData2'));
  
    if (formData) {
      document.getElementById('profile-name').textContent = `${formData.firstName} ${formData.lastName}`;
      document.getElementById('profile-email').textContent = formData.email;
      document.getElementById('profile-pass').textContent = formData.pass;
      document.getElementById('profile-fphonenumber').textContent = `${formData.phoneCountryCode} ${formData.phoneNumber}`;
      document.getElementById('idea-title-summary').textContent = formData.ideatitle;
      document.getElementById('idea-description-summary').textContent = formData.ideadescription;
      document.getElementById('idea-category-summary').textContent = formData.ideacat;
      document.getElementById('target-user-summary').textContent = formData.targetuser;
      document.getElementById('idea-duration-summary').textContent = formData.ideaduration;
      document.getElementById('problem-statement-summary').textContent = formData.problemstatement;
      document.getElementById('solution-summary').textContent = formData.solution;
      document.getElementById('model-summary').textContent = formData.model;
      document.getElementById('swot-summary').textContent = formData.swot;
    }
  }
  
  
  document.querySelector('.download-btn').addEventListener('click', function(event) {
    event.preventDefault(); 
    downloadReport();
  });
  
  document.querySelector('.home-btn').addEventListener('click', function(event) {
    event.preventDefault(); 
    goHome();
  });
    document.querySelector('.submit-btn').addEventListener('click', (e) => {
    e.preventDefault(); 
    grabFormData(); 
    populateStep3(); 
  });


  function saveFormData() {
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const myKadPassport = document.getElementById('pass').value;
    const phoneCountryCode = document.getElementById('phone').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const nationality = document.getElementById('nationality').value;
    
    const ideaTitle = document.getElementById('ideatitle').value;
    const ideaDescription =document.getElementById ('ideadescription').value;
    const ideaDuration = document.getElementById('ideaduration').value;
    const ideaCat = document.getElementById('ideacat').value;
    const targetUser = document.getElementById('targetuser').value;
    const priceMin = document.getElementById('price-min').value;
    const priceMax = document.getElementById('price-max').value;

    const problemStatement= document.getElementById('problemstatement').value;
    const Model= document.getElementById('model').value;
    const Solution= document.getElementById('solution').value;
    const SWOT= document.getElementById('swot').value;
    
    const formData = {
      firstName,
      lastName,
      email,
      myKadPassport,
      phoneCountryCode,
      phoneNumber,
      nationality,
      ideaTitle,
      ideaDescription,
      ideaDuration,
      ideaCat,
      targetUser,
      priceMin,
      priceMax,
      problemStatement,
      Model,
      Solution,
      SWOT
    };
  

  }
  


  function loadSummary() {
    const formData = JSON.parse(localStorage.getItem('formData'));
  
    if (formData) {
      document.getElementById('profile-name').textContent = `${formData.firstName} ${formData.lastName}`;
      document.getElementById('profile-email').textContent = formData.email;
      document.getElementById('profile-pass').textContent = formData.myKadPassport;
      document.getElementById('profile-fphonenumber').textContent = `${formData.phoneCountryCode} ${formData.phoneNumber}`;
      document.getElementById('profile-nationality').textContent = formData.nationality;
      document.getElementById('idea-title-summary').textContent = formData.ideaTitle;
      document.getElementById('idea-description-summary').textContent = formData.ideaDescription;
      document.getElementById('idea-category-summary').textContent = formData.ideaCat;
      document.getElementById('target-user-summary').textContent = formData.targetUser;
      document.getElementById('idea-duration-summary').textContent=formData.ideaDuration;
      document.getElementById('problem-statement-summary').textContent = formData.problemStatement;
      document.getElementById('solution-summary').textContent = formData.Solution;
      document.getElementById('model-summary').textContent = formData.Model;
      document.getElementById('swot-summary').textContent = formData.SWOT;
      document.getElementById('price-range-summary').textContent = `${formData.priceMin} - ${formData.priceMax}`;
    } else {
      console.log('No data found in localStorage.');
    }
  }
  

function navigateForm(step) {
  if (step === 'submit') {
    saveFormData();
    loadSummary();
  }
}

document.querySelector('.submit-btn').addEventListener('click', function(event) {
  event.preventDefault(); 
  navigateForm('submit');
});


function showReport() {
  const formContent = document.querySelectorAll('.form-content');
  formContent.forEach(form => form.classList.remove('active'));
  document.getElementById('form-step-3').classList.add('active');
}

function onFormSubmission() {
  saveFormData();
  showReport();
  loadSummary();
}

document.querySelector('.submit-btn').addEventListener('click', function(event) {
  event.preventDefault(); 
  onFormSubmission(); 
});

function goHome() {
  window.location.href = 'home.html'; 
}


});document.addEventListener("DOMContentLoaded", function() {
  let currentStep = 0;

  const formStep2 = document.getElementById('form-step-2');

  function updateProgress() {
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.form-content');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    const submitButton = document.querySelector('.submit-btn');

    forms.forEach((form, index) => {
        form.style.display = index === currentStep ? 'block' : 'none';
    });

    tabs.forEach((tab, index) => {
        tab.classList.toggle('active', index === currentStep);
        tab.classList.toggle('complete', index < currentStep);
    });

    prevButton.style.display = currentStep === 0 ? 'none' : 'inline-block';
    nextButton.style.display = currentStep === forms.length - 1 ? 'none' : 'inline-block';
    submitButton.style.display = currentStep === forms.length - 2 ? 'inline-block' : 'none'; // Show on the second-to-last form
  }

  function move(direction) {
      const forms = document.querySelectorAll('.form-content');
      if (direction === 'next' && currentStep < forms.length - 1) {
          currentStep++;
      } else if (direction === 'prev' && currentStep > 0) {
          currentStep--;
      } else if (direction === 'submit') {
          currentStep = forms.length - 1;
      }
      updateProgress();
  }

  function validateInputs() {
      const activeForm = document.querySelector('.form-content.active');
      const inputs = activeForm.querySelectorAll('input[required], select[required]');
      const errorMessages = activeForm.querySelectorAll('.error-message');
      let allValid = true;

      inputs.forEach((input, index) => {
          if (!input.value.trim()) {
              allValid = false;
              errorMessages[index].style.display = 'block';
          } else {
              errorMessages[index].style.display = 'none';
          }
      });

      return allValid;
  }

  document.querySelector('.container').addEventListener('click', function(event) {
      if (event.target.classList.contains('next-btn')) {
          event.preventDefault();
          if (validateInputs()) {
              move('next');
          }
      } else if (event.target.classList.contains('prev-btn')) {
          event.preventDefault();
          move('prev');
      } else if (event.target.classList.contains('submit-btn')) {
          event.preventDefault();
          if (validateInputs()) {
              move('submit');
          }
      }
  });

  updateProgress();


  const body = document.querySelector("body"),
        sidebar = body.querySelector(".sidebar"),
        arrow = body.querySelector(".fa-arrow-left-long");

  arrow.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
  });

  const formStep1 = document.getElementById('form-step-1');
  const formStep3 = document.getElementById('form-step-3');

  
  document.getElementById('dropZone').addEventListener('click', function() {
    document.getElementById('fileInput').click();
  });

  document.getElementById('fileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    handleFile(file);
  });

  document.getElementById('dropZone').addEventListener('dragover', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.add('drag-over');
  });

  document.getElementById('dropZone').addEventListener('dragleave', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.remove('drag-over');
  });

  document.getElementById('dropZone').addEventListener('drop', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.remove('drag-over');
    var file = event.dataTransfer.files[0];
    handleFile(file);
  });


  function handleFile(file) {
    var MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    var SUPPORTED_FILE_TYPES = ['application/pdf']; 

    if (!file) {
      alert('No file selected!');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('File is too large. Maximum size is 5MB.');
      return;
    }

    if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
      alert('Unsupported file type. Allowed types are PDF.');
      return;
    }

    document.getElementById('dropZoneText').textContent = 'File selected: ' + file.name;
  }


  window.triggerFileInput = function() {
    event.preventDefault();
    document.getElementById('fileInput').click();
  };



  function grabFormData() {
    const firstName = formStep1.querySelector('#fname').value;
    const lastName = formStep1.querySelector('#lastname').value;
    const email = formStep1.querySelector('#email').value;
    const myKadPassport = formStep1.querySelector('#pass').value;
    const phoneNumber = formStep1.querySelector('#phone-number').value;
    const phoneCountryCode=formStep1.querySelector('#phone').value;
    const nationality = formStep1.querySelector('#nationality').value;
  
    const ideaTitle = formStep2.querySelector('#ideatitle').value;
    const ideaDescription= formStep2.querySelector('#ideadescription').value;
    const ideaCat = formStep2.querySelector('#ideacat').value;
    const targetUser = formStep2.querySelector('#targetuser').value;
    const ideaDuration = formStep2.querySelector('#ideaduration').value;
    const priceMin = formStep2.querySelector('#price-min').value;
    const priceMax = formStep2.querySelector('#price-max').value;

    const problemStatement= formStep3.querySelector('#problemstatement').value;
    const Solution= formStep3.querySelector('#solution').value;
    const Model=formStep3.querySelector('#model').value;
    const SWOT= formStep3.querySelector('#swot').value;
  
    localStorage.setItem('formData', JSON.stringify({
      firstName,
      lastName,
      email,
      myKadPassport,
      phoneCountryCode,
      phoneNumber,
      nationality,
      ideaTitle,
      ideaDescription,
      ideaCat,
      targetUser,
      ideaDuration,
      priceMin,
      priceMax,
      problemStatement,
      Solution,
      Model,
      SWOT
    }));
  }
  
  function populateStep3() {
    const formData = JSON.parse(localStorage.getItem('formData2'));
  
    if (formData) {
      document.getElementById('profile-name').textContent = `${formData.firstName} ${formData.lastName}`;
      document.getElementById('profile-email').textContent = formData.email;
      document.getElementById('profile-pass').textContent = formData.pass;
      document.getElementById('profile-fphonenumber').textContent = `${formData.phoneCountryCode} ${formData.phoneNumber}`;
      document.getElementById('idea-title-summary').textContent = formData.ideatitle;
      document.getElementById('idea-description-summary').textContent = formData.ideadescription;
      document.getElementById('idea-category-summary').textContent = formData.ideacat;
      document.getElementById('target-user-summary').textContent = formData.targetuser;
      document.getElementById('idea-duration-summary').textContent = formData.ideaduration;
      document.getElementById('problem-statement-summary').textContent = formData.problemstatement;
      document.getElementById('solution-summary').textContent = formData.solution;
      document.getElementById('model-summary').textContent = formData.model;
      document.getElementById('swot-summary').textContent = formData.swot;
    }
  }
  
  
  document.querySelector('.download-btn').addEventListener('click', function(event) {
    event.preventDefault(); 
    downloadReport();
  });
  
  document.querySelector('.home-btn').addEventListener('click', function(event) {
    event.preventDefault(); 
    goHome();
  });
    document.querySelector('.submit-btn').addEventListener('click', (e) => {
    e.preventDefault(); 
    grabFormData(); 
    populateStep3(); 
  });


  function saveFormData() {
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const myKadPassport = document.getElementById('pass').value;
    const phoneCountryCode = document.getElementById('phone').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const nationality = document.getElementById('nationality').value;
    
    const ideaTitle = document.getElementById('ideatitle').value;
    const ideaDescription =document.getElementById ('ideadescription').value;
    const ideaDuration = document.getElementById('ideaduration').value;
    const ideaCat = document.getElementById('ideacat').value;
    const targetUser = document.getElementById('targetuser').value;
    const priceMin = document.getElementById('price-min').value;
    const priceMax = document.getElementById('price-max').value;

    const problemStatement= document.getElementById('problemstatement').value;
    const Model= document.getElementById('model').value;
    const Solution= document.getElementById('solution').value;
    const SWOT= document.getElementById('swot').value;
    
    const formData = {
      firstName,
      lastName,
      email,
      myKadPassport,
      phoneCountryCode,
      phoneNumber,
      nationality,
      ideaTitle,
      ideaDescription,
      ideaDuration,
      ideaCat,
      targetUser,
      priceMin,
      priceMax,
      problemStatement,
      Model,
      Solution,
      SWOT
    };
  

  }
  


  function loadSummary() {
    const formData = JSON.parse(localStorage.getItem('formData'));
  
    if (formData) {
      document.getElementById('profile-name').textContent = `${formData.firstName} ${formData.lastName}`;
      document.getElementById('profile-email').textContent = formData.email;
      document.getElementById('profile-pass').textContent = formData.myKadPassport;
      document.getElementById('profile-fphonenumber').textContent = `${formData.phoneCountryCode} ${formData.phoneNumber}`;
      document.getElementById('profile-nationality').textContent = formData.nationality;
      document.getElementById('idea-title-summary').textContent = formData.ideaTitle;
      document.getElementById('idea-description-summary').textContent = formData.ideaDescription;
      document.getElementById('idea-category-summary').textContent = formData.ideaCat;
      document.getElementById('target-user-summary').textContent = formData.targetUser;
      document.getElementById('idea-duration-summary').textContent=formData.ideaDuration;
      document.getElementById('problem-statement-summary').textContent = formData.problemStatement;
      document.getElementById('solution-summary').textContent = formData.Solution;
      document.getElementById('model-summary').textContent = formData.Model;
      document.getElementById('swot-summary').textContent = formData.SWOT;
      document.getElementById('price-range-summary').textContent = `${formData.priceMin} - ${formData.priceMax}`;
    } else {
      console.log('No data found in localStorage.');
    }
  }
  

function navigateForm(step) {
  if (step === 'submit') {
    saveFormData();
    loadSummary();
  }
}

document.querySelector('.submit-btn').addEventListener('click', function(event) {
  event.preventDefault(); 
  navigateForm('submit');
});


function showReport() {
  const formContent = document.querySelectorAll('.form-content');
  formContent.forEach(form => form.classList.remove('active'));
  document.getElementById('form-step-3').classList.add('active');
}

function onFormSubmission() {
  saveFormData();
  showReport();
  loadSummary();
}

document.querySelector('.submit-btn').addEventListener('click', function(event) {
  event.preventDefault(); 
  onFormSubmission(); 
});

function goHome() {
  window.location.href = 'home.html'; 
}


});