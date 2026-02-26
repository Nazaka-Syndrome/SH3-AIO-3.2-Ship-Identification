/**
 * SH3 SHIP RECOGNITION - Onealex Mod 3.2
 * Application JavaScript Principale avec support multilingue
 */

// Configuration
const CONFIG = {
  imagesPath: 'ships/',
  debounceDelay: 150,
  defaultLanguage: 'fr',
  availableLanguages: ['fr', 'en', 'de']
};

// State
const state = {
  allShips: [],
  filteredShips: [],
  currentModalIndex: -1,
  theme: 'dark',
  language: 'fr'
};

// Ajout du convoi (hors objet)
state.convoy = JSON.parse(localStorage.getItem('sh3-convoy')) || [];

// DOM Elements
const elements = {
  themeToggle: document.getElementById('theme-toggle'),
  themeIcon: document.getElementById('theme-icon'),
  themeText: document.getElementById('theme-text'),
  languageToggle: document.getElementById('language-toggle'),
  languageText: document.getElementById('language-text'),
  btnConvoy: document.getElementById('btn-convoy'),
  filterCode: document.getElementById('filter-code'),
  filterFunnel: document.getElementById('filter-funnel'),
  filterSuperstructure: document.getElementById('filter-superstructure'),
  filterShipType: document.getElementById('filter-ship-type'),
  
  // 🏗️ NOUVEAU : Island checkboxes (logique ET)
  islandFront: document.getElementById('island-front'),
  islandMiddle: document.getElementById('island-middle'),
  islandAft: document.getElementById('island-aft'),
  
  btnReset: document.getElementById('btn-reset'),
  resultsCount: document.getElementById('results-count'),
  resultsTotal: document.getElementById('results-total'),
  shipsGrid: document.getElementById('ships-grid'),
  modal: document.getElementById('modal'),
  modalClose: document.getElementById('modal-close'),
  modalTitle: document.getElementById('modal-title'),
  modalImage: document.getElementById('modal-image'),
  modalImageContainer: document.getElementById('modal-image-container'),
  fullscreenImage: document.getElementById('fullscreen-image'),
  imageFullscreen: document.getElementById('image-fullscreen'),
  btnPrev: document.getElementById('btn-prev'),
  btnNext: document.getElementById('btn-next'),
  detailClass: document.getElementById('detail-class'),
  detailCode: document.getElementById('detail-code'),
  detailType: document.getElementById('detail-type'),
  detailLength: document.getElementById('detail-length'),
  detailWidth: document.getElementById('detail-width'),
  detailDraft: document.getElementById('detail-draft'),
  detailMast: document.getElementById('detail-mast'),
  detailSpeed: document.getElementById('detail-speed'),
  detailDisplacement: document.getElementById('detail-displacement'),
  detailRenown: document.getElementById('detail-renown')
};

// Utility functions
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const formatType = (type) => {
  const types = {
    merchants: t('shipTypeMerchant'),
    tankers: t('shipTypeTanker'),
    passengers: t('shipTypePassenger')
  };
  return types[type] || type;
};

const formatFunnel = (pos) => {
  const positions = {
    amidship: t('filterAmidship'),
    aft: t('filterAft'),
    unspecified: t('filterUnspecified')
  };
  return positions[pos] || pos;
};

const formatSuperstructure = (type) => {
  const types = {
    composite: t('filterComposite'),
    split: t('filterSplit'),
    passenger: t('filterPassenger'),
    unspecified: t('filterUnspecified')
  };
  return types[type] || type;
};

// Initialize
function init() {
  console.log('[APP] Initializing...');
  
  // Load data from inline script
  state.allShips = window.SHIPS_DATA || [];
  state.filteredShips = [...state.allShips];
  
  // Load saved language
  const savedLang = localStorage.getItem('sh3-language');
  if (savedLang && CONFIG.availableLanguages.includes(savedLang)) {
    state.language = savedLang;
  } else {
    // Detect browser language
    const browserLang = navigator.language.substring(0, 2);
    state.language = CONFIG.availableLanguages.includes(browserLang) ? browserLang : CONFIG.defaultLanguage;
  }
  
  console.log(`[APP] Loaded ${state.allShips.length} ships`);
  console.log(`[APP] Language: ${state.language}`);
  
  // Setup event listeners
  setupEventListeners();
  
  // Apply translations
  updateUILanguage();
  
  // Initial render
  renderShips();
  
  console.log('[APP] Initialization complete');
}

// Update UI with current language
function updateUILanguage() {
  // Update language toggle text
  const langNames = { fr: '🇫🇷 Français', en: '🇬🇧 English', de: '🇩🇪 Deutsch' };
  elements.languageText.textContent = langNames[state.language];
  
  // Update theme toggle
  elements.themeIcon.textContent = state.theme === 'light' ? '🌙' : '☀️';
  elements.themeText.textContent = state.theme === 'light' ? t('themeLight') : t('themeDark');

  // Update filter labels
  document.querySelector('label[for="filter-code"]').textContent = t('filterCodeLabel');
  document.querySelector('label[for="filter-funnel"]').textContent = t('filterFunnelLabel');
  document.querySelector('label[for="filter-superstructure"]').textContent = t('filterSuperstructureLabel');
  document.querySelector('label[for="filter-ship-type"]').textContent = t('filterShipTypeLabel');
  
  // Update filter placeholders
  elements.filterCode.placeholder = t('filterCodePlaceholder');
  
  // Update select options
  updateSelectOptions();
  
  // Update buttons
  const resetBtn = elements.btnReset;
  resetBtn.innerHTML = `<span>🔄</span><span>${t('btnReset')}</span>`;
  
  // Update convoy button
  if (elements.btnConvoy) {
    elements.btnConvoy.innerHTML = `📦 ${t('Convoi')}`;
  }
  
  // Update results label
  document.querySelector('.results-counter span:first-child').textContent = t('resultsLabel');
  document.querySelector('.results-counter span:last-child').textContent = t('resultsShips');
  
  // Update modal navigation hint
  document.querySelector('.modal-nav-hint').textContent = t('modalNavHint');
  
  // Update modal navigation buttons
  elements.btnPrev.innerHTML = `<span>←</span><span>${t('btnPrevious')}</span>`;
  elements.btnNext.innerHTML = `<span>${t('btnNext')}</span><span>→</span>`;
  
  // Update detail section titles
  document.querySelectorAll('.detail-section-title')[0].textContent = t('detailIdentification');
  document.querySelectorAll('.detail-section-title')[1].textContent = t('detailDimensions');
  document.querySelectorAll('.detail-section-title')[2].textContent = t('detailPerformance');
  
  // Update detail labels
  document.querySelectorAll('.detail-label')[0].textContent = t('detailClass');
  document.querySelectorAll('.detail-label')[1].textContent = t('detailCode');
  document.querySelectorAll('.detail-label')[2].textContent = t('detailType');
  document.querySelectorAll('.detail-label')[3].textContent = t('detailLength');
  document.querySelectorAll('.detail-label')[4].textContent = t('detailWidth');
  document.querySelectorAll('.detail-label')[5].textContent = t('detailDraft');
  document.querySelectorAll('.detail-label')[6].textContent = t('detailMast');
  document.querySelectorAll('.detail-label')[7].textContent = t('detailSpeed');
  document.querySelectorAll('.detail-label')[8].textContent = t('detailDisplacement');
  document.querySelectorAll('.detail-label')[9].textContent = t('detailRenown');
  
  // Update results count display
  elements.resultsTotal.textContent = state.allShips.length;
  elements.resultsCount.textContent = state.filteredShips.length;
  
  // Update convoy button in modal if visible
  const btnAddConvoy = document.getElementById('btn-add-convoy');
  if (btnAddConvoy && state.currentModalIndex !== -1) {
    const currentShip = state.filteredShips[state.currentModalIndex];
    if (currentShip) {
      updateConvoyButton(currentShip.id);
    }
  }

  // 🏗️ NOUVEAU : Mettre à jour les labels Islands
  const filterIslandsLabel = document.getElementById('filterIslandsLabel');
  if (filterIslandsLabel) {
    filterIslandsLabel.textContent = t('filterIslandsLabel');
  }
  
  const islandFrontLabel = document.getElementById('islandFrontLabel');
  if (islandFrontLabel) {
    islandFrontLabel.textContent = t('islandFront');
  }
  
  const islandMiddleLabel = document.getElementById('islandMiddleLabel');
  if (islandMiddleLabel) {
    islandMiddleLabel.textContent = t('islandMiddle');
  }
  
  const islandAftLabel = document.getElementById('islandAftLabel');
  if (islandAftLabel) {
    islandAftLabel.textContent = t('islandAft');
  }
}

// Update select dropdowns with translations
function updateSelectOptions() {
  // Funnel position
  elements.filterFunnel.innerHTML = `
    <option value="">${t('filterAll')}</option>
    <option value="amidship">${t('filterAmidship')}</option>
    <option value="aft">${t('filterAft')}</option>
    <option value="unspecified">${t('filterUnspecified')}</option>
  `;
  
  // Superstructure
  elements.filterSuperstructure.innerHTML = `
    <option value="">${t('filterAll')}</option>
    <option value="composite">${t('filterComposite')}</option>
    <option value="split">${t('filterSplit')}</option>
    <option value="passenger">${t('filterPassenger')}</option>
    <option value="unspecified">${t('filterUnspecified')}</option>
  `;
  
  // Ship type
  elements.filterShipType.innerHTML = `
    <option value="">${t('filterAll')}</option>
    <option value="merchants">${t('filterMerchants')}</option>
    <option value="tankers">${t('filterTankers')}</option>
    <option value="passengers">${t('filterPassengers')}</option>
  `;
}

// Toggle language
function toggleLanguage() {
  const currentIndex = CONFIG.availableLanguages.indexOf(state.language);
  const nextIndex = (currentIndex + 1) % CONFIG.availableLanguages.length;
  state.language = CONFIG.availableLanguages[nextIndex];
  localStorage.setItem('sh3-language', state.language);
  
  updateUILanguage();
  renderShips(); // Re-render with new language
}

// Render ships grid
function renderShips() {
  const { filteredShips } = state;
  
  if (filteredShips.length === 0) {
    elements.shipsGrid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">${t('noResultsIcon')}</div>
        <div class="no-results-text">${t('noResults')}</div>
      </div>
    `;
    return;
  }
  
  elements.shipsGrid.innerHTML = filteredShips.map((ship, index) => `
    <article class="ship-card" data-index="${index}" tabindex="0" role="button" aria-label="${t('detailClass')} ${ship.className}, ${t('detailCode')} ${ship.code}">
      <div class="ship-image-container">
        <div class="ship-image-placeholder">🚢</div>
        <img class="ship-image" data-src="${ship.silhouette}" alt="${ship.className}" loading="lazy">
      </div>
      <div class="ship-info">
        <div class="ship-name">${ship.className}</div>
        <div class="ship-code code-mfk">${ship.code}</div>
        <div class="ship-dimensions">${ship.length}${t('unitMeters')}</div>
      </div>
    </article>
  `).join('');
  
  // Add click handlers
  document.querySelectorAll('.ship-card').forEach((card, idx) => {
    card.addEventListener('click', () => openModal(idx));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(idx);
      }
    });
  });
  
  // Setup lazy loading
  setupLazyLoading();
}

// Lazy loading for images
function setupLazyLoading() {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        if (src) {
          const tempImg = new Image();
          tempImg.onload = () => {
            img.src = src;
            img.style.display = 'block';
            const placeholder = img.previousElementSibling;
            if (placeholder) placeholder.style.display = 'none';
          };
          tempImg.onerror = () => { img.style.display = 'none'; };
          tempImg.src = src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '50px 0px', threshold: 0.01 });
  
  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Apply filters
function applyFilters() {
  const code = elements.filterCode.value.trim().toUpperCase();
  const funnel = elements.filterFunnel.value;
  const superstructure = elements.filterSuperstructure.value;
  const shipType = elements.filterShipType.value;
  
  // Récupérer les checkboxes cochées
  const wantFront = elements.islandFront.checked;
  const wantMiddle = elements.islandMiddle.checked;
  const wantAft = elements.islandAft.checked;
  
  state.filteredShips = state.allShips.filter(ship => {
    // Filtres texte/sélect existants
    if (code && !(ship.code || '').toUpperCase().includes(code)) return false;
    if (funnel && ship.funnelPosition !== funnel) return false;
    if (superstructure && ship.superstructure !== superstructure) return false;
    if (shipType && ship.shipType !== shipType) return false;
    
    // 🏗️ Filtre Islands - Logique ET (exacte correspondance)
    // Si AUCUNE checkbox n'est cochée = afficher tous les navires
    if (!wantFront && !wantMiddle && !wantAft) {
      return true;
    }
    
    const shipIslands = ship.islands || [];
    
    // Vérifier l'EXACT correspondance
    // Chaque île cochée DOIT être présente
    // Chaque île NON cochée DOIT être absente
    
    if (wantFront && !shipIslands.includes('front')) return false;
    if (!wantFront && shipIslands.includes('front')) return false;
    
    if (wantMiddle && !shipIslands.includes('middle')) return false;
    if (!wantMiddle && shipIslands.includes('middle')) return false;
    
    if (wantAft && !shipIslands.includes('aft')) return false;
    if (!wantAft && shipIslands.includes('aft')) return false;
    
    return true;
  });
  
  elements.resultsCount.textContent = state.filteredShips.length;
  renderShips();
}

// Reset filters
function resetFilters() {
  elements.filterCode.value = '';
  elements.filterFunnel.value = '';
  elements.filterSuperstructure.value = '';
  elements.filterShipType.value = '';
  
 // 🏗️ NOUVEAU : Décocher tous les islands
  elements.islandFront.checked = false;
  elements.islandMiddle.checked = false;
  elements.islandAft.checked = false;
  
  state.filteredShips = [...state.allShips];
  elements.resultsCount.textContent = state.allShips.length;
  renderShips();
}

// Open modal
function openModal(index) {
  if (index < 0 || index >= state.filteredShips.length) return;
  
  state.currentModalIndex = index;
  const ship = state.filteredShips[index];
  
  elements.modalImage.src = ship.silhouette;
  elements.fullscreenImage.src = ship.silhouette;
  elements.modalTitle.textContent = ship.className;
  elements.detailClass.textContent = ship.className;
  elements.detailCode.textContent = ship.code || 'N/A';
  elements.detailType.textContent = formatType(ship.shipType);
  elements.detailLength.textContent = ship.length ? `${ship.length}${t('unitMeters')}` : 'N/A';
  elements.detailWidth.textContent = ship.width ? `${ship.width}${t('unitMeters')}` : 'N/A';
  elements.detailDraft.textContent = ship.draft ? `${ship.draft}${t('unitMeters')}` : 'N/A';
  elements.detailMast.textContent = ship.mast ? `${ship.mast}${t('unitMeters')}` : 'N/A';
  elements.detailSpeed.textContent = ship.maxSpeed ? `${ship.maxSpeed} ${t('unitKnots')}` : 'N/A';
  elements.detailDisplacement.textContent = ship.displacement ? `${ship.displacement}${t('unitTons')}` : 'N/A';
  elements.detailRenown.textContent = ship.renownAwarded ? `${ship.renownAwarded} ${t('unitPoints')}` : 'N/A';

  // Activer le bouton Convoi dans la modale
  updateConvoyButton(ship.id);
  document.getElementById('btn-add-convoy').onclick = () => toggleConvoy(ship);
  
  elements.modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  updateModalNav();
}

// Close modal
function closeModal() {
  elements.modal.classList.remove('active');
  document.body.style.overflow = '';
  state.currentModalIndex = -1;
}

// Update modal navigation buttons
function updateModalNav() {
  elements.btnPrev.disabled = state.currentModalIndex <= 0;
  elements.btnNext.disabled = state.currentModalIndex >= state.filteredShips.length - 1;
}

// Navigate to previous ship
function prevShip() {
  if (state.currentModalIndex > 0) {
    openModal(state.currentModalIndex - 1);
  }
}

// Navigate to next ship
function nextShip() {
  if (state.currentModalIndex < state.filteredShips.length - 1) {
    openModal(state.currentModalIndex + 1);
  }
}

// Toggle fullscreen image
function toggleFullscreen() {
  elements.imageFullscreen.classList.toggle('active');
}

// Toggle theme
function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  elements.themeIcon.textContent = state.theme === 'light' ? '🌙' : '☀️';
  elements.themeText.textContent = state.theme === 'light' ? t('themeLight') : t('themeDark');
  localStorage.setItem('sh3-theme', state.theme);
}

// Setup event listeners
function setupEventListeners() {
  // Theme toggle
  elements.themeToggle.addEventListener('click', toggleTheme);
  
  // Language toggle
  elements.languageToggle.addEventListener('click', toggleLanguage);
  
  // Filters
  const debouncedFilter = debounce(applyFilters, CONFIG.debounceDelay);
  elements.filterCode.addEventListener('input', debouncedFilter);
  elements.filterFunnel.addEventListener('change', applyFilters);
  elements.filterSuperstructure.addEventListener('change', applyFilters);
  elements.filterShipType.addEventListener('change', applyFilters);
  
  // 🏗️ NOUVEAU : Event listeners pour islands (checkboxes)
  elements.islandFront.addEventListener('change', applyFilters);
  elements.islandMiddle.addEventListener('change', applyFilters);
  elements.islandAft.addEventListener('change', applyFilters);
  
  // Reset button
  elements.btnReset.addEventListener('click', resetFilters);
  
  // Convoy button
  if (elements.btnConvoy) {
    elements.btnConvoy.addEventListener('click', showConvoy);
  }
  
  // Modal
  elements.modalClose.addEventListener('click', closeModal);
  elements.btnPrev.addEventListener('click', prevShip);
  elements.btnNext.addEventListener('click', nextShip);
  elements.modal.addEventListener('click', (e) => { if (e.target === elements.modal) closeModal(); });
  elements.modalImageContainer.addEventListener('click', toggleFullscreen);
  elements.imageFullscreen.addEventListener('click', toggleFullscreen);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!elements.modal.classList.contains('active')) return;
    switch (e.key) {
      case 'Escape':
        if (elements.imageFullscreen.classList.contains('active')) {
          toggleFullscreen();
        } else {
          closeModal();
        }
        break;
      case 'ArrowLeft': prevShip(); break;
      case 'ArrowRight': nextShip(); break;
    }
  });
  
  // Load saved theme
  const savedTheme = localStorage.getItem('sh3-theme');
  if (savedTheme) {
    state.theme = savedTheme;
    document.documentElement.setAttribute('data-theme', state.theme);
    elements.themeIcon.textContent = state.theme === 'light' ? '🌙' : '☀️';
    elements.themeText.textContent = state.theme === 'light' ? t('themeDark') : t('themeLight');
  }
}

//-----------------------------------------------------
// 🔹 SYSTEME DE LISTE DE NAVIRES PAR CONVOI
//-----------------------------------------------------

function toggleConvoy(currentShip) {
  const index = state.convoy.findIndex(s => s.id === currentShip.id);

  if (index === -1) {
    // Ajouter le navire - STOCKER TOUTES LES PROPRIÉTÉS
    state.convoy.push({ ...currentShip }); // Spread operator pour copier toutes les propriétés
  } else {
    // Retirer le navire
    state.convoy.splice(index, 1);
  }

  localStorage.setItem('sh3-convoy', JSON.stringify(state.convoy));
  updateConvoyButton(currentShip.id);
}

function updateConvoyButton(shipId) {
  const btn = document.getElementById('btn-add-convoy');
  const isInConvoy = state.convoy.some(s => s.id === shipId);

  if (!btn) return;
  
  // Utiliser les traductions AVEC LES LOGOS
  if (isInConvoy) {
    btn.innerHTML = `❌ ${t('Retirer du convoi')}`;
    btn.classList.add('active-convoy');
  } else {
    btn.innerHTML = `➕ ${t('Ajouter au convoi')}`;
    btn.classList.remove('active-convoy');
  }
}

function showConvoy() {
  if (state.convoy.length === 0) {
    alert(t('emptyConvoy'));
    return;
  }

  state.filteredShips = [...state.convoy];
  elements.resultsCount.textContent = state.convoy.length;
  renderShips();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Start app
document.addEventListener('DOMContentLoaded', init);