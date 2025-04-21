document.addEventListener('DOMContentLoaded', function() {
  // Photo upload
  const photoUpload = document.getElementById('photoUpload');
  const photoInput = document.getElementById('photoInput');
  const profileImage = document.getElementById('profileImage');

  photoUpload.addEventListener('click', function() {
    photoInput.click();
  });

  photoInput.addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = function(event) {
        profileImage.src = event.target.result;
        // Save image to localStorage
        localStorage.setItem('profileImage', event.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  });

  // Load saved image
  if (localStorage.getItem('profileImage')) {
    profileImage.src = localStorage.getItem('profileImage');
  }

  // Add new items functions
  function setupAddButton(buttonId, containerId, template) {
    const button = document.getElementById(buttonId);
    const container = document.getElementById(containerId);

    button.addEventListener('click', function() {
      const newItem = document.createElement('div');
      newItem.innerHTML = template;
      newItem.setAttribute('contenteditable', 'true');
      newItem.classList.add(buttonId.includes('Language') ? 'language-item' : 'tag');

      container.insertBefore(newItem, button);
      newItem.focus();
    });
  }

  // Add new experience item
  document.getElementById('addExperience').addEventListener('click', function() {
    const container = document.getElementById('experienceContainer');
    const newItem = document.createElement('div');
    newItem.className = 'exp-item';
    newItem.setAttribute('contenteditable', 'true');
    newItem.innerHTML = `
      <div class="exp-header">
        <h3>Должность</h3>
        <div class="exp-date">MM/YYYY - MM/YYYY</div>
      </div>
      <div class="exp-company">Название компании</div>
      <div class="exp-desc">Описание ваших обязанностей и достижений.</div>
    `;
    container.insertBefore(newItem, this);
  });

  // Add new education item
  document.getElementById('addEducation').addEventListener('click', function() {
    const container = document.getElementById('educationContainer');
    const newItem = document.createElement('div');
    newItem.className = 'edu-item';
    newItem.setAttribute('contenteditable', 'true');
    newItem.innerHTML = `
      <div class="edu-header">
        <h3>Степень/Квалификация</h3>
        <div class="edu-date">MM/YYYY - MM/YYYY</div>
      </div>
      <div class="edu-place">Название учебного заведения</div>
      <div class="edu-desc">Описание вашего образования и достижений.</div>
    `;
    container.insertBefore(newItem, this);
  });

  setupAddButton('addLanguage', 'languagesContainer', '<span class="flag">🇷🇺</span> Новый язык <span class="level">(Уровень)</span>');
  setupAddButton('addTool', 'toolsContainer', 'Новый навык');
  setupAddButton('addInterest', 'interestsContainer', 'Новый интерес');

  // Save content
  const editableElements = document.querySelectorAll('[contenteditable="true"]');

  editableElements.forEach(element => {
    element.addEventListener('input', function() {
      localStorage.setItem('profileContent', document.querySelector('.profile-container').innerHTML);
    });
  });

  // Load saved content
  if (localStorage.getItem('profileContent')) {
    document.querySelector('.profile-container').innerHTML = localStorage.getItem('profileContent');
  }

  // Download PDF
  document.getElementById('downloadBtn').addEventListener('click', function() {
    const element = document.querySelector('.profile-container');
    const clone = element.cloneNode(true);

    // Remove buttons from clone
    clone.querySelectorAll('.controls button').forEach(btn => btn.remove());
    clone.querySelectorAll('.add-btn').forEach(btn => btn.remove());

    const opt = {
      margin: 10,
      filename: 'резюме.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        logging: false,
        useCORS: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    };

    html2pdf().set(opt).from(clone).save();
  });
});