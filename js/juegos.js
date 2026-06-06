/* js/juegos.js - Módulo de Juegos (Deysi) */

let activeGameId = null;

// Vectores SVG de Animalitos para el juego de memoria
const ANIMAL_ICONS = {
  dog: `<svg viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="#FFE082"/>
    <ellipse cx="50" cy="55" rx="16" ry="12" fill="#8D6E63" stroke="#333" stroke-width="3"/>
    <circle cx="50" cy="50" r="14" fill="#8D6E63" stroke="#333" stroke-width="3"/>
    <!-- Ears -->
    <path d="M 28 32 Q 20 40 24 55" stroke="#333" stroke-width="6" stroke-linecap="round" fill="none"/>
    <path d="M 72 32 Q 80 40 76 55" stroke="#333" stroke-width="6" stroke-linecap="round" fill="none"/>
    <!-- Face -->
    <circle cx="44" cy="46" r="2.5" fill="#333"/>
    <circle cx="56" cy="46" r="2.5" fill="#333"/>
    <ellipse cx="50" cy="52" rx="4" ry="2.5" fill="#222"/>
    <path d="M 47 57 Q 50 60 53 57" fill="none" stroke="#333" stroke-width="2"/>
  </svg>`,
  cat: `<svg viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="#FFCCBC"/>
    <!-- Ears -->
    <polygon points="30,36 34,16 50,30" fill="#FF7043" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
    <polygon points="70,36 66,16 50,30" fill="#FF7043" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
    <!-- Face -->
    <circle cx="50" cy="50" r="16" fill="#FF7043" stroke="#333" stroke-width="3"/>
    <circle cx="44" cy="46" r="2" fill="#333"/>
    <circle cx="56" cy="46" r="2" fill="#333"/>
    <polygon points="50,51 47,48 53,48" fill="#E64A19"/>
    <path d="M 46 54 Q 50 57 54 54" fill="none" stroke="#333" stroke-width="2"/>
  </svg>`,
  frog: `<svg viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="#C8E6C9"/>
    <!-- Eyes -->
    <circle cx="38" cy="34" r="7" fill="#4CAF50" stroke="#333" stroke-width="3"/>
    <circle cx="62" cy="34" r="7" fill="#4CAF50" stroke="#333" stroke-width="3"/>
    <circle cx="38" cy="34" r="2.5" fill="#FFF"/>
    <circle cx="62" cy="34" r="2.5" fill="#FFF"/>
    <!-- Face -->
    <ellipse cx="50" cy="55" rx="18" ry="12" fill="#4CAF50" stroke="#333" stroke-width="3"/>
    <path d="M 42 55 Q 50 63 58 55" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>
    <!-- Blush -->
    <circle cx="38" cy="54" r="2" fill="#FF8A80"/>
    <circle cx="62" cy="54" r="2" fill="#FF8A80"/>
  </svg>`,
  bear: `<svg viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="#D7CCC8"/>
    <!-- Ears -->
    <circle cx="34" cy="32" r="7" fill="#8D6E63" stroke="#333" stroke-width="3"/>
    <circle cx="66" cy="32" r="7" fill="#8D6E63" stroke="#333" stroke-width="3"/>
    <!-- Head -->
    <circle cx="50" cy="52" r="16" fill="#8D6E63" stroke="#333" stroke-width="3"/>
    <circle cx="44" cy="48" r="2.5" fill="#222"/>
    <circle cx="56" cy="48" r="2.5" fill="#222"/>
    <ellipse cx="50" cy="54" rx="6" ry="4" fill="#FFF9C4" stroke="#333" stroke-width="2"/>
    <circle cx="50" cy="53" r="2" fill="#222"/>
  </svg>`
};

window.initJuegos = function() {
  const contentArea = document.getElementById('juegos-content-area');
  if (!contentArea) return;

  renderGamesSelector(contentArea);
  
  // Audio de bienvenida de Deysi
  setTimeout(() => {
    speakText('¡Hola amiguito! Soy Deysi. He preparado tres juegos muy divertidos para ti: Memoria, Globos flotantes y una Pizarra Mágica para que pintes con tus dedos. ¡Escoge el que más te guste!');
  }, 500);
};

window.closeJuegos = function() {
  stopBalloonGame();
  stopDrawingGame();
  stopMoleGame();
  activeGameId = null;
};

// Dibujar el selector principal de juegos
function renderGamesSelector(container) {
  container.innerHTML = `
    <div class="juegos-wrapper">
      <div class="juegos-selector">
        
        <!-- JUEGO 1: MEMORIA -->
        <div class="game-select-card" data-game="memoria" role="button" tabindex="0">
          <div class="game-card-thumb">🐱</div>
          <h3 class="game-card-title">Memoria Divertida</h3>
        </div>

        <!-- JUEGO 2: GLOBOS -->
        <div class="game-select-card" data-game="globos" role="button" tabindex="0">
          <div class="game-card-thumb">🎈</div>
          <h3 class="game-card-title">Revienta Globos</h3>
        </div>

        <!-- JUEGO 3: PIZARRA MÁGICA -->
        <div class="game-select-card" data-game="pizarra" role="button" tabindex="0">
          <div class="game-card-thumb">🎨</div>
          <h3 class="game-card-title">Pizarra Mágica</h3>
        </div>

        <!-- JUEGO 4: ATRAPA AL TOPO -->
        <div class="game-select-card" data-game="topo" role="button" tabindex="0">
          <div class="game-card-thumb">🐹</div>
          <h3 class="game-card-title">Atrapa al Topo</h3>
        </div>

      </div>
    </div>
  `;

  const cards = container.querySelectorAll('.game-select-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const gameKey = card.getAttribute('data-game');
      sounds.playPop();
      startSelectedGame(gameKey);
    });
  });
}

function startSelectedGame(gameKey) {
  activeGameId = gameKey;
  const container = document.getElementById('juegos-content-area');
  if (!container) return;

  if (gameKey === 'memoria') {
    initMemoryGame(container);
  } else if (gameKey === 'globos') {
    initBalloonGame(container);
  } else if (gameKey === 'pizarra') {
    initDrawingGame(container);
  } else if (gameKey === 'topo') {
    initMoleGame(container);
  }
}

// Regresar al menú de selección de juegos
function backToGamesMenu() {
  closeJuegos();
  const container = document.getElementById('juegos-content-area');
  if (container) {
    renderGamesSelector(container);
  }
}

/* ==========================================
   1. JUEGO DE MEMORIA (MEMORY GAME)
   ========================================== */
let memoryCards = [];
let memoryFlipped = [];
let memoryMatchesCount = 0;

function initMemoryGame(container) {
  memoryFlipped = [];
  memoryMatchesCount = 0;

  // Generar 4 pares de animalitos = 8 cartas en total
  const keys = ['dog', 'cat', 'frog', 'bear'];
  const doubled = [...keys, ...keys];
  
  // Mezclar baraja (Fisher-Yates)
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }

  container.innerHTML = `
    <div class="juegos-wrapper">
      <div class="active-game-viewport">
        
        <!-- Cabecera del juego -->
        <div class="game-header-bar">
          <button class="control-btn btn-back-selector" id="btn-game-back">
            <span>🎮 Otros Juegos</span>
          </button>
          <div class="game-hud-item" id="memory-score-hud">Parejas: 0 / 4</div>
          <button class="control-btn btn-prev" id="btn-memory-restart">
            <span>🔄 Reiniciar</span>
          </button>
        </div>

        <!-- Tablero de Cartas -->
        <div class="memory-board" id="memory-board-grid">
          ${doubled.map((animalKey, idx) => `
            <div class="memory-card" data-animal="${animalKey}" data-idx="${idx}">
              <div class="memory-card-face memory-card-front"></div>
              <div class="memory-card-face memory-card-back">
                ${ANIMAL_ICONS[animalKey]}
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    </div>
  `;

  // Asignar eventos
  document.getElementById('btn-game-back').addEventListener('click', backToGamesMenu);
  document.getElementById('btn-memory-restart').addEventListener('click', () => {
    sounds.playPop();
    initMemoryGame(container);
  });

  const cards = container.querySelectorAll('.memory-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      handleMemoryCardClick(card);
    });
  });

  speakText('¡Juguemos a la Memoria! Encuentra las parejas iguales de animalitos haciendo clic en las tarjetas.');
}

function handleMemoryCardClick(card) {
  // Evitar pulsar cartas ya volteadas, emparejadas o si ya hay 2 volteadas en curso
  if (card.classList.contains('flipped') || card.classList.contains('matched') || memoryFlipped.length >= 2) {
    return;
  }

  sounds.playPop();
  card.classList.add('flipped');
  memoryFlipped.push(card);

  if (memoryFlipped.length === 2) {
    const card1 = memoryFlipped[0];
    const card2 = memoryFlipped[1];
    const animal1 = card1.getAttribute('data-animal');
    const animal2 = card2.getAttribute('data-animal');

    if (animal1 === animal2) {
      // ¡Es una coincidencia!
      setTimeout(() => {
        card1.classList.add('matched');
        card2.classList.add('matched');
        sounds.playChime();
        memoryMatchesCount++;
        document.getElementById('memory-score-hud').textContent = `Parejas: ${memoryMatchesCount} / 4`;
        
        memoryFlipped = [];

        // Comprobar victoria
        if (memoryMatchesCount === 4) {
          setTimeout(() => {
            speakText('¡Felicidades! ¡Has encontrado todas las parejas de animalitos! ¡Eres genial!');
            alert('🌟 ¡Excelente! ¡Ganaste! 🌟');
          }, 400);
        }
      }, 500);
    } else {
      // No coincide, voltear de vuelta
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        sounds.playBuzz();
        memoryFlipped = [];
      }, 1000);
    }
  }
}


/* ==========================================
   2. REVIENTA GLOBOS (BALLOON POP GAME)
   ========================================== */
let balloonScore = 0;
let balloonSpawnInterval = null;
let activeBalloons = [];

function initBalloonGame(container) {
  balloonScore = 0;
  activeBalloons = [];

  container.innerHTML = `
    <div class="juegos-wrapper">
      <div class="active-game-viewport">
        
        <div class="game-header-bar">
          <button class="control-btn btn-back-selector" id="btn-game-back">
            <span>🎮 Otros Juegos</span>
          </button>
          <div class="game-hud-item" id="balloon-score-hud">Globos: 0</div>
          <button class="control-btn btn-prev" id="btn-balloon-reset">
            <span>🔄 Reiniciar</span>
          </button>
        </div>

        <!-- Área de Juego (Cielo) -->
        <div class="balloon-game-area" id="balloon-playground"></div>

      </div>
    </div>
  `;

  document.getElementById('btn-game-back').addEventListener('click', backToGamesMenu);
  document.getElementById('btn-balloon-reset').addEventListener('click', () => {
    sounds.playPop();
    stopBalloonGame();
    initBalloonGame(container);
  });

  // Empezar a generar globos
  balloonSpawnInterval = setInterval(spawnBalloon, 1200);

  speakText('¡Revienta Globos! Toca los globos de colores antes de que se escapen volando hacia las nubes.');
}

function spawnBalloon() {
  const playground = document.getElementById('balloon-playground');
  if (!playground) return;

  const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  const balloon = document.createElement('div');
  balloon.className = `balloon balloon-${randomColor}`;
  balloon.innerHTML = `<div class="balloon-highlight"></div>`;

  // Configuración de tamaño e inicio aleatorio
  const startX = Math.random() * (playground.clientWidth - 80);
  balloon.style.left = `${startX}px`;
  
  playground.appendChild(balloon);
  activeBalloons.push(balloon);

  // Animación del globo flotando hacia arriba usando requestAnimationFrame
  let bottomPos = -100;
  const speed = 1.5 + Math.random() * 2; // velocidad aleatoria

  function floatUp() {
    if (!activeGameId || activeGameId !== 'globos' || !balloon.parentNode) {
      return;
    }

    bottomPos += speed;
    balloon.style.bottom = `${bottomPos}px`;

    // Si llega arriba de la pantalla, removerlo
    if (bottomPos > playground.clientHeight) {
      balloon.remove();
      activeBalloons = activeBalloons.filter(b => b !== balloon);
    } else {
      requestAnimationFrame(floatUp);
    }
  }

  requestAnimationFrame(floatUp);

  // Evento al reventar el globo
  balloon.addEventListener('mousedown', (e) => {
    e.preventDefault();
    popBalloon(balloon);
  });

  balloon.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevenir mousedown redundante
    popBalloon(balloon);
  });
}

function popBalloon(balloon) {
  if (balloon.classList.contains('popping')) return;

  balloon.classList.add('popping');
  sounds.playBalloonPop();
  
  balloonScore++;
  const scoreHud = document.getElementById('balloon-score-hud');
  if (scoreHud) {
    scoreHud.textContent = `Globos: ${balloonScore}`;
  }

  // Animación de desvanecimiento rápida
  setTimeout(() => {
    balloon.remove();
    activeBalloons = activeBalloons.filter(b => b !== balloon);
  }, 150);
}

function stopBalloonGame() {
  if (balloonSpawnInterval) {
    clearInterval(balloonSpawnInterval);
    balloonSpawnInterval = null;
  }
  activeBalloons.forEach(b => b.remove());
  activeBalloons = [];
}


/* ==========================================
   3. PIZARRA MÁGICA (PAINTING CANVAS)
   ========================================== */
let isDrawing = false;
let canvasCtx = null;
let lastX = 0;
let lastY = 0;
let brushColor = '#FF5252';
let brushSize = 12;
let isRainbowBrush = false;
let rainbowHue = 0;
let drawingHistory = [];

function initDrawingGame(container) {
  container.innerHTML = `
    <div class="juegos-wrapper">
      <div class="active-game-viewport">
        
        <div class="game-header-bar">
          <button class="control-btn btn-back-selector" id="btn-game-back">
            <span>🎮 Otros Juegos</span>
          </button>
          <div class="game-hud-item">Pizarra Mágica</div>
          <button class="control-btn btn-prev" id="btn-drawing-save" style="display:none">
            <span>💾 Guardar</span>
          </button>
        </div>

        <!-- Área de Trabajo de Pintura -->
        <div class="drawing-workspace">
          
          <!-- Lienzo / Canvas -->
          <div class="drawing-canvas-wrapper">
            <canvas id="drawing-canvas"></canvas>
          </div>

          <!-- Caja de Herramientas lateral -->
          <div class="drawing-toolbox">
            
            <!-- Paleta de Colores -->
            <div class="toolbox-group">
              <span class="toolbox-label">Colores</span>
              <div class="paint-color-grid">
                <div class="paint-pot paint-red active" data-color="#FF5252" style="background:#FF5252"></div>
                <div class="paint-pot paint-blue" data-color="#448AFF" style="background:#448AFF"></div>
                <div class="paint-pot paint-green" data-color="#69F0AE" style="background:#69F0AE"></div>
                <div class="paint-pot paint-yellow" data-color="#FFD740" style="background:#FFD740"></div>
                <div class="paint-pot paint-purple" data-color="#E040FB" style="background:#E040FB"></div>
                <div class="paint-pot paint-rainbow" id="rainbow-brush-pot" title="Pincel Arcoíris"></div>
              </div>
            </div>

            <!-- Tamaño del pincel -->
            <div class="toolbox-group">
              <span class="toolbox-label">Pincel</span>
              <div class="brush-size-grid">
                <button class="brush-btn brush-sm" data-size="6">
                  <div class="brush-dot"></div>
                </button>
                <button class="brush-btn brush-md active" data-size="12">
                  <div class="brush-dot"></div>
                </button>
                <button class="brush-btn brush-lg" data-size="20">
                  <div class="brush-dot"></div>
                </button>
              </div>
            </div>

            <!-- Comandos de limpiar/borrar -->
            <div class="toolbox-group">
              <button class="toolbox-btn btn-undo" id="btn-draw-undo" title="Deshacer trazo">
                <span>↩ Deshacer</span>
              </button>
              <button class="toolbox-btn btn-clear" id="btn-draw-clear" title="Borrar todo">
                <span>🗑 Limpiar</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  `;

  document.getElementById('btn-game-back').addEventListener('click', backToGamesMenu);

  setupDrawingCanvas();

  speakText('¡Pizarra Mágica! Elige un tarro de pintura de color y desliza tu dedo en el tablero para dibujar lo que quieras.');
}

function setupDrawingCanvas() {
  const canvas = document.getElementById('drawing-canvas');
  if (!canvas) return;

  canvasCtx = canvas.getContext('2d');
  
  // Escalar lienzo según el tamaño del contenedor físico
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Inicializar estilo del trazo
  canvasCtx.lineJoin = 'round';
  canvasCtx.lineCap = 'round';

  // Guardar estado inicial en blanco
  saveHistoryState();

  // Registrar Eventos de Mouse
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);

  // Registrar Eventos de Pantalla Táctil (Móviles / Tablets)
  canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    isDrawing = true;
    lastX = touch.clientX - rect.left;
    lastY = touch.clientY - rect.top;
  });

  canvas.addEventListener('touchmove', (e) => {
    if (!isDrawing) return;
    e.preventDefault(); // Prevenir desplazamiento de pantalla
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const currentX = touch.clientX - rect.left;
    const currentY = touch.clientY - rect.top;
    
    drawStroke(lastX, lastY, currentX, currentY);
    lastX = currentX;
    lastY = currentY;
  });

  canvas.addEventListener('touchend', stopDrawing);

  // Eventos de selección de color
  const paintPots = document.querySelectorAll('.paint-pot');
  paintPots.forEach(pot => {
    pot.addEventListener('click', () => {
      sounds.playPop();
      
      paintPots.forEach(p => p.classList.remove('active'));
      pot.classList.add('active');

      if (pot.id === 'rainbow-brush-pot') {
        isRainbowBrush = true;
      } else {
        isRainbowBrush = false;
        brushColor = pot.getAttribute('data-color');
      }
    });
  });

  // Eventos de selección de tamaño de pincel
  const brushBtns = document.querySelectorAll('.brush-btn');
  brushBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playPop();
      brushBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      brushSize = parseInt(btn.getAttribute('data-size'));
    });
  });

  // Evento deshacer y limpiar
  document.getElementById('btn-draw-clear').addEventListener('click', () => {
    sounds.playPop();
    canvasCtx.fillStyle = '#FFFFFF';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    saveHistoryState();
  });

  document.getElementById('btn-draw-undo').addEventListener('click', () => {
    sounds.playPop();
    undoLastStroke();
  });
}

function resizeCanvas() {
  const canvas = document.getElementById('drawing-canvas');
  if (!canvas || !canvas.parentNode) return;

  // Guardar contenido existente antes del re-escalado
  let tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  let tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(canvas, 0, 0);

  // Aplicar nuevo tamaño físico
  canvas.width = canvas.parentNode.clientWidth;
  canvas.height = canvas.parentNode.clientHeight;

  // Volver a aplicar fondo blanco e importar dibujo
  canvasCtx.fillStyle = '#FFFFFF';
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
  canvasCtx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
  
  canvasCtx.lineJoin = 'round';
  canvasCtx.lineCap = 'round';
}

function startDrawing(e) {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
}

function draw(e) {
  if (!isDrawing) return;
  
  const currentX = e.offsetX;
  const currentY = e.offsetY;
  
  drawStroke(lastX, lastY, currentX, currentY);
  lastX = currentX;
  lastY = currentY;
}

function drawStroke(x1, y1, x2, y2) {
  canvasCtx.beginPath();
  canvasCtx.moveTo(x1, y1);
  canvasCtx.lineTo(x2, y2);
  
  // Lógica del Pincel Arcoíris
  if (isRainbowBrush) {
    canvasCtx.strokeStyle = `hsl(${rainbowHue}, 100%, 50%)`;
    rainbowHue = (rainbowHue + 3) % 360;
  } else {
    canvasCtx.strokeStyle = brushColor;
  }
  
  canvasCtx.lineWidth = brushSize;
  canvasCtx.stroke();
  canvasCtx.closePath();
}

function stopDrawing() {
  if (isDrawing) {
    isDrawing = false;
    saveHistoryState();
  }
}

// Historial para Deshacer trazos (Undo)
function saveHistoryState() {
  const canvas = document.getElementById('drawing-canvas');
  if (!canvas) return;

  // Guardar captura de pantalla como imagen base64
  if (drawingHistory.length >= 15) {
    drawingHistory.shift(); // Limitar historial a 15 estados
  }
  drawingHistory.push(canvas.toDataURL());
}

function undoLastStroke() {
  const canvas = document.getElementById('drawing-canvas');
  if (!canvas || drawingHistory.length <= 1) return;

  // Sacar el estado actual y cargar el anterior
  drawingHistory.pop();
  const previousStateUrl = drawingHistory[drawingHistory.length - 1];

  const img = new Image();
  img.src = previousStateUrl;
  img.onload = () => {
    canvasCtx.fillStyle = '#FFFFFF';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    canvasCtx.drawImage(img, 0, 0);
  };
}

function stopDrawingGame() {
  window.removeEventListener('resize', resizeCanvas);
  drawingHistory = [];
}

/* ==========================================
   4. ATRAPA AL TOPO (WHACK-A-MOLE)
   ========================================== */
let moleScore = 0;
let moleInterval = null;
let currentMoleHole = null;

function initMoleGame(container) {
  moleScore = 0;
  
  container.innerHTML = `
    <div class="juegos-wrapper">
      <div class="active-game-viewport">
        
        <div class="game-header-bar">
          <button class="control-btn btn-back-selector" id="btn-game-back">
            <span>🎮 Otros Juegos</span>
          </button>
          <div class="game-hud-item" id="mole-score-hud">Topos: 0</div>
          <button class="control-btn btn-prev" id="btn-mole-reset">
            <span>🔄 Reiniciar</span>
          </button>
        </div>

        <!-- Área de Juego -->
        <div class="mole-game-area">
          <div class="mole-hole" id="hole-0"><div class="mole">🐹</div></div>
          <div class="mole-hole" id="hole-1"><div class="mole">🐹</div></div>
          <div class="mole-hole" id="hole-2"><div class="mole">🐹</div></div>
          <div class="mole-hole" id="hole-3"><div class="mole">🐹</div></div>
          <div class="mole-hole" id="hole-4"><div class="mole">🐹</div></div>
          <div class="mole-hole" id="hole-5"><div class="mole">🐹</div></div>
        </div>

      </div>
    </div>
  `;

  document.getElementById('btn-game-back').addEventListener('click', backToGamesMenu);
  document.getElementById('btn-mole-reset').addEventListener('click', () => {
    sounds.playPop();
    stopMoleGame();
    initMoleGame(container);
  });

  const moles = container.querySelectorAll('.mole');
  moles.forEach(mole => {
    mole.addEventListener('click', () => {
      whackMole(mole);
    });
    mole.addEventListener('touchstart', (e) => {
      e.preventDefault();
      whackMole(mole);
    });
  });

  moleInterval = setInterval(spawnMole, 1000);
  speakText('¡Atrapa al topo! Toca rápido a los topos cuando se asomen por sus agujeros.');
}

function spawnMole() {
  if (activeGameId !== 'topo') return;

  const holes = document.querySelectorAll('.mole-hole');
  if (holes.length === 0) return;

  // Ocultar al topo actual si lo hay
  holes.forEach(hole => hole.classList.remove('up'));

  // Escoger un nuevo agujero al azar, que no sea el mismo que el anterior
  let randomIdx;
  do {
    randomIdx = Math.floor(Math.random() * holes.length);
  } while (currentMoleHole === randomIdx && holes.length > 1);

  currentMoleHole = randomIdx;
  const targetHole = holes[randomIdx];
  targetHole.classList.add('up');
}

function whackMole(mole) {
  if (!mole.parentNode.classList.contains('up')) return;
  
  mole.parentNode.classList.remove('up');
  sounds.playPop();
  
  moleScore++;
  const scoreHud = document.getElementById('mole-score-hud');
  if (scoreHud) {
    scoreHud.textContent = `Topos: ${moleScore}`;
  }
}

function stopMoleGame() {
  if (moleInterval) {
    clearInterval(moleInterval);
    moleInterval = null;
  }
}

