/* js/cuentos.js - Módulo de Cuentos (Miss Diana) */


// Base de datos de cuentos con ilustraciones vectoriales
const CUENTOS_DATA = [
  {
    id: 0,
    title: "El Oso y la Estrella Perdida",
    thumb: `<svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#FFE082" stroke="#333" stroke-width="4"/>
      <!-- Bear -->
      <circle cx="45" cy="55" r="16" fill="#8D6E63" stroke="#333" stroke-width="3"/>
      <circle cx="34" cy="42" r="5" fill="#8D6E63" stroke="#333" stroke-width="3"/>
      <circle cx="56" cy="42" r="5" fill="#8D6E63" stroke="#333" stroke-width="3"/>
      <circle cx="45" cy="55" r="11" fill="#FFECB3"/>
      <ellipse cx="45" cy="53" rx="4" ry="3" fill="#333"/>
      <!-- Star -->
      <polygon points="75,25 78,33 86,34 80,40 82,48 75,43 68,48 70,40 64,34 72,33" fill="#FFD54F" stroke="#333" stroke-width="2.5" stroke-linejoin="round"/>
    </svg>`,
    pages: [
      {
        text: "Había una vez un pequeño osito llamado Bernardo. A Bernardo le encantaba mirar las brillantes estrellas en el cielo antes de dormir.",
        illustration: `<svg viewBox="0 0 200 200">
          <rect width="200" height="200" fill="#1A237E"/>
          <!-- Moon -->
          <circle cx="160" cy="40" r="20" fill="#FFF59D"/>
          <circle cx="150" cy="40" r="20" fill="#1A237E"/>
          <!-- Stars -->
          <circle cx="30" cy="30" r="3" fill="#FFF"/>
          <circle cx="80" cy="50" r="2" fill="#FFF"/>
          <circle cx="120" cy="25" r="3" fill="#FFF"/>
          <!-- Hills -->
          <path d="M -20 200 Q 60 140 130 180 T 220 160 L 220 200 Z" fill="#2E7D32" stroke="#333" stroke-width="4"/>
          <!-- Bear Bernardo -->
          <g transform="translate(60, 110)" stroke="#333" stroke-width="4" stroke-linejoin="round">
            <circle cx="20" cy="12" r="7" fill="#8D6E63"/> <!-- Ear L -->
            <circle cx="40" cy="12" r="7" fill="#8D6E63"/> <!-- Ear R -->
            <circle cx="30" cy="25" r="18" fill="#8D6E63"/> <!-- Head -->
            <circle cx="30" cy="27" r="10" fill="#FFECB3"/> <!-- Snout -->
            <circle cx="24" cy="22" r="2.5" fill="#222"/> <!-- Eye L -->
            <circle cx="36" cy="22" r="2.5" fill="#222"/> <!-- Eye R -->
            <circle cx="30" cy="25" r="1" fill="#FFF"/>
            <circle cx="30" cy="28" r="3.5" fill="#333"/> <!-- Nose -->
            <path d="M 12 42 Q 30 38 48 42 L 40 65 L 20 65 Z" fill="#8D6E63"/> <!-- Body -->
          </g>
        </svg>`
      },
      {
        text: "Una noche, Bernardo vio un destello dorado caer del cielo. ¡Pum! Una pequeña estrella se había caído y estaba triste y asustada.",
        illustration: `<svg viewBox="0 0 200 200">
          <rect width="200" height="200" fill="#1A237E"/>
          <!-- Fall streak -->
          <path d="M 20 20 L 120 110" stroke="rgba(255, 235, 59, 0.4)" stroke-width="8" stroke-linecap="round"/>
          <path d="M 20 20 L 120 110" stroke="#FFF" stroke-width="2" stroke-linecap="round"/>
          <!-- Star -->
          <g transform="translate(110, 100)" stroke="#333" stroke-width="4" stroke-linejoin="round">
            <polygon points="20,0 26,14 40,16 30,26 33,40 20,32 7,40 10,26 0,16 14,14" fill="#FFD54F"/>
            <!-- Sad eyes -->
            <circle cx="14" cy="17" r="2" fill="#333"/>
            <circle cx="26" cy="17" r="2" fill="#333"/>
            <path d="M 17 25 Q 20 22 23 25" fill="none" stroke-width="2"/>
          </g>
          <!-- Bear looking -->
          <g transform="translate(20, 120)" stroke="#333" stroke-width="4" stroke-linejoin="round">
            <circle cx="15" cy="20" r="14" fill="#8D6E63"/>
            <circle cx="20" cy="20" r="8" fill="#FFECB3"/>
            <circle cx="17" cy="18" r="2.5" fill="#333"/>
            <path d="M 10 32 C 10 45, 35 45, 35 32" fill="#8D6E63"/>
          </g>
        </svg>`
      },
      {
        text: "Bernardo buscó por el bosque y encontró a la estrellita flotando en una laguna mágica. 'No llores', le dijo el osito con una gran sonrisa.",
        illustration: `<svg viewBox="0 0 200 200">
          <rect width="200" height="200" fill="#0D47A1"/>
          <!-- Forest trees background -->
          <path d="M 10 120 L 25 80 L 40 120 Z M 160 120 L 175 85 L 190 120 Z" fill="#1B5E20" stroke="#333" stroke-width="3"/>
          <!-- Pond -->
          <ellipse cx="100" cy="155" rx="80" ry="30" fill="#29B6F6" stroke="#333" stroke-width="4"/>
          <!-- Glow -->
          <circle cx="100" cy="150" r="25" fill="rgba(255, 235, 59, 0.4)" filter="blur(5px)"/>
          <!-- Floating Star -->
          <g transform="translate(85, 130)" stroke="#333" stroke-width="3" stroke-linejoin="round">
            <polygon points="15,0 19,10 30,12 22,20 24,30 15,24 6,30 8,20 0,12 11,10" fill="#FFD54F"/>
            <circle cx="11" cy="12" r="1.5" fill="#222"/>
            <circle cx="19" cy="12" r="1.5" fill="#222"/>
            <path d="M 13 18 Q 15 20 17 18" fill="none" stroke-width="1.5"/>
          </g>
          <!-- Bear sitting next to pond -->
          <g transform="translate(15, 110)" stroke="#333" stroke-width="4" stroke-linejoin="round">
            <circle cx="20" cy="20" r="15" fill="#8D6E63"/>
            <circle cx="20" cy="22" r="9" fill="#FFECB3"/>
            <circle cx="17" cy="18" r="2" fill="#222"/>
            <circle cx="23" cy="18" r="2" fill="#222"/>
            <circle cx="20" cy="22" r="2" fill="#333"/>
            <path d="M 10 32 C 10 48, 30 48, 30 32 Z" fill="#8D6E63"/>
          </g>
        </svg>`
      },
      {
        text: "Con ayuda de una nube amiga, Bernardo sopló muy fuerte hacia arriba. ¡Fiuuu! La estrellita regresó al cielo, brillando feliz y agradecida para siempre.",
        illustration: `<svg viewBox="0 0 200 200">
          <rect width="200" height="200" fill="#1A237E"/>
          <!-- Sparkles -->
          <path d="M 50 40 L 53 45 L 58 46 L 54 50 L 55 55 L 50 52 L 45 55 L 46 50 L 42 46 L 47 45 Z" fill="#FFF9C4" stroke="#333" stroke-width="2"/>
          <!-- Star back in sky -->
          <g transform="translate(130, 30)" stroke="#333" stroke-width="4" stroke-linejoin="round">
            <polygon points="15,0 19,10 30,12 22,20 24,30 15,24 6,30 8,20 0,12 11,10" fill="#FFD54F"/>
            <circle cx="11" cy="12" r="2" fill="#333"/>
            <circle cx="19" cy="12" r="2" fill="#333"/>
            <path d="M 12 17 Q 15 21 18 17" fill="none" stroke-width="2"/>
          </g>
          <!-- Blowing Cloud -->
          <g transform="translate(80, 110)" stroke="#333" stroke-width="4" stroke-linejoin="round">
            <rect x="0" y="10" width="60" height="25" rx="12" fill="#E0F7FA"/>
            <circle cx="20" cy="10" r="18" fill="#E0F7FA"/>
            <circle cx="42" cy="12" r="14" fill="#E0F7FA"/>
            <!-- Blowing wind lines -->
            <path d="M 65 15 L 90 12 M 65 22 L 95 22 M 65 29 L 88 32" stroke="#FFF" stroke-width="4" stroke-linecap="round"/>
          </g>
          <!-- Bear waving -->
          <g transform="translate(20, 120)" stroke="#333" stroke-width="4" stroke-linejoin="round">
            <circle cx="15" cy="15" r="12" fill="#8D6E63"/>
            <circle cx="15" cy="17" r="7" fill="#FFECB3"/>
            <!-- Waving arm -->
            <path d="M 24 18 Q 32 10 30 5" fill="none" stroke-width="4"/>
            <circle cx="30" cy="5" r="4" fill="#8D6E63"/>
            <path d="M 5 25 C 5 35, 25 35, 25 25 Z" fill="#8D6E63"/>
          </g>
        </svg>`
      }
    ]
  },
  {
    id: 1,
    title: "El Dragón Comelón de Verduras",
    thumb: `<svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#C8E6C9" stroke="#333" stroke-width="4"/>
      <!-- Cute Dragon -->
      <path d="M 30 75 C 30 50, 70 50, 70 75 Z" fill="#4CAF50" stroke="#333" stroke-width="3"/>
      <circle cx="50" cy="45" r="15" fill="#4CAF50" stroke="#333" stroke-width="3"/>
      <circle cx="46" cy="42" r="2.5" fill="#333"/>
      <circle cx="54" cy="42" r="2.5" fill="#333"/>
      <!-- Carrot -->
      <polygon points="50,65 58,68 50,85 42,68" fill="#FF9800" stroke="#333" stroke-width="2"/>
      <path d="M 50 65 Q 52 58 50 56 M 50 65 Q 46 60 44 58" fill="none" stroke="#4CAF50" stroke-width="2"/>
    </svg>`,
    pages: [
      {
        text: "Tito era un pequeño dragón verde que vivía en una cueva de nubes. A diferencia de otros dragones, Tito se sentía cansado y no podía volar.",
        illustration: `<svg viewBox="0 0 200 200">
          <rect width="200" height="200" fill="#E0F7FA"/>
          <!-- Clouds -->
          <ellipse cx="60" cy="150" rx="50" ry="20" fill="#FFF"/>
          <ellipse cx="140" cy="160" rx="60" ry="25" fill="#FFF"/>
          <!-- Sad Tito -->
          <g transform="translate(75, 70)" stroke="#333" stroke-width="4" stroke-linejoin="round">
            <!-- Tail -->
            <path d="M 10 65 Q -10 65 -5 50" fill="none" stroke-width="6"/>
            <!-- Body -->
            <path d="M 15 35 Q 0 65 35 65 Q 50 65 40 35 Z" fill="#81C784"/>
            <!-- Head -->
            <circle cx="28" cy="20" r="16" fill="#81C784"/>
            <!-- Eyes -->
            <circle cx="22" cy="16" r="2" fill="#333"/>
            <circle cx="34" cy="16" r="2" fill="#333"/>
            <!-- Horns -->
            <path d="M 20 6 L 16 1 M 36 6 L 40 1" fill="none" stroke-width="3"/>
            <!-- Wings drooping -->
            <path d="M 5 35 Q -15 30 -5 45" fill="#C8E6C9"/>
            <path d="M 45 35 Q 65 30 55 45" fill="#C8E6C9"/>
          </g>
        </svg>`
      },
      {
        text: "Un día, su maestra Sonia le trajo un plato mágico lleno de deliciosas verduras: zanahorias crujientes, brócolis que parecían arbolitos y tomates jugosos.",
        illustration: `<svg viewBox="0 0 200 200">
          <rect width="200" height="200" fill="#E8F5E9"/>
          <!-- Plate -->
          <ellipse cx="100" cy="140" rx="70" ry="25" fill="#FFF" stroke="#333" stroke-width="4"/>
          <!-- Vegetables -->
          <!-- Carrot -->
          <g transform="translate(60, 115) rotate(-15)" stroke="#333" stroke-width="3">
            <polygon points="0,0 35,8 35,-8" fill="#FF9800"/>
            <path d="M 35 0 L 45 -4 M 35 0 L 43 4" fill="none" stroke="#2E7D32" stroke-width="2"/>
          </g>
          <!-- Broccoli -->
          <g transform="translate(100, 110)" stroke="#333" stroke-width="3" stroke-linejoin="round">
            <rect x="-6" y="10" width="12" height="15" fill="#A1887F"/>
            <circle cx="0" cy="5" r="14" fill="#2E7D32"/>
            <circle cx="-8" cy="-2" r="10" fill="#4CAF50"/>
            <circle cx="8" cy="-2" r="10" fill="#4CAF50"/>
          </g>
          <!-- Tomato -->
          <g transform="translate(135, 125)" stroke="#333" stroke-width="3">
            <circle cx="0" cy="0" r="12" fill="#E53935"/>
            <path d="M -2 -12 L 2 -12 L 0 -8 Z" fill="#2E7D32"/>
          </g>
        </svg>`
      },
      {
        text: "Tito dio un mordisco a la zanahoria... ¡Ñam, ñam! ¡Qué rico! Luego probó el brócoli. De repente, sintió una energía mágica recorrer todo su cuerpo.",
        illustration: `<svg viewBox="0 0 200 200">
          <rect width="200" height="200" fill="#FFF9C4"/>
          <!-- Energy Sparks -->
          <path d="M 40 40 L 45 30 L 50 40 Z M 160 40 L 155 30 L 150 40 Z" fill="#FFEB3B" stroke="#333" stroke-width="3"/>
          <!-- Happy chewing dragon -->
          <g transform="translate(70, 70)" stroke="#333" stroke-width="4" stroke-linejoin="round">
            <path d="M 20 40 Q 5 65 35 65 Q 55 65 45 40 Z" fill="#4CAF50"/>
            <!-- Waving wings -->
            <path d="M 5 35 Q -20 15 -2 30" fill="#81C784"/>
            <path d="M 45 35 Q 70 15 52 30" fill="#81C784"/>
            <!-- Head -->
            <circle cx="30" cy="22" r="18" fill="#4CAF50"/>
            <!-- Cheeks big and round (chewing) -->
            <circle cx="16" cy="26" r="6" fill="#81C784"/>
            <circle cx="44" cy="26" r="6" fill="#81C784"/>
            <ellipse cx="30" cy="26" rx="8" ry="4" fill="#FFEB3B"/> <!-- Food in mouth -->
            <!-- Happy eyes -->
            <path d="M 20 18 Q 24 14 28 18 M 36 18 Q 40 14 44 18" fill="none" stroke-width="3"/>
          </g>
        </svg>`
      },
      {
        text: "¡Tito abrió sus alas gigantes y voló por todo el cielo azul! Desde entonces, Tito come verduras todos los días para ser el dragón más fuerte e inteligente.",
        illustration: `<svg viewBox="0 0 200 200">
          <rect width="200" height="200" fill="#81D4FA"/>
          <!-- White clouds below -->
          <path d="M -20 180 Q 30 160 80 180 T 180 170 Q 220 180 240 160 L 240 200 L -20 200 Z" fill="#FFF"/>
          <!-- Flying Dragon -->
          <g transform="translate(60, 40)" stroke="#333" stroke-width="4" stroke-linejoin="round">
            <!-- Wings expanded wide -->
            <path d="M 20 45 Q -25 15 10 35 Q -10 55 20 50 Z" fill="#A5D6A7"/>
            <path d="M 50 45 Q 95 15 60 35 Q 80 55 50 50 Z" fill="#A5D6A7"/>
            <!-- Body -->
            <path d="M 20 45 Q 35 75 50 45 Z" fill="#4CAF50"/>
            <!-- Tail -->
            <path d="M 35 60 Q 35 80 50 80 Q 60 80 55 70" fill="none" stroke-width="4"/>
            <!-- Head -->
            <circle cx="35" cy="30" r="16" fill="#4CAF50"/>
            <!-- Smiley eyes -->
            <path d="M 27 26 Q 30 29 33 26" fill="none" stroke-width="3"/>
            <path d="M 37 26 Q 40 29 43 26" fill="none" stroke-width="3"/>
            <ellipse cx="35" cy="35" rx="5" ry="3" fill="#FFFDD0"/>
          </g>
        </svg>`
      }
    ]
  },
  {
    id: 2,
    title: "El Barquito de Papel Viajero",
    thumb: `<svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#B3E5FC" stroke="#333" stroke-width="4"/>
      <!-- River Wave -->
      <path d="M 10 70 Q 30 60 50 70 T 90 70" fill="none" stroke="#0288D1" stroke-width="4" stroke-linecap="round"/>
      <!-- Paper Boat -->
      <g transform="translate(18, 25)" stroke="#333" stroke-width="3" stroke-linejoin="round">
        <!-- Sail -->
        <polygon points="32,8 32,32 16,32" fill="#FF5252"/>
        <!-- Hull -->
        <polygon points="8,46 56,46 48,32 16,32" fill="#FFF"/>
      </g>
    </svg>`,
    pages: [
      {
        text: "Juanito hizo un barquito blanco con una hoja de papel brillante. Lo colocó suavemente sobre el agüita cristalina del río del colegio.",
        illustration: `<svg viewBox="0 0 200 200">
          <rect width="200" height="200" fill="#E1F5FE"/>
          <!-- River bed -->
          <path d="M -20 130 C 50 110, 150 150, 220 130 L 220 200 L -20 200 Z" fill="#29B6F6" stroke="#333" stroke-width="4"/>
          <!-- Waves -->
          <path d="M 20 150 Q 50 140 80 150 M 120 160 Q 150 150 180 160" fill="none" stroke="#0288D1" stroke-width="3" stroke-linecap="round"/>
          <!-- Paper Boat -->
          <g transform="translate(65, 95)" stroke="#333" stroke-width="3.5" stroke-linejoin="round">
            <polygon points="35,10 35,40 15,40" fill="#FF5252"/>
            <polygon points="5,58 65,58 55,40 15,40" fill="#FFFFFF"/>
          </g>
          <!-- Kid's hand waving -->
          <g transform="translate(-10, 50)" stroke="#333" stroke-width="4" stroke-linejoin="round">
            <path d="M 0 50 Q 35 45 40 25" fill="none" stroke-width="8"/>
            <circle cx="40" cy="25" r="7" fill="#FFE0B2"/>
          </g>
        </svg>`
      },
      {
        text: "Navegando río abajo, el barquito se encontró con una ranita verde llamada Cleo, que saltaba sobre una gran hoja de loto saludando alegremente.",
        illustration: `<svg viewBox="0 0 200 200">
          <rect width="200" height="200" fill="#E1F5FE"/>
          <!-- River -->
          <path d="M -20 120 C 50 100, 150 140, 220 120 L 220 200 L -20 200 Z" fill="#29B6F6" stroke="#333" stroke-width="4"/>
          <!-- Lily pad -->
          <ellipse cx="140" cy="155" rx="35" ry="10" fill="#2E7D32" stroke="#333" stroke-width="3.5"/>
          <polygon points="140,155 160,150 155,160" fill="#29B6F6"/> <!-- Cutout of pad -->
          <!-- Frog Cleo -->
          <g transform="translate(120, 115)" stroke="#333" stroke-width="3.5" stroke-linejoin="round">
            <ellipse cx="20" cy="25" rx="14" ry="10" fill="#4CAF50"/> <!-- Body -->
            <circle cx="12" cy="13" r="5" fill="#4CAF50"/> <!-- Eye L -->
            <circle cx="28" cy="13" r="5" fill="#4CAF50"/> <!-- Eye R -->
            <circle cx="12" cy="13" r="2" fill="#FFF"/>
            <circle cx="28" cy="13" r="2" fill="#FFF"/>
            <path d="M 12 25 Q 20 32 28 25" fill="none" stroke-width="2.5"/> <!-- Smile -->
          </g>
          <!-- Paper Boat approaching -->
          <g transform="translate(20, 85)" stroke="#333" stroke-width="3.5" stroke-linejoin="round">
            <polygon points="25,5 25,30 10,30" fill="#FF5252"/>
            <polygon points="0,45 50,45 42,30 10,30" fill="#FFFFFF"/>
          </g>
        </svg>`
      },
      {
        text: "¡Glup, glup! Un pececito dorado nadó al lado del barquito, haciéndole cosquillas en la base de papel y salpicando gotitas de agua brillante.",
        illustration: `<svg viewBox="0 0 200 200">
          <rect width="200" height="200" fill="#B3E5FC"/>
          <!-- Waves -->
          <path d="M -20 120 C 50 100, 150 140, 220 120 L 220 200 L -20 200 Z" fill="#0288D1" stroke="#333" stroke-width="4"/>
          <!-- Splash drops -->
          <circle cx="110" cy="95" r="3" fill="#FFF"/>
          <circle cx="120" cy="85" r="4" fill="#FFF"/>
          <!-- Golden Fish jumping -->
          <g transform="translate(100, 100) rotate(-30)" stroke="#333" stroke-width="3.5" stroke-linejoin="round">
            <path d="M 0 10 Q 15 -10 30 10 Q 15 30 0 10 Z" fill="#FF9800"/> <!-- Body -->
            <polygon points="30,10 40,0 40,20" fill="#FFB74D"/> <!-- Tail -->
            <circle cx="8" cy="8" r="2" fill="#333"/>
          </g>
          <!-- Paper Boat -->
          <g transform="translate(25, 80)" stroke="#333" stroke-width="3.5" stroke-linejoin="round">
            <polygon points="25,5 25,30 10,30" fill="#FF5252"/>
            <polygon points="0,45 50,45 42,30 10,30" fill="#FFFFFF"/>
          </g>
        </svg>`
      },
      {
        text: "Al final del día, el barquito llegó a una hermosa bahía decorada con un gran arcoíris. ¡Qué viaje tan maravilloso y divertido!",
        illustration: `<svg viewBox="0 0 200 200">
          <rect width="200" height="200" fill="#E1F5FE"/>
          <!-- Rainbow background -->
          <path d="M 30 200 A 70 70 0 0 1 170 200" fill="none" stroke="#FF5252" stroke-width="10"/>
          <path d="M 40 200 A 60 60 0 0 1 160 200" fill="none" stroke="#FFD54F" stroke-width="10"/>
          <path d="M 50 200 A 50 50 0 0 1 150 200" fill="none" stroke="#4CAF50" stroke-width="10"/>
          <path d="M 60 200 A 40 40 0 0 1 140 200" fill="none" stroke="#2196F3" stroke-width="10"/>
          <!-- River inlet -->
          <path d="M -20 140 C 60 130, 120 160, 220 140 L 220 200 L -20 200 Z" fill="#29B6F6" stroke="#333" stroke-width="4"/>
          <!-- Paper Boat resting -->
          <g transform="translate(75, 110)" stroke="#333" stroke-width="3.5" stroke-linejoin="round">
            <polygon points="25,5 25,30 10,30" fill="#FF5252"/>
            <polygon points="0,45 50,45 42,30 10,30" fill="#FFFFFF"/>
          </g>
        </svg>`
      }
    ]
  }
];

let activeStory = null;
let activePageIdx = 0;

window.initCuentos = function() {
  const contentArea = document.getElementById('cuentos-content-area');
  if (!contentArea) return;

  renderStorySelector(contentArea);
};

window.closeCuentos = function() {
  activeStory = null;
  activePageIdx = 0;
  window.speechSynthesis.cancel();
};

// Renderizar la pantalla de selección de cuentos
function renderStorySelector(container) {
  let html = `
    <div class="cuentos-container">
      <div class="cuentos-selector">
  `;

  CUENTOS_DATA.forEach(story => {
    html += `
      <div class="story-select-card" data-id="${story.id}" role="button" tabindex="0">
        <div class="story-card-thumb">${story.thumb}</div>
        <h3 class="story-card-title">${story.title}</h3>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Añadir eventos a las tarjetas del selector
  const cards = container.querySelectorAll('.story-select-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.getAttribute('data-id'));
      sounds.playPop();
      openStory(id);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = parseInt(card.getAttribute('data-id'));
        sounds.playPop();
        openStory(id);
      }
    });
  });
  
  // Audio instructivo de bienvenida en Cuentos
  setTimeout(() => {
    speakText('¡Hola! Soy Miss Diana. Elige uno de estos hermosos cuentos para que lo leamos juntos. ¡Te va a encantar!');
  }, 500);
}

// Abrir un cuento específico
function openStory(storyId) {
  activeStory = CUENTOS_DATA.find(s => s.id === storyId);
  activePageIdx = 0;
  
  renderBook();
}

// Renderizar el Libro Abierto
function renderBook() {
  const container = document.getElementById('cuentos-content-area');
  if (!container || !activeStory) return;

  const page = activeStory.pages[activePageIdx];
  const isFirstPage = activePageIdx === 0;
  const isLastPage = activePageIdx === activeStory.pages.length - 1;

  container.innerHTML = `
    <div class="cuentos-container">
      <div class="book-viewport">
        
        <!-- Contenedor del Libro Abierto -->
        <div class="book-container">
          <div class="book-spine"></div>
          
          <!-- Página Izquierda (Ilustración) -->
          <div class="book-page left-page">
            <div class="page-illustration">
              ${page.illustration}
            </div>
          </div>
          
          <!-- Página Derecha (Texto del Cuento) -->
          <div class="book-page right-page">
            <div class="page-text-container">
              <p class="story-text" id="story-text-element">${page.text}</p>
            </div>
          </div>
        </div>

        <!-- Controles de Páginas y Audio -->
        <div class="book-controls">
          <button class="control-btn btn-back-selector" id="btn-back-to-selector">
            <span>📚 Elegir Otro</span>
          </button>
          
          <button class="control-btn btn-prev ${isFirstPage ? 'btn-hidden' : ''}" id="btn-prev-page">
            <span>◀ Atrás</span>
          </button>
          
          <button class="control-btn btn-speak" id="btn-read-page" title="Escuchar narración" aria-label="Escuchar narración">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
          </button>

          <span class="page-indicator">Pág. ${activePageIdx + 1} de ${activeStory.pages.length}</span>

          <button class="control-btn btn-next ${isLastPage ? 'btn-hidden' : ''}" id="btn-next-page">
            <span>Siguiente ▶</span>
          </button>
        </div>

      </div>
    </div>
  `;

  // Asignar controladores de eventos
  document.getElementById('btn-back-to-selector').addEventListener('click', () => {
    sounds.playPop();
    activeStory = null;
    renderStorySelector(container);
  });

  const prevBtn = document.getElementById('btn-prev-page');
  if (prevBtn && !isFirstPage) {
    prevBtn.addEventListener('click', () => {
      sounds.playPop();
      activePageIdx--;
      renderBook();
    });
  }

  const nextBtn = document.getElementById('btn-next-page');
  if (nextBtn && !isLastPage) {
    nextBtn.addEventListener('click', () => {
      sounds.playPop();
      activePageIdx++;
      renderBook();
    });
  }

  // Botón de audio lectura
  document.getElementById('btn-read-page').addEventListener('click', () => {
    sounds.playPop();
    speakActivePage();
  });

  // Narración automática al cambiar de página
  speakActivePage();
}

// Leer la página activa
function speakActivePage() {
  if (!activeStory) return;
  const text = activeStory.pages[activePageIdx].text;
  speakText(text);
}
