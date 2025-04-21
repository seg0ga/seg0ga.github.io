document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle
  const toggleTheme = document.getElementById('toggleTheme');
  const body = document.body;
  
  toggleTheme.addEventListener('click', function() {
    body.setAttribute('data-theme', 
      body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    
    // Save theme preference
    localStorage.setItem('theme', body.getAttribute('data-theme'));
    
    // Update icon
    const icon = this.querySelector('i');
    icon.className = body.getAttribute('data-theme') === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  });
  
  // Load saved theme
  if (localStorage.getItem('theme')) {
    body.setAttribute('data-theme', localStorage.getItem('theme'));
    const icon = toggleTheme.querySelector('i');
    icon.className = localStorage.getItem('theme') === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
  
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
  
  // Add new education item
  document.getElementById('addEducation').addEventListener('click', function() {
    const container = document.getElementById('educationContainer');
    const newItem = document.createElement('div');
    newItem.className = 'edu-item';
    newItem.setAttribute('contenteditable', 'true');
    newItem.innerHTML = `
      <div class="edu-header">
        <h3>Degree Name</h3>
        <div class="edu-date">MM/YYYY - MM/YYYY</div>
      </div>
      <div class="edu-place">Institution Name</div>
      <div class="edu-desc">Description of your studies and achievements.</div>
    `;
    container.insertBefore(newItem, this);
  });
  
  setupAddButton('addLanguage', 'languagesContainer', '<span class="flag">🇺🇸</span> New Language <span class="level">(Beginner)</span>');
  setupAddButton('addTool', 'toolsContainer', 'New Tool');
  setupAddButton('addInterest', 'interestsContainer', 'New Interest');
  
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
      filename: 'profile.pdf',
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