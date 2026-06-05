/* js/videos.js - Módulo de Videos (Sonia) */

// Base de datos de videos infantiles educativos seguros de YouTube Kids
const VIDEOS_DATA = [
  {
    number: 1,
    name: "Yo Me Lavo Así",
    desc: "Higiene con Plim Plim",
    url: "https://www.youtube.com/embed/r4473N6Xy5I?autoplay=1&mute=0&rel=0&showinfo=0"
  },
  {
    number: 2,
    name: "Baby Shark Español",
    desc: "Baila con Pinkfong",
    url: "https://www.youtube.com/embed/DCR8xe27x20?autoplay=1&mute=0&rel=0&showinfo=0"
  },
  {
    number: 3,
    name: "Bartolito",
    desc: "La Granja de Zenón",
    url: "https://www.youtube.com/embed/m69Z3J-rTqY?autoplay=1&mute=0&rel=0&showinfo=0"
  }
];

let tvPoweredOn = true;
let activeChannelIdx = 0;
let currentRotationAngle = 0;

window.initVideos = function() {
  const contentArea = document.getElementById('videos-content-area');
  if (!contentArea) return;

  renderTvLayout(contentArea);
  
  // Explicación interactiva por voz de Sonia
  setTimeout(() => {
    speakText('¡Hola! Soy Sonia. Bienvenida a mi rincón de videos. Pulsa los botones para cambiar de canal en la tele retro. ¡Disfruta de las canciones!');
  }, 500);
};

window.closeVideos = function() {
  // Asegurar que el iframe se borra al cerrar el modal para detener el sonido de fondo
  const screen = document.getElementById('tv-screen-content');
  if (screen) {
    screen.innerHTML = '';
  }
};

// Dibujar la televisión retro y el selector de canales
function renderTvLayout(container) {
  const currentVideo = VIDEOS_DATA[activeChannelIdx];

  container.innerHTML = `
    <div class="videos-container">
      
      <!-- Gabinete de la TV Retro -->
      <div class="retro-tv-cabinet">
        <!-- Antenas decorativas -->
        <div class="tv-antenna-left"></div>
        <div class="tv-antenna-ball"></div>
        <div class="tv-antenna-right"></div>
        <div class="tv-antenna-ball"></div>

        <!-- Pantalla CRT -->
        <div class="tv-screen-wrapper">
          <div id="tv-screen-content" class="tv-screen ${tvPoweredOn ? 'tv-on' : 'tv-off'}">
            <!-- Estática analógica transitoria -->
            <div id="tv-static-layer" class="tv-static-noise"></div>
            
            <!-- Iframe del Video -->
            ${tvPoweredOn ? `<iframe src="${currentVideo.url}" allow="autoplay; encrypted-media" allowfullscreen></iframe>` : ''}
          </div>
        </div>

        <!-- Controles Físicos Inferiores -->
        <div class="tv-controls-panel">
          <!-- Parlante / Altavoz -->
          <div class="tv-speakers">
            <div class="speaker-line"></div>
            <div class="speaker-line"></div>
            <div class="speaker-line"></div>
            <div class="speaker-line"></div>
            <div class="speaker-line"></div>
          </div>

          <!-- Perillas rotativas y botón encendido -->
          <div class="tv-knob-wrapper">
            <!-- Perilla Canales -->
            <div class="tv-knob" id="tv-channel-knob" title="Perilla de canal" style="transform: rotate(0deg)"></div>
            
            <!-- Botón de Encendido -->
            <button class="btn-power-tv" id="tv-power-btn" title="Apagar / Encender">
              <svg viewBox="0 0 24 24">
                <path d="M16 9v-4l-8 4 8 4v-4zm-2 0h-4v2h4v-2zm-6-6v2h12v-2h-12zM3 17h18v-2h-18v2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Menú de Canales (Stickers en la pared) -->
      <div class="tv-channels-panel">
        <h3 class="channels-title">Canales</h3>
        
        ${VIDEOS_DATA.map((video, idx) => `
          <button class="channel-btn ${idx === activeChannelIdx ? 'active' : ''}" data-idx="${idx}">
            <div class="channel-number">${video.number}</div>
            <div class="channel-info">
              <span class="channel-name">${video.name}</span>
              <span class="channel-desc">${video.desc}</span>
            </div>
          </button>
        `).join('')}
      </div>

    </div>
  `;

  // Asignar controladores de eventos
  setupTvEventListeners();
}

function setupTvEventListeners() {
  const powerBtn = document.getElementById('tv-power-btn');
  const knob = document.getElementById('tv-channel-knob');
  const channelBtns = document.querySelectorAll('.channel-btn');

  // Botón Encendido/Apagado
  powerBtn.addEventListener('click', () => {
    sounds.playPop();
    toggleTvPower();
  });

  // Perilla de Canales
  knob.addEventListener('click', () => {
    if (!tvPoweredOn) return;
    
    // Cambiar secuencialmente al hacer clic en la perilla
    const nextIdx = (activeChannelIdx + 1) % VIDEOS_DATA.length;
    sounds.playPop();
    changeChannel(nextIdx);
  });

  // Botones de canal estilo stickers
  channelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (!tvPoweredOn) {
        // Encender automáticamente si está apagada al presionar un canal
        tvPoweredOn = true;
      }
      const idx = parseInt(btn.getAttribute('data-idx'));
      sounds.playPop();
      changeChannel(idx);
    });
  });
}

// Encender o Apagar la Tele
function toggleTvPower() {
  const screen = document.getElementById('tv-screen-content');
  tvPoweredOn = !tvPoweredOn;

  if (tvPoweredOn) {
    screen.className = 'tv-screen tv-on';
    // Reiniciar video
    changeChannel(activeChannelIdx);
  } else {
    screen.className = 'tv-screen tv-off';
    setTimeout(() => {
      screen.innerHTML = '<div id="tv-static-layer" class="tv-static-noise"></div>';
    }, 150); // Tiempo para simular el destello blanco apagándose
  }
}

// Cambiar de canal con efecto estática
function changeChannel(channelIdx) {
  activeChannelIdx = channelIdx;
  
  const screen = document.getElementById('tv-screen-content');
  const staticLayer = document.getElementById('tv-static-layer');
  const channelBtns = document.querySelectorAll('.channel-btn');
  const knob = document.getElementById('tv-channel-knob');
  
  if (!screen || !tvPoweredOn) return;

  // Actualizar clases activas en los botones de canal
  channelBtns.forEach((btn, idx) => {
    if (idx === activeChannelIdx) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Rotar visualmente la perilla física de la TV
  currentRotationAngle += 120; // 3 canales -> 120 grados cada uno
  knob.style.transform = `rotate(${currentRotationAngle}deg)`;

  // Efecto de estática analógica
  staticLayer.classList.add('active');

  // Sonido de cambio de canal
  sounds.playPop();

  setTimeout(() => {
    // Cargar el nuevo iframe
    const currentVideo = VIDEOS_DATA[activeChannelIdx];
    screen.innerHTML = `
      <div id="tv-static-layer" class="tv-static-noise"></div>
      <iframe src="${currentVideo.url}" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    `;
    
    // Apagar la estática una vez cargado
    const newStatic = document.getElementById('tv-static-layer');
    setTimeout(() => {
      newStatic.classList.remove('active');
    }, 100);
  }, 250);
}
