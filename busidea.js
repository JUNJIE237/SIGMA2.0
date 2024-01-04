document.addEventListener("DOMContentLoaded", function() {
  let currentStep = 0;

  function updateProgress() {
      const tabs = document.querySelectorAll('.tab');
      const forms = document.querySelectorAll('.form-content');
      const prevButton = document.querySelector('.prev-btn');
      const nextButton = document.querySelector('.next-btn');
      const submitButton = document.querySelector('.submit-btn');
      const formStep1 = document.getElementById('form-step-1');
      const formStep2 = document.getElementById('form-step-2');

      forms.forEach(form => {
          form.style.display = 'none';
      });

      tabs.forEach((tab, index) => {
          if (index < currentStep) {
              tab.classList.add('complete');
              tab.classList.remove('active');
          } else if (index === currentStep) {
              tab.classList.add('active');
              forms[index].style.display = 'block';
          } else {
              tab.classList.remove('complete', 'active');
          }
      });

      if (currentStep === 0) {
          prevButton.style.display = 'none';
          nextButton.style.display = 'inline-block';
          if (submitButton) submitButton.style.display = 'none';
      } else if (currentStep === 1) {
          prevButton.style.display = 'inline-block';
          nextButton.style.display = 'none';
          if (submitButton) submitButton.style.display = 'inline-block';
      } else if (currentStep === 2) {
          if (submitButton) submitButton.style.display = 'none';
      }
  }

  

  function move(direction) {
      const tabs = document.querySelectorAll('.tab');
      if (direction === 'next' && currentStep < tabs.length - 1) {
          currentStep++;
      } else if (direction === 'prev' && currentStep > 0) {
          currentStep--;
      } else if (direction === 'submit') {
          currentStep = 2; 
      }
      updateProgress();
  }

  updateProgress();

  const body = document.querySelector("body"),
        sidebar = body.querySelector(".sidebar"),
        arrow = body.querySelector(".fa-arrow-left-long");

  arrow.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
  });

  const formStep1 = document.getElementById('form-step-1');
  const nextButton = document.querySelector('.next-btn');
  const prevButton = document.querySelector('.prev-btn');
  const submitButton = document.querySelector('.submit-btn');
  const inputs = formStep1.querySelectorAll('input[required], select[required]');
  const errorMessages = formStep1.querySelectorAll('.error-message');

  function validateInputs() {
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

  nextButton.addEventListener('click', function(event) {
      event.preventDefault();
      const isValid = validateInputs();
      if (isValid) {
          move('next');
      }
  });

  prevButton.addEventListener('click', function(event) {
      event.preventDefault();
      move('prev');
  });

  if (submitButton) {
      submitButton.addEventListener('click', function(event) {
          event.preventDefault();
          const isValid = validateInputs();
          if (isValid) {
              move('submit');
          }
      });
  }


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
    document.getElementById('fileInput').click();
  };



  function grabFormData() {
    // Grab all form data
    const firstName = formStep1.querySelector('#fname').value;
    const lastName = formStep1.querySelector('#lastname').value;
    const email = formStep1.querySelector('#email').value;
    const myKadPassport = formStep1.querySelector('#pass').value;
    const phoneNumber = formStep1.querySelector('#phone-number').value;
    const nationality = formStep1.querySelector('#nationality').value;
  
    const ideaTitle = formStep2.querySelector('#idea-title').value;
    const ideaCat = formStep2.getElementById('#ideacat').value;
    const targetUser = formStep2.getElementById('#targetuser').value;
    const priceMin = formStep2.querySelector('#price-min').value;
    const priceMax = formStep2.querySelector('#price-max').value;
  
    // Save to localStorage
    localStorage.setItem('formData', JSON.stringify({
      firstName,
      lastName,
      email,
      myKadPassport,
      phoneNumber,
      nationality,
      ideaTitle,
      ideaCat,
      targetUser,
      priceMin,
      priceMax
    }));
  }
  
  function populateStep3() {
    const formData = JSON.parse(localStorage.getItem('formData'));
  
    if (formData) {
      document.getElementById('profile-name').textContent = `${formData.firstName} ${formData.lastName}`;
      document.getElementById('profile-email').textContent = formData.email;
      document.getElementById('profile-pass').textContent = formData.pass;
      document.getElementById('profile-phone-number').textContent = formData.phone;
      document.getElementById('idea-title-summary').textContent = formData.idea-title;
      document.getElementById('idea-category-summary').textContent = formData.ideacat;
      document.getElementById('target-user-summary').textContent = formData.targetuser;

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
    // Capture data from step 1
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const myKadPassport = document.getElementById('pass').value;
    const phoneCountryCode = document.getElementById('phone').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const nationality = document.getElementById('nationality').value;
    
    // Capture data from step 2
    const ideaTitle = document.getElementById('idea-title').value;
    const ideaCat = document.getElementById('ideacat').value;
    const targetUser = document.getElementById('targetuser').value;
    const priceMin = document.getElementById('price-min').value;
    const priceMax = document.getElementById('price-max').value;
  
    // Combine the phone country code and number
    const fullPhoneNumber = `+${phoneCountryCode} ${phoneNumber}`;
  
    // Create a single object to store all the data
    const formData = {
      firstName,
      lastName,
      email,
      myKadPassport,
      fullPhoneNumber,
      nationality,
      ideaTitle,
      ideaCat,
      targetUser,
      priceMin,
      priceMax
    };
  
    // Save to localStorage
    localStorage.setItem('formData', JSON.stringify(formData));
  }
  


  function loadSummary() {
    // Retrieve the data from localStorage
    const formData = JSON.parse(localStorage.getItem('formData'));
  
    if (formData) {
      // Populate the summary fields with the retrieved data
      document.getElementById('profile-name').textContent = `${formData.firstName} ${formData.lastName}`;
      document.getElementById('profile-email').textContent = formData.email;
      document.getElementById('profile-pass').textContent = formData.myKadPassport;
      document.getElementById('profile-phone-number').textContent = formData.fullPhoneNumber;
      document.getElementById('profile-nationality').textContent = formData.nationality;
      document.getElementById('idea-title-summary').textContent = formData.ideaTitle;
      document.getElementById('idea-category-summary').textContent = formData.ideaCat;
      document.getElementById('target-user-summary').textContent = formData.targetUser;
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

function downloadReport() {
  // Check if jsPDF is available globally
  if (window.jspdf) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Fetch all data from local storage
    const formData = JSON.parse(localStorage.getItem('formData'));
    if (!formData) {
      console.error('No data to download');
      return;
    }

    doc.setFontSize(18);
  doc.setTextColor(40);
  doc.setFont("helvetica", "bold");
  doc.text('Business Idea Submission Report', 105, 20, null, null, 'center');

  // Line under header
  doc.setDrawColor(0);
  doc.setLineWidth(1);
  doc.line(20, 25, 190, 25);

  // Profile Information Section
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  doc.setFont("helvetica", "bold");
  doc.text('Your Profile', 20, 35);

  // Profile Details
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  let yPosition = 45;
  const lineHeight = 7;
    // Function to add text in a key-value format
    const addKeyValue = (key, value) => {
      doc.text(`${key}: ${value}`, 20, yPosition);
      yPosition += lineHeight;
    };

    // Adding profile information
    addKeyValue('Name', `${formData.firstName} ${formData.lastName}`);
    addKeyValue('Email', formData.email);
    addKeyValue('MyKad/Passport', formData.myKadPassport);
    addKeyValue('Phone Number', formData.fullPhoneNumber);
    addKeyValue('Nationality', formData.nationality);

    yPosition += 10; // Additional space before new section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text('Idea Information', 20, yPosition);
  
    // Idea Details
    yPosition += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    // Adding idea information
    addKeyValue('Idea Title', formData.ideaTitle);
    addKeyValue('Category', formData.ideaCat);
    addKeyValue('Target User', formData.targetUser);
    addKeyValue('Price Range', `${formData.priceMin} - ${formData.priceMax}`);

    // Save the PDF
    doc.save('BusinessIdeaReport.pdf');
  } else {
    alert("The jsPDF library is not loaded. Please try again.");
  }
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
  // Replace 'home.html' with the correct path to your home page
  window.location.href = 'C:/Users/CKF/Documents/CAT304/home.html'; 
}

  
});