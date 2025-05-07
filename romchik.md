<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Интерактивное резюме</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
  <style>
    :root {
      --primary-color: #2c3e50;
      --secondary-color: #3498db;
      --accent-color: #e74c3c;
      --text-color: #34495e;
      --bg-color: #f8f9fa;
      --card-bg: #ffffff;
      --shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      --border-radius: 8px;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: var(--bg-color);
      color: var(--text-color);
      font-size: 12px;
      line-height: 1.5;
    }

    .a4-container {
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      padding: 15mm;
      box-sizing: border-box;
      background-color: white;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    }

    .profile-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      gap: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }

    .profile-photo {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid var(--primary-color);
      position: relative;
      cursor: pointer;
      transition: transform 0.3s, border-color 0.3s;
    }

    .profile-photo:hover {
      transform: scale(1.05);
      border-color: var(--accent-color);
    }

    .profile-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .upload-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(231, 76, 60, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .profile-photo:hover .upload-overlay {
      opacity: 1;
    }

    #photoInput {
      display: none;
    }

    .profile-info h1 {
      font-size: 1.8em;
      margin: 0;
      color: var(--primary-color);
      font-weight: 600;
    }

    .profile-info p {
      font-size: 1.1em;
      margin: 5px 0 0;
      color: var(--secondary-color);
      font-weight: 500;
    }

    .profile-grid {
      display: grid;
      grid-template-rows: auto auto auto;
      gap: 15px;
    }

    .profile-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }

    .profile-card {
      background-color: var(--card-bg);
      border-radius: var(--border-radius);
      padding: 15px;
      box-shadow: var(--shadow);
      position: relative;
      overflow: hidden;
      border-top: 3px solid var(--secondary-color);
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .profile-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .profile-card h2 {
      color: var(--primary-color);
      margin: 0 0 12px 0;
      font-size: 1.2em;
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid #eee;
      padding-bottom: 5px;
    }

    .experience-vertical {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .exp-item {
      background-color: rgba(52, 152, 219, 0.05);
      border-radius: var(--border-radius);
      padding: 12px;
      border-left: 3px solid var(--secondary-color);
      position: relative;
      overflow: hidden;
      transition: transform 0.3s;
    }

    .exp-item:hover {
      transform: translateX(5px);
    }

    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 5px;
    }

    .exp-header h3 {
      margin: 0;
      font-size: 1em;
      color: var(--primary-color);
      font-weight: 600;
    }

    .exp-date {
      font-size: 0.8em;
      font-weight: 500;
      color: var(--accent-color);
      background-color: rgba(231, 76, 60, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
    }

    .exp-company {
      font-weight: 500;
      margin-bottom: 8px;
      font-size: 0.9em;
      color: var(--secondary-color);
    }

    .exp-desc {
      font-size: 0.85em;
      line-height: 1.5;
      color: var(--text-color);
    }

    .education-vertical {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .edu-item {
      background-color: rgba(52, 152, 219, 0.05);
      border-radius: var(--border-radius);
      padding: 12px;
      border-left: 3px solid var(--secondary-color);
      position: relative;
      overflow: hidden;
      transition: transform 0.3s;
    }

    .edu-item:hover {
      transform: translateX(5px);
    }

    .edu-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 5px;
    }

    .edu-header h3 {
      margin: 0;
      font-size: 1em;
      color: var(--primary-color);
      font-weight: 600;
    }

    .edu-date {
      font-size: 0.8em;
      font-weight: 500;
      color: var(--accent-color);
      background-color: rgba(231, 76, 60, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
    }

    .edu-place {
      font-weight: 500;
      margin-bottom: 8px;
      font-size: 0.9em;
      color: var(--secondary-color);
    }

    .edu-desc {
      font-size: 0.85em;
      line-height: 1.5;
      color: var(--text-color);
    }

    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tag {
      background-color: var(--secondary-color);
      color: white;
      padding: 4px 12px;
      border-radius: 15px;
      font-size: 0.8em;
      position: relative;
      overflow: hidden;
      transition: transform 0.3s, background-color 0.3s;
    }

    .tag:hover {
      transform: scale(1.05);
      background-color: var(--accent-color);
    }

    .languages-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .language-item {
      font-size: 0.9em;
      position: relative;
      overflow: hidden;
      padding: 5px;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .language-item:hover {
      background-color: rgba(52, 152, 219, 0.1);
    }

    .flag {
      margin-right: 6px;
    }

    .level {
      color: var(--accent-color);
      font-size: 0.8em;
      margin-left: 5px;
      font-weight: 500;
    }

    .contacts-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .contact-item {
      font-size: 0.9em;
      display: flex;
      align-items: center;
      gap: 8px;
      position: relative;
      overflow: hidden;
      padding: 5px;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .contact-item:hover {
      background-color: rgba(52, 152, 219, 0.1);
    }

    .controls {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }

    #downloadBtn, .add-btn {
      border-radius: 6px;
      border: none;
      padding: 8px 16px;
      font-size: 0.9em;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      position: relative;
      overflow: hidden;
      transition: all 0.3s;
    }

    #downloadBtn {
      background-color: var(--primary-color);
      color: white;
    }

    #downloadBtn:hover {
      background-color: var(--accent-color);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .add-btn {
      background-color: var(--secondary-color);
      color: white;
      margin-top: 10px;
    }

    .add-btn:hover {
      background-color: var(--accent-color);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .wave {
      position: absolute;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      transform: scale(0);
      pointer-events: none;
      animation: wave 0.6s ease-out;
      opacity: 1;
    }

    [contenteditable="true"] {
      padding: 2px 5px;
      border-radius: 3px;
      min-height: 1em;
      transition: background-color 0.3s;
    }

    [contenteditable="true"]:focus {
      outline: none;
      background-color: rgba(52, 152, 219, 0.1);
    }

    @keyframes wave {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(4);
        opacity: 0;
      }
    }

    @media print {
      body {
        background: none;
      }
      .a4-container {
        box-shadow: none;
        padding: 0;
        width: 100%;
        height: 100%;
      }
      .controls, .add-btn, .upload-overlay {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="a4-container" id="resumeContent">
    <div class="profile-header">
      <div class="profile-photo" id="photoUpload">
        <img id="profileImage" src="https://via.placeholder.com/150" alt="Фото профиля">
        <div class="upload-overlay">
          <i class="fas fa-camera"></i> Загрузить фото
        </div>
        <input type="file" id="photoInput" accept="image/*">
      </div>
      <div class="profile-info">
        <h1 contenteditable="true">Иван Иванов</h1>
        <p contenteditable="true">Веб-разработчик</p>
      </div>
    </div>

    <div class="profile-grid">
      <div class="profile-row">
        <div class="profile-card">
          <h2><i class="fas fa-language"></i> Языки</h2>
          <div class="languages-container" id="languagesContainer">
            <div class="language-item" contenteditable="true">
              <span class="flag">🇷🇺</span> Русский <span class="level">(Родной)</span>
            </div>
            <div class="language-item" contenteditable="true">
              <span class="flag">🇬🇧</span> Английский <span class="level">(B2 - Средне-продвинутый)</span>
            </div>
          </div>
          <button class="add-btn" id="addLanguage"><i class="fas fa-plus"></i> Добавить язык</button>
        </div>

        <div class="profile-card">
          <h2><i class="fas fa-code"></i> Инструменты</h2>
          <div class="tags-container" id="skillsContainer">
            <span class="tag" contenteditable="true">HTML/CSS</span>
            <span class="tag" contenteditable="true">JavaScript</span>
            <span class="tag" contenteditable="true">React</span>
            <span class="tag" contenteditable="true">Node.js</span>
            <span class="tag" contenteditable="true">Git</span>
            <span class="tag" contenteditable="true">Webpack</span>
            <span class="tag" contenteditable="true">SQL</span>
            <span class="tag" contenteditable="true">REST API</span>
          </div>
          <button class="add-btn" id="addSkill"><i class="fas fa-plus"></i> Добавить навык</button>
        </div>
      </div>

      <div class="profile-row">
        <div class="profile-card">
          <h2><i class="fas fa-graduation-cap"></i> Образование</h2>
          <div class="education-vertical" id="educationContainer">
            <div class="edu-item" contenteditable="true">
              <div class="edu-header">
                <h3>Магистр компьютерных наук</h3>
                <div class="edu-date">09.2014 - 06.2018</div>
              </div>
              <div class="edu-place">Московский технический университет</div>
              <div class="edu-desc">Специализация: Веб-технологии. Диплом с отличием.</div>
            </div>
          </div>
          <button class="add-btn" id="addEducation"><i class="fas fa-plus"></i> Добавить образование</button>
        </div>

        <div class="profile-card">
          <h2><i class="fas fa-heart"></i> Увлечения</h2>
          <div class="tags-container" id="hobbiesContainer">
            <span class="tag" contenteditable="true">Программирование</span>
            <span class="tag" contenteditable="true">Открытый исходный код</span>
            <span class="tag" contenteditable="true">Фотография</span>
            <span class="tag" contenteditable="true">Путешествия</span>
          </div>
          <button class="add-btn" id="addHobby"><i class="fas fa-plus"></i> Добавить увлечение</button>
        </div>
      </div>

      <div class="profile-row">
        <div class="profile-card">
          <h2><i class="fas fa-briefcase"></i> Опыт работы</h2>
          <div class="experience-vertical" id="experienceContainer">
            <div class="exp-item" contenteditable="true">
              <div class="exp-header">
                <h3>Старший веб-разработчик</h3>
                <div class="exp-date">01.2020 - н.в.</div>
              </div>
              <div class="exp-company">ТехноКаб, Москва</div>
              <div class="exp-desc">
                - Разработка и поддержка веб-приложений<br>
                - Руководство командой разработчиков<br>
                - Оптимизация производительности
              </div>
            </div>

            <div class="exp-item" contenteditable="true">
              <div class="exp-header">
                <h3>Веб-разработчик</h3>
                <div class="exp-date">06.2017 - 12.2019</div>
              </div>
              <div class="exp-company">ДизайнСтудия, СПб</div>
              <div class="exp-desc">
                - Создание адаптивных веб-сайтов<br>
                - Интеграция с CMS<br>
                - Работа с клиентами
              </div>
            </div>
          </div>
          <button class="add-btn" id="addExperience"><i class="fas fa-plus"></i> Добавить опыт работы</button>
        </div>

        <div class="profile-card">
          <h2><i class="fas fa-envelope"></i> Контакты</h2>
          <div class="contacts-container" id="contactsContainer">
            <div class="contact-item" contenteditable="true">
              <i class="fas fa-phone"></i> +7 (123) 456-78-90
            </div>
            <div class="contact-item" contenteditable="true">
              <i class="fas fa-envelope"></i> ivanov@example.com
            </div>
            <div class="contact-item" contenteditable="true">
              <i class="fab fa-github"></i> github.com/ivanov
            </div>
            <div class="contact-item" contenteditable="true">
              <i class="fab fa-linkedin"></i> linkedin.com/in/ivanov
            </div>
            <div class="contact-item" contenteditable="true">
              <i class="fas fa-map-marker-alt"></i> Москва, Россия
            </div>
          </div>
          <button class="add-btn" id="addContact"><i class="fas fa-plus"></i> Добавить контакт</button>
        </div>
      </div>
    </div>

    <div class="controls">
      <button id="downloadBtn"><i class="fas fa-download"></i> Сохранить в PDF</button>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      function createWaveEffect(event, element) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const wave = document.createElement('span');
        wave.className = 'wave';
        wave.style.left = `${x}px`;
        wave.style.top = `${y}px`;
        
        element.appendChild(wave);
        
        setTimeout(() => {
          wave.remove();
        }, 600);
      }

      function setupWaveEffects() {
        document.getElementById('photoUpload').addEventListener('click', function(e) {
          createWaveEffect(e, this);
        });

        document.querySelectorAll('.profile-card').forEach(card => {
          card.addEventListener('click', function(e) {
            createWaveEffect(e, this);
          });
        });

        document.querySelectorAll('.exp-item, .edu-item').forEach(item => {
          item.addEventListener('click', function(e) {
            createWaveEffect(e, this);
          });
        });

        document.querySelectorAll('.tag, .language-item, .contact-item').forEach(item => {
          item.addEventListener('click', function(e) {
            createWaveEffect(e, this);
          });
        });

        document.querySelectorAll('button').forEach(button => {
          button.addEventListener('click', function(e) {
            createWaveEffect(e, this);
          });
        });
      }

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
            localStorage.setItem('profilePhoto', event.target.result);
          };

          reader.readAsDataURL(e.target.files[0]);
        }
      });

      if (localStorage.getItem('profilePhoto')) {
        profileImage.src = localStorage.getItem('profilePhoto');
      }

      const editableElements = document.querySelectorAll('[contenteditable="true"]');
      
      editableElements.forEach(element => {
        const key = 'resume-' + Array.from(element.parentNode.children).indexOf(element);
        
        if (localStorage.getItem(key)) {
          element.innerHTML = localStorage.getItem(key);
        }
        
        element.addEventListener('input', function() {
          localStorage.setItem(key, this.innerHTML);
        });
      });

      function addLanguage() {
        const container = document.getElementById('languagesContainer');
        const newItem = document.createElement('div');
        newItem.className = 'language-item';
        newItem.setAttribute('contenteditable', 'true');
        newItem.innerHTML = '<span class="flag">🇺🇸</span> Новый язык <span class="level">(Уровень)</span>';
        container.appendChild(newItem);
        newItem.focus();
      }

      function addSkill() {
        const container = document.getElementById('skillsContainer');
        const newItem = document.createElement('span');
        newItem.className = 'tag';
        newItem.setAttribute('contenteditable', 'true');
        newItem.textContent = 'Новый навык';
        container.appendChild(newItem);
        newItem.focus();
      }

      function addHobby() {
        const container = document.getElementById('hobbiesContainer');
        const newItem = document.createElement('span');
        newItem.className = 'tag';
        newItem.setAttribute('contenteditable', 'true');
        newItem.textContent = 'Новое увлечение';
        container.appendChild(newItem);
        newItem.focus();
      }

      function addContact() {
        const container = document.getElementById('contactsContainer');
        const newItem = document.createElement('div');
        newItem.className = 'contact-item';
        newItem.setAttribute('contenteditable', 'true');
        newItem.innerHTML = '<i class="fas fa-globe"></i> Новый контакт';
        container.appendChild(newItem);
        newItem.focus();
      }

      function addEducation() {
        const container = document.getElementById('educationContainer');
        const newItem = document.createElement('div');
        newItem.className = 'edu-item';
        newItem.setAttribute('contenteditable', 'true');
        newItem.innerHTML = `
          <div class="edu-header">
            <h3>Новая степень</h3>
            <div class="edu-date">MM.YYYY - MM.YYYY</div>
          </div>
          <div class="edu-place">Название учебного заведения</div>
          <div class="edu-desc">Описание образования</div>
        `;
        container.appendChild(newItem);
        newItem.focus();
      }

      function addExperience() {
        const container = document.getElementById('experienceContainer');
        const newItem = document.createElement('div');
        newItem.className = 'exp-item';
        newItem.setAttribute('contenteditable', 'true');
        newItem.innerHTML = `
          <div class="exp-header">
            <h3>Новая должность</h3>
            <div class="exp-date">MM.YYYY - MM.YYYY</div>
          </div>
          <div class="exp-company">Название компании</div>
          <div class="exp-desc">
            - Описание обязанностей<br>
            - Достижения и результаты
          </div>
        `;
        container.appendChild(newItem);
        newItem.focus();
      }

      document.getElementById('addLanguage').addEventListener('click', addLanguage);
      document.getElementById('addSkill').addEventListener('click', addSkill);
      document.getElementById('addHobby').addEventListener('click', addHobby);
      document.getElementById('addContact').addEventListener('click', addContact);
      document.getElementById('addEducation').addEventListener('click', addEducation);
      document.getElementById('addExperience').addEventListener('click', addExperience);

      document.getElementById('downloadBtn').addEventListener('click', function() {
        const element = document.getElementById('resumeContent');
        const opt = {
          margin: 10,
          filename: 'Мое_резюме.pdf',
          image: { 
            type: 'jpeg', 
            quality: 1.0
          },
          html2canvas: { 
            scale: 3,
            logging: false,
            useCORS: true,
            letterRendering: true,
            dpi: 300
          },
          jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
          }
        };

        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
          btn.style.visibility = 'hidden';
        });

        html2pdf().set(opt).from(element).save().then(() => {
          buttons.forEach(btn => {
            btn.style.visibility = 'visible';
          });
        });
      });

      setupWaveEffects();
    });
  </script>
</body>
</html>
