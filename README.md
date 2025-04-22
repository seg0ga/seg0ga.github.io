```html
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
      --primary-color: #646cff;
      --secondary-color: #535bf2;
      --text-color: #213547;
      --bg-color: #ffffff;
      --card-bg: #f9f9f9;
      --shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      --border-radius: 6px;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: 'Arial', sans-serif;
      background-color: var(--bg-color);
      color: var(--text-color);
      font-size: 12px;
      line-height: 1.4;
    }

    .a4-container {
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      padding: 15mm;
      box-sizing: border-box;
      background-color: white;
      animation: fadeIn 0.8s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .profile-header {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      gap: 15px;
      animation: slideIn 0.6s ease-out;
    }

    @keyframes slideIn {
      from { transform: translateX(-20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    .profile-photo {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid var(--primary-color);
      position: relative;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      animation: bounceIn 0.8s ease-out;
    }

    @keyframes bounceIn {
      0% { transform: scale(0.8); opacity: 0; }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); opacity: 1; }
    }

    .profile-photo:hover {
      transform: scale(1.05) rotate(2deg);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .profile-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .profile-photo:hover img {
      transform: scale(1.1);
    }

    .upload-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      opacity: 0;
      transition: all 0.3s ease;
      backdrop-filter: blur(2px);
    }

    .profile-photo:hover .upload-overlay {
      opacity: 1;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { background-color: rgba(0, 0, 0, 0.5); }
      50% { background-color: rgba(0, 0, 0, 0.7); }
      100% { background-color: rgba(0, 0, 0, 0.5); }
    }

    #photoInput {
      display: none;
    }

    .profile-info h1 {
      font-size: 1.5em;
      margin: 0;
      color: var(--primary-color);
      animation: textGlow 2s ease-in-out infinite alternate;
    }

    @keyframes textGlow {
      from { text-shadow: 0 0 5px rgba(100, 108, 255, 0.3); }
      to { text-shadow: 0 0 10px rgba(100, 108, 255, 0.6); }
    }

    .profile-info p {
      font-size: 1em;
      margin: 3px 0 0;
      color: var(--text-color);
      animation: slideIn 0.6s ease-out 0.2s forwards;
      opacity: 0;
    }

    .profile-grid {
      display: grid;
      grid-template-rows: auto auto auto;
      gap: 10px;
    }

    .profile-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .profile-card {
      background-color: var(--card-bg);
      border-radius: var(--border-radius);
      padding: 10px;
      box-shadow: var(--shadow);
      position: relative;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      animation: cardAppear 0.6s ease-out;
      animation-fill-mode: backwards;
    }

    @keyframes cardAppear {
      0% { transform: translateY(20px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }

    .profile-card:nth-child(1) { animation-delay: 0.1s; }
    .profile-card:nth-child(2) { animation-delay: 0.2s; }
    .profile-card:nth-child(3) { animation-delay: 0.3s; }
    .profile-card:nth-child(4) { animation-delay: 0.4s; }
    .profile-card:nth-child(5) { animation-delay: 0.5s; }
    .profile-card:nth-child(6) { animation-delay: 0.6s; }

    .profile-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    .profile-card h2 {
      color: var(--primary-color);
      margin: 0 0 8px 0;
      font-size: 1.1em;
      display: flex;
      align-items: center;
      gap: 6px;
      border-bottom: 1px solid #eee;
      padding-bottom: 3px;
      transition: all 0.3s ease;
    }

    .profile-card:hover h2 {
      letter-spacing: 0.5px;
      color: var(--secondary-color);
    }

    /* Опыт работы */
    .experience-vertical {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .exp-item {
      background-color: rgba(100, 108, 255, 0.05);
      border-radius: var(--border-radius);
      padding: 8px;
      border-left: 2px solid var(--primary-color);
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .exp-item:hover {
      background-color: rgba(100, 108, 255, 0.1);
      transform: translateX(5px);
    }

    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 3px;
    }

    .exp-header h3 {
      margin: 0;
      font-size: 0.95em;
      color: var(--primary-color);
      transition: all 0.3s ease;
    }

    .exp-item:hover .exp-header h3 {
      color: var(--secondary-color);
    }

    .exp-date {
      font-size: 0.75em;
      opacity: 0.8;
      background-color: rgba(100, 108, 255, 0.1);
      padding: 1px 4px;
      border-radius: 3px;
      transition: all 0.3s ease;
    }

    .exp-item:hover .exp-date {
      transform: scale(1.05);
    }

    .exp-company {
      font-weight: 500;
      margin-bottom: 5px;
      font-size: 0.85em;
      transition: all 0.3s ease;
    }

    .exp-item:hover .exp-company {
      letter-spacing: 0.3px;
    }

    .exp-desc {
      font-size: 0.8em;
      line-height: 1.4;
      opacity: 0.9;
      transition: all 0.3s ease;
    }

    .exp-item:hover .exp-desc {
      opacity: 1;
    }

    /* Образование */
    .education-vertical {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .edu-item {
      background-color: rgba(100, 108, 255, 0.05);
      border-radius: var(--border-radius);
      padding: 8px;
      border-left: 2px solid var(--primary-color);
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .edu-item:hover {
      background-color: rgba(100, 108, 255, 0.1);
      transform: translateX(5px);
    }

    .edu-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 3px;
    }

    .edu-header h3 {
      margin: 0;
      font-size: 0.95em;
      color: var(--primary-color);
      transition: all 0.3s ease;
    }

    .edu-item:hover .edu-header h3 {
      color: var(--secondary-color);
    }

    .edu-date {
      font-size: 0.75em;
      opacity: 0.8;
      background-color: rgba(100, 108, 255, 0.1);
      padding: 1px 4px;
      border-radius: 3px;
      transition: all 0.3s ease;
    }

    .edu-item:hover .edu-date {
      transform: scale(1.05);
    }

    .edu-place {
      font-weight: 500;
      margin-bottom: 5px;
      font-size: 0.85em;
      transition: all 0.3s ease;
    }

    .edu-item:hover .edu-place {
      letter-spacing: 0.3px;
    }

    .edu-desc {
      font-size: 0.8em;
      line-height: 1.4;
      opacity: 0.9;
      transition: all 0.3s ease;
    }

    .edu-item:hover .edu-desc {
      opacity: 1;
    }

    /* Навыки и языки */
    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .tag {
      background-color: var(--primary-color);
      color: white;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 0.75em;
      position: relative;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      animation: tagAppear 0.5s ease-out;
      animation-fill-mode: backwards;
    }

    @keyframes tagAppear {
      0% { transform: scale(0); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }

    .tag:nth-child(1) { animation-delay: 0.1s; }
    .tag:nth-child(2) { animation-delay: 0.2s; }
    .tag:nth-child(3) { animation-delay: 0.3s; }
    .tag:nth-child(4) { animation-delay: 0.4s; }
    .tag:nth-child(5) { animation-delay: 0.5s; }
    .tag:nth-child(6) { animation-delay: 0.6s; }
    .tag:nth-child(7) { animation-delay: 0.7s; }
    .tag:nth-child(8) { animation-delay: 0.8s; }

    .tag:hover {
      transform: translateY(-2px) scale(1.05);
      background-color: var(--secondary-color);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .languages-container {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .language-item {
      font-size: 0.85em;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      padding: 5px;
      border-radius: 4px;
      background-color: rgba(100, 108, 255, 0.05);
      animation: slideInRight 0.5s ease-out;
      animation-fill-mode: backwards;
    }

    @keyframes slideInRight {
      from { transform: translateX(20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    .language-item:nth-child(1) { animation-delay: 0.1s; }
    .language-item:nth-child(2) { animation-delay: 0.3s; }

    .language-item:hover {
      background-color: rgba(100, 108, 255, 0.1);
      transform: translateX(5px);
    }

    .flag {
      margin-right: 4px;
      transition: transform 0.3s ease;
    }

    .language-item:hover .flag {
      transform: scale(1.2);
    }

    .level {
      color: var(--secondary-color);
      font-size: 0.75em;
      margin-left: 3px;
      transition: all 0.3s ease;
    }

    .language-item:hover .level {
      font-weight: bold;
    }

    /* Контакты */
    .contacts-container {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .contact-item {
      font-size: 0.85em;
      display: flex;
      align-items: center;
      gap: 6px;
      position: relative;
      overflow: hidden;
      padding: 5px;
      border-radius: 4px;
      transition: all 0.3s ease;
      animation: fadeIn 0.5s ease-out;
      animation-fill-mode: backwards;
    }

    .contact-item:nth-child(1) { animation-delay: 0.1s; }
    .contact-item:nth-child(2) { animation-delay: 0.2s; }
    .contact-item:nth-child(3) { animation-delay: 0.3s; }
    .contact-item:nth-child(4) { animation-delay: 0.4s; }
    .contact-item:nth-child(5) { animation-delay: 0.5s; }

    .contact-item:hover {
      background-color: rgba(100, 108, 255, 0.05);
      transform: translateX(5px);
    }

    .contact-item i {
      transition: all 0.3s ease;
    }

    .contact-item:hover i {
      color: var(--primary-color);
      transform: scale(1.2);
    }

    /* Кнопки */
    .controls {
      display: flex;
      justify-content: center;
      margin-top: 15px;
      animation: fadeIn 0.8s ease-out 0.5s forwards;
      opacity: 0;
    }

    #downloadBtn, .add-btn {
      border-radius: 4px;
      border: none;
      padding: 6px 12px;
      font-size: 0.85em;
      background-color: var(--primary-color);
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      position: relative;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    #downloadBtn:hover, .add-btn:hover {
      background-color: var(--secondary-color);
      transform: translateY(-3px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    #downloadBtn:active, .add-btn:active {
      transform: translateY(-1px);
    }

    .add-btn {
      background-color: #4CAF50;
      margin-top: 8px;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }

    .add-btn:hover {
      background-color: #45a049;
      animation: none;
    }

    /* Эффект волны */
    .wave {
      position: absolute;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      transform: scale(0);
      pointer-events: none;
      animation: wave 0.6s ease-out;
      opacity: 1;
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

    [contenteditable="true"] {
      padding: 1px 3px;
      border-radius: 2px;
      min-height: 1em;
      transition: all 0.3s ease;
    }

    [contenteditable="true"]:focus {
      outline: none;
      background-color: rgba(100, 108, 255, 0.1);
      box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.2);
    }

    /* Анимация для новых элементов */
    .new-item {
      animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes popIn {
      0% { transform: scale(0.8); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
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
        animation: none;
      }
      .controls, .add-btn, .upload-overlay {
        display: none;
      }
      * {
        animation: none !important;
        transition: none !important;
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
      <!-- Первая строка: Языки и инструменты -->
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

      <!-- Вторая строка: Образование и увлечения -->
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

      <!-- Третья строка: Опыт работы и контакты -->
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
      // Функция для создания эффекта волны
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

      // Добавляем обработчики для всех кликабельных элементов
      function setupWaveEffects() {
        // Фото профиля
        document.getElementById('photoUpload').addEventListener('click', function(e) {
          createWaveEffect(e, this);
        });

        // Карточки
        document.querySelectorAll('.profile-card').forEach(card => {
          card.addEventListener('click', function(e) {
            createWaveEffect(e, this);
          });
        });

        // Элементы опыта и образования
        document.querySelectorAll('.exp-item, .edu-item').forEach(item => {
          item.addEventListener('click', function(e) {
            createWaveEffect(e, this);
          });
        });

        // Теги и языки
        document.querySelectorAll('.tag, .language-item, .contact-item').forEach(item => {
          item.addEventListener('click', function(e) {
            createWaveEffect(e, this);
          });
        });

        // Кнопки
        document.querySelectorAll('button').forEach(button => {
          button.addEventListener('click', function(e) {
            createWaveEffect(e, this);
          });
        });
      }

      // Загрузка фото профиля
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
            // Сохраняем фото в localStorage
            localStorage.setItem('profilePhoto', event.target.result);
            
            // Анимация изменения фото
            profileImage.style.animation = 'none';
            void profileImage.offsetWidth; // Trigger reflow
            profileImage.style.animation = 'bounceIn 0.8s ease-out';
          };

          reader.readAsDataURL(e.target.files[0]);
        }
      });

      // Загружаем сохраненное фото при загрузке страницы
      if (localStorage.getItem('profilePhoto')) {
        profileImage.src = localStorage.getItem('profilePhoto');
      }

      // Сохранение изменений в LocalStorage
      const editableElements = document.querySelectorAll('[contenteditable="true"]');
      
      editableElements.forEach(element => {
        // Генерация уникального ключа на основе позиции элемента
        const key = 'resume-' + Array.from(element.parentNode.children).indexOf(element);
        
        // Загрузка сохраненных данных
        if (localStorage.getItem(key)) {
          element.innerHTML = localStorage.getItem(key);
        }
        
        // Сохранение при изменении
        element.addEventListener('input', function() {
          localStorage.setItem(key, this.innerHTML);
        });
      });

      // Функция для анимации добавления нового элемента
      function animateNewElement(element) {
        element.classList.add('new-item');
        setTimeout(() => {
          element.classList.remove('new-item');
        }, 500);
      }

      // Функции для добавления новых элементов
      function addLanguage() {
        const container = document.getElementById('languagesContainer');
        const newItem = document.createElement('div');
        newItem.className = 'language-item';
        newItem.setAttribute('contenteditable', 'true');
        newItem.innerHTML = '<span class="flag">🇺🇸</span> Новый язык <span class="level">(Уровень)</span>';
        container.appendChild(newItem);
        animateNewElement(newItem);
        newItem.focus();
      }

      function addSkill() {
        const container = document.getElementById('skillsContainer');
        const newItem = document.createElement('span');
        newItem.className = 'tag';
        newItem.setAttribute('contenteditable', 'true');
        newItem.textContent = 'Новый навык';
        container.appendChild(newItem);
        animateNewElement(newItem);
        newItem.focus();
      }

      function addHobby() {
        const container = document.getElementById('hobbiesContainer');
        const newItem = document.createElement('span');
        newItem.className = 'tag';
        newItem.setAttribute('contenteditable', 'true');
        newItem.textContent = 'Новое увлечение';
        container.appendChild(newItem);
        animateNewElement(newItem);
        newItem.focus();
      }

      function addContact() {
        const container = document.getElementById('contactsContainer');
        const newItem = document.createElement('div');
        newItem.className = 'contact-item';
        newItem.setAttribute('contenteditable', 'true');
        newItem.innerHTML = '<i class="fas fa-globe"></i> Новый контакт';
        container.appendChild(newItem);
        animateNewElement(newItem);
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
        animateNewElement(newItem);
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
        animateNewElement(newItem);
        newItem.focus();
      }

      // Назначение обработчиков кнопок
      document.getElementById('addLanguage').addEventListener('click', addLanguage);
      document.getElementById('addSkill').addEventListener('click', addSkill);
      document.getElementById('addHobby').addEventListener('click', addHobby);
      document.getElementById('addContact').addEventListener('click', addContact);
      document.getElementById('addEducation').addEventListener('click', addEducation);
      document.getElementById('addExperience').addEventListener('click', addExperience);

      // Обработка кнопки сохранения в PDF
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
            dpi: 300,
            backgroundColor: '#FFFFFF'
          },
          jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
          }
        };

        // Скрываем кнопки перед генерацией PDF
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
          btn.style.visibility = 'hidden';
        });

        // Генерируем PDF
        html2pdf().set(opt).from(element).save().then(() => {
          // Восстанавливаем кнопки после генерации
          buttons.forEach(btn => {
            btn.style.visibility = 'visible';
          });
        });
      });

      // Инициализация эффектов волны
      setupWaveEffects();
    });
  </script>
</body>
</html>
```
