document.addEventListener('DOMContentLoaded', function() {
  // Material Wave эффект
  function createWaveEffect(event) {
    const rect = this.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const wave = this.querySelector('.wave');
    if (!wave) return;
    
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;
    
    wave.classList.remove('active');
    void wave.offsetWidth;
    wave.classList.add('active');
  }

  // Применяем эффект ко всем кликабельным элементам
  document.querySelectorAll('.clickable, .tag, [contenteditable="true"]').forEach(el => {
    el.addEventListener('click', createWaveEffect);
  });

  // Загрузка фото
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
        localStorage.setItem('profileImage', event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  });

  // Загрузка сохраненного фото
  if (localStorage.getItem('profileImage')) {
    profileImage.src = localStorage.getItem('profileImage');
  }

  // Функции добавления элементов
  function addExperience() {
    const container = document.getElementById('experienceContainer');
    const card = document.getElementById('experienceCard');
    const newItem = document.createElement('div');
    newItem.className = 'experience-item';
    newItem.setAttribute('contenteditable', 'true');
    newItem.innerHTML = `
      <h3>Должность <span>ГГГГ - ГГГГ</span></h3>
      <p>Компания, Город</p>
      <p>Обязанности и достижения</p>
      <div class="wave"></div>
    `;
    container.appendChild(newItem);
    animateNewElement(newItem);
    checkCardSize(card);
  }

  function addSkill() {
    const container = document.getElementById('skillsContainer');
    const card = document.getElementById('skillsCard');
    const newItem = document.createElement('span');
    newItem.className = 'tag clickable';
    newItem.setAttribute('contenteditable', 'true');
    newItem.innerHTML = 'Новый навык<div class="wave"></div>';
    container.appendChild(newItem);
    animateNewElement(newItem, 'scale');
    checkCardSize(card);
  }

  function addEducation() {
    const container = document.getElementById('educationContainer');
    const card = document.getElementById('educationCard');
    const newItem = document.createElement('div');
    newItem.className = 'education-item';
    newItem.setAttribute('contenteditable', 'true');
    newItem.innerHTML = `
      <h3>Степень <span>ГГГГ - ГГГГ</span></h3>
      <p>Учебное заведение</p>
      <p>Специализация</p>
      <div class="wave"></div>
    `;
    container.appendChild(newItem);
    animateNewElement(newItem);
    checkCardSize(card);
  }

  function addLanguage() {
    const container = document.getElementById('languagesContainer');
    const card = document.getElementById('languagesCard');
    const newItem = document.createElement('div');
    newItem.className = 'education-item';
    newItem.setAttribute('contenteditable', 'true');
    newItem.innerHTML = `
      <p>🇺🇸 Язык (уровень)</p>
      <div class="wave"></div>
    `;
    container.appendChild(newItem);
    animateNewElement(newItem);
    checkCardSize(card);
  }

  function addInterest() {
    const container = document.getElementById('interestsContainer');
    const card = document.getElementById('interestsCard');
    const newItem = document.createElement('span');
    newItem.className = 'tag clickable';
    newItem.setAttribute('contenteditable', 'true');
    newItem.innerHTML = 'Новый интерес<div class="wave"></div>';
    container.appendChild(newItem);
    animateNewElement(newItem, 'scale');
    checkCardSize(card);
  }

  // Анимация нового элемента
  function animateNewElement(element, type = 'translate') {
    const wave = element.querySelector('.wave');
    if (wave) wave.addEventListener('click', createWaveEffect);
    
    if (type === 'translate') {
      element.style.opacity = '0';
      element.style.transform = 'translateY(10px)';
    } else {
      element.style.opacity = '0';
      element.style.transform = 'scale(0.8)';
    }
    
    setTimeout(() => {
      element.style.transition = 'all 0.3s ease';
      element.style.opacity = '1';
      element.style.transform = type === 'translate' ? 'translateY(0)' : 'scale(1)';
    }, 10);
  }

  // Проверка размера карточки
  function checkCardSize(card) {
    setTimeout(() => {
      const contentHeight = card.scrollHeight;
      const rowHeight = 100;
      const rowsNeeded = Math.ceil(contentHeight / rowHeight);
      
      if (rowsNeeded > 1 && !card.classList.contains('expanded')) {
        card.classList.add('expanded');
      } else if (rowsNeeded <= 1 && card.classList.contains('expanded')) {
        card.classList.remove('expanded');
      }
    }, 10);
  }

  // Сохранение данных
  function saveData() {
    localStorage.setItem('resumeData', document.querySelector('.a4-page').innerHTML);
  }

  // Загрузка сохраненных данных
  function loadData() {
    if (localStorage.getItem('resumeData')) {
      document.querySelector('.a4-page').innerHTML = localStorage.getItem('resumeData');
      restoreEventHandlers();
      document.querySelectorAll('.resume-card').forEach(checkCardSize);
    }
  }

  // Восстановление обработчиков
  function restoreEventHandlers() {
    document.querySelectorAll('.clickable, .tag, [contenteditable="true"]').forEach(el => {
      el.addEventListener('click', createWaveEffect);
    });
    
    document.getElementById('addExperience').addEventListener('click', addExperience);
    document.getElementById('addSkill').addEventListener('click', addSkill);
    document.getElementById('addEducation').addEventListener('click', addEducation);
    document.getElementById('addLanguage').addEventListener('click', addLanguage);
    document.getElementById('addInterest').addEventListener('click', addInterest);
    document.getElementById('downloadBtn').addEventListener('click', downloadPDF);
  }

  // Скачивание PDF
  function downloadPDF() {
    const element = document.querySelector('.a4-page');
    const opt = {
      margin: 0,
      filename: 'резюме.pdf',
      image: { 
        type: 'jpeg', 
        quality: 1
      },
      html2canvas: { 
        scale: 3,
        logging: false,
        useCORS: true,
        letterRendering: true,
        allowTaint: true,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        backgroundColor: '#FFFFFF'
      },
      jsPDF: { 
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      }
    };

    const originalWidth = element.style.width;
    element.style.width = '210mm';
    
    const buttons = element.querySelectorAll('button');
    buttons.forEach(btn => btn.style.display = 'none');

    element.classList.add('printing');
    element.style.opacity = '0.9';
    
    setTimeout(() => {
      html2pdf().set(opt).from(element).save().then(() => {
        buttons.forEach(btn => btn.style.display = '');
        element.style.width = originalWidth;
        element.classList.remove('printing');
        element.style.opacity = '1';
      });
    }, 100);
  }

  // Инициализация
  document.querySelectorAll('[contenteditable="true"]').forEach(el => {
    el.addEventListener('input', () => {
      saveData();
      checkCardSize(el.closest('.resume-card'));
    });
  });

  // Назначение обработчиков кнопок
  document.getElementById('addExperience').addEventListener('click', addExperience);
  document.getElementById('addSkill').addEventListener('click', addSkill);
  document.getElementById('addEducation').addEventListener('click', addEducation);
  document.getElementById('addLanguage').addEventListener('click', addLanguage);
  document.getElementById('addInterest').addEventListener('click', addInterest);
  document.getElementById('downloadBtn').addEventListener('click', downloadPDF);

  // Загрузка сохраненных данных
  loadData();
});
