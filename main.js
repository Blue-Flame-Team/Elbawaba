document.addEventListener('DOMContentLoaded', function () {
    // === DROPDOWN MENU ===
    const dropdownTriggers = document.querySelectorAll('.dropdown > a');
  
    dropdownTriggers.forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        const parentDropdown = trigger.closest('.dropdown');
        if (!parentDropdown) return;
  
        const href = trigger.getAttribute('href');
        if (!href || href === '#') {
          e.preventDefault();
        }
  
        e.stopPropagation();
  
        const isOpen = parentDropdown.classList.contains('open');
  
        document.querySelectorAll('.dropdown.open').forEach(function(openDropdown) {
          if (openDropdown !== parentDropdown) {
            openDropdown.classList.remove('open');
          }
        });
  
        parentDropdown.classList.toggle('open', !isOpen);
      });
    });
  
    document.addEventListener('click', function(e) {
      const clickedInsideDropdown = e.target.closest('.dropdown');
  
      if (!clickedInsideDropdown) {
        document.querySelectorAll('.dropdown.open').forEach(function(openDropdown) {
          openDropdown.classList.remove('open');
        });
      }
    });

    // === HERO SLIDER ===
    const heroImages = [
        'assets/images/hero.png',
        'assets/images/Frame 2139.png',
        'assets/images/Component 33.png',
    ];
    const heroSlider = document.querySelector('.hero-slider');
    let currentHeroIndex = 0;
    let heroInterval;

    function renderHeroSlider() {
    heroSlider.innerHTML = '';
    heroImages.forEach((img, idx) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (idx === currentHeroIndex ? ' active' : '');
        dot.addEventListener('click', function () {
            currentHeroIndex = idx;
            updateHeroImage(idx);
            resetHeroInterval();
            updateDots();
        });
        heroSlider.appendChild(dot);
    });
}

function updateDots() {
    const dots = heroSlider.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        if (idx === currentHeroIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function updateDots() {
    const dots = heroSlider.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        if (idx === currentHeroIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

    function showHeroImage(idx) {
    currentHeroIndex = idx;
    updateHeroImage();
    updateDots();
}

    function updateHeroImage(idx = currentHeroIndex) {
    currentHeroIndex = idx;
    // تغيير خلفية قسم hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.background = `url('${heroImages[currentHeroIndex]}') center/cover no-repeat`;
    }
    // لم نعد ننشئ صورة <img> هنا، فقط نحدث الخلفية
    updateDots();
}

    function nextHeroImage() {
        let nextIdx = (currentHeroIndex + 1) % heroImages.length;
        showHeroImage(nextIdx);
    }
    function resetHeroInterval() {
        clearInterval(heroInterval);
        heroInterval = setInterval(nextHeroImage, 4000);
    }

    // Initial render
    renderHeroSlider();
    showHeroImage(0);
    heroInterval = setInterval(nextHeroImage, 4000);


    // === NEWS SLIDER DOTS ===
    const newsCards = document.querySelectorAll('.news-card');
    const newsDots = document.querySelectorAll('.news-dots .dot');
    let currentNewsIndex = 0;

    function showNewsPair(idx) {
        currentNewsIndex = idx;
        newsCards.forEach((card, i) => {
            // كل دايرة تظهر خبرين معًا
            if (i === idx * 2 || i === idx * 2 + 1) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        newsDots.forEach((dot, i) => {
            if (i === idx) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    newsDots.forEach((dot, idx) => {
        dot.addEventListener('click', function() {
            showNewsPair(idx);
        });
    });

    // Initial news
    showNewsPair(0);

    // === Theme Menu Modal Logic
    const themeMenuModal = document.getElementById('themeMenuModal');
    const themeSettingsIcon = document.getElementById('themeSettingsIcon');
    const closeThemeMenuModal = document.getElementById('closeThemeMenuModal');

    if (themeSettingsIcon && themeMenuModal && closeThemeMenuModal) {
      themeSettingsIcon.addEventListener('click', function(e) {
        themeMenuModal.style.display = 'block';
        setTimeout(() => { themeMenuModal.querySelector('div').focus && themeMenuModal.querySelector('div').focus(); }, 50);
      });
      closeThemeMenuModal.addEventListener('click', function() {
        themeMenuModal.style.display = 'none';
      });
      themeMenuModal.addEventListener('click', function(e) {
        if (e.target === themeMenuModal) themeMenuModal.style.display = 'none';
      });
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && themeMenuModal.style.display === 'block') {
          themeMenuModal.style.display = 'none';
        }
      });
    }

    // === Bottom Sheet Modal Menu ===
    var sideMenuToggle = document.getElementById('sideMenuToggle');
    var modalOverlay = document.getElementById('modalOverlay');
    var bottomSheetMenu = document.getElementById('bottomSheetMenu');
    var bottomSheetClose = document.querySelector('.bottom-sheet-close');

    // ربط أيقونة القائمة بفتح bottom sheet
    if (sideMenuToggle && bottomSheetMenu && modalOverlay) {
      sideMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        openBottomSheet();
      });
    }

    function openBottomSheet() {
      if (modalOverlay) modalOverlay.classList.add('active');
      if (bottomSheetMenu) bottomSheetMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (bottomSheetClose) bottomSheetClose.focus();
    }
    function closeBottomSheet() {
      if (modalOverlay) modalOverlay.classList.remove('active');
      if (bottomSheetMenu) bottomSheetMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
    var mainMenuActionBtn = document.getElementById('mainMenuActionBtn');
    if (mainMenuActionBtn && bottomSheetMenu && modalOverlay) {
      mainMenuActionBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        openBottomSheet();
      });
      if (bottomSheetClose) {
        bottomSheetClose.addEventListener('click', function() {
          closeBottomSheet();
        });
      }
      modalOverlay.addEventListener('click', function() {
        closeBottomSheet();
      });
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && bottomSheetMenu.classList.contains('active')) {
          closeBottomSheet();
        }
      });
    }
});

