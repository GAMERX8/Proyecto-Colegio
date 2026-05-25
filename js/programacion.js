/* js/programacion.js - Módulo de Programación (Magaly) */

// Base de datos de niveles del juego de robótica
const PROG_LEVELS = [
  {
    number: 1,
    title: "Camino Directo",
    start: { x: 2, y: 4, dir: 'up' }, // 0: left, 1: up, 2: right, 3: down
    goal: { x: 2, y: 1 },
    obstacles: []
  },
  {
    number: 2,
    title: "Doblar la Esquina",
    start: { x: 1, y: 3, dir: 'right' },
    goal: { x: 3, y: 1 },
    obstacles: [
      { x: 3, y: 3 }
    ]
  },
  {
    number: 3,
    title: "Esquivar los Bloques",
    start: { x: 1, y: 4, dir: 'up' },
    goal: { x: 4, y: 1 },
    obstacles: [
      { x: 1, y: 2 },
      { x: 3, y: 3 },
      { x: 3, y: 4 }
    ]
  }
];

// Dibujo Vectorial del Robot Amigable para colocar en la cuadrícula
const ROBOT_SVG = `
<svg viewBox="0 0 100 100" class="robot-sprite-svg">
  <g stroke="#333333" stroke-width="4" stroke-linejoin="round">
    <!-- Antenna -->
    <line x1="50" y1="20" x2="50" y2="8" stroke-width="4"/>
    <circle cx="50" cy="8" r="4" fill="#FF5252"/>
    <!-- Ears -->
    <rect x="25" y="32" width="6" height="12" rx="3" fill="#B2EBF2"/>
    <rect x="69" y="32" width="6" height="12" rx="3" fill="#B2EBF2"/>
    <!-- Head -->
    <rect x="30" y="20" width="40" height="30" rx="8" fill="#80DEEA"/>
    <!-- Eyes -->
    <circle cx="42" cy="32" r="4" fill="#333"/>
    <circle cx="42" cy="32" r="1.5" fill="#FFF"/>
    <circle cx="58" cy="32" r="4" fill="#333"/>
    <circle cx="58" cy="32" r="1.5" fill="#FFF"/>
    <!-- Mouth -->
    <rect x="42" y="42" width="16" height="3" rx="1.5" fill="#333"/>
    
    <!-- Body -->
    <rect x="26" y="54" width="48" height="38" rx="8" fill="#4DD0E1"/>
    <!-- Screen inside body -->
    <rect x="34" y="60" width="32" height="20" rx="4" fill="#E0F7FA"/>
    <!-- Screen decoration -->
    <line x1="38" y1="70" x2="48" y2="70" stroke="#00ACC1" stroke-width="2"/>
    <line x1="42" y1="65" x2="54" y2="65" stroke="#00ACC1" stroke-width="2"/>
    <line x1="46" y1="75" x2="60" y2="75" stroke="#00ACC1" stroke-width="2"/>
  </g>
</svg>
`;

let currentLevelIdx = 0;
let commandQueue = [];
let robotPos = { x: 0, y: 0, dir: 'up' };
let isExecuting = false;
let executionInterval = null;

// Direcciones y rotaciones en grados
const DIRECTION_ROTATIONS = {
  'up': 0,
  'right': 90,
  'down': 180,
  'left': 270
};

window.initProgramacion = function() {
  const contentArea = document.getElementById('programacion-content-area');
  if (!contentArea) return;

  commandQueue = [];
  isExecuting = false;
  
  renderRobotWorkspace(contentArea);
  
  // Audio de bienvenida de Magaly
  setTimeout(() => {
    speakText('¡Hola amiguito! Soy Magaly. Vamos a aprender a programar. Ayuda a mi pequeño robot a llegar a la estrella brillante agregando flechas de movimiento y pulsando EJECUTAR. ¡Tú puedes!');
  }, 500);
};

window.closeProgramacion = function() {
  stopExecution();
};

function renderRobotWorkspace(container) {
  const level = PROG_LEVELS[currentLevelIdx];
  robotPos = { ...level.start };

  container.innerHTML = `
    <div class="juegos-wrapper">
      <div class="prog-container">
        
        <!-- Tablero Cuadrícula de Juego -->
        <div class="prog-playfield">
          
          <div class="game-header-bar" style="margin-bottom: 0;">
            <div class="game-hud-item">Nivel ${level.number}: ${level.title}</div>
            <button class="control-btn btn-prev" id="btn-prog-level-select" style="padding:8px 16px; font-size:1.1rem">
              <span>Siguiente Nivel 🏆</span>
            </button>
          </div>

          <!-- Cuadrícula 5x5 -->
          <div class="prog-grid" id="robot-grid-playground">
            ${generateGridCellsHtml(level)}
          </div>

        </div>

        <!-- Panel Lateral de Comandos (Stickers de Código) -->
        <div class="prog-toolbox-panel">
          
          <!-- Stickers de Dirección -->
          <div class="prog-section-box">
            <span class="prog-box-title">Instrucciones</span>
            <div class="arrow-buttons-grid">
              <button class="btn-command cmd-left" data-cmd="left" title="Girar a la Izquierda">
                <span class="btn-command-icon">↩</span>
                <span class="btn-command-text">Izquierda</span>
              </button>
              <button class="btn-command cmd-forward" data-cmd="forward" title="Avanzar un Paso">
                <span class="btn-command-icon">⬆</span>
                <span class="btn-command-text">Avanzar</span>
              </button>
              <button class="btn-command cmd-right" data-cmd="right" title="Girar a la Derecha">
                <span class="btn-command-icon">↪</span>
                <span class="btn-command-text">Derecha</span>
              </button>
            </div>
          </div>

          <!-- Cola de Comandos Visuales -->
          <div class="prog-section-box">
            <span class="prog-box-title">Mi Código</span>
            <div class="sequence-deck-wrapper">
              <div class="sequence-deck" id="visual-sequence-deck">
                <div class="deck-empty-prompt">¡Pulsa las flechas de arriba para armar tu camino!</div>
              </div>
            </div>
          </div>

          <!-- Botones de Acción Ejecutar / Limpiar -->
          <div class="action-controls-row">
            <button class="toolbox-btn btn-action-run" id="btn-prog-run">
              <span>▶ EJECUTAR</span>
            </button>
            <button class="toolbox-btn btn-action-clear" id="btn-prog-clear">
              <span>🗑 BORRAR</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  `;

  // Colocar físicamente el robot en su casilla inicial
  placeRobotOnGrid();

  // Asignar eventos de interacción
  setupProgEventListeners();
}

function generateGridCellsHtml(level) {
  let cells = '';
  // Cuadrícula 5x5 (y: 0..4, x: 0..4)
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      let cellClass = 'grid-cell';
      
      const isObstacle = level.obstacles.some(obs => obs.x === x && obs.y === y);
      const isGoal = level.goal.x === x && level.goal.y === y;
      
      if (isObstacle) cellClass += ' cell-obstacle';
      if (isGoal) cellClass += ' cell-goal';

      cells += `<div class="${cellClass}" id="cell-${x}-${y}" data-x="${x}" data-y="${y}"></div>`;
    }
  }
  return cells;
}

function setupProgEventListeners() {
  const commandButtons = document.querySelectorAll('.btn-command');
  const runBtn = document.getElementById('btn-prog-run');
  const clearBtn = document.getElementById('btn-prog-clear');
  const levelSelectBtn = document.getElementById('btn-prog-level-select');

  // Registrar clic en flechas de comando
  commandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isExecuting) return;
      const cmdType = btn.getAttribute('data-cmd');
      sounds.playPop();
      addCommandToQueue(cmdType);
    });
  });

  // Botón Ejecutar
  runBtn.addEventListener('click', () => {
    if (isExecuting || commandQueue.length === 0) {
      if (commandQueue.length === 0) {
        speakText('¡Ups! Agrega primero algunas flechas de movimiento para que el robot sepa a dónde ir.');
      }
      return;
    }
    sounds.playPop();
    runProgram();
  });

  // Botón Borrar Código
  clearBtn.addEventListener('click', () => {
    if (isExecuting) return;
    sounds.playPop();
    commandQueue = [];
    updateVisualSequenceDeck();
    resetRobotPosition();
  });

  // Cambiar Nivel
  levelSelectBtn.addEventListener('click', () => {
    sounds.playPop();
    currentLevelIdx = (currentLevelIdx + 1) % PROG_LEVELS.length;
    commandQueue = [];
    isExecuting = false;
    renderRobotWorkspace(document.getElementById('programacion-content-area'));
  });
}

// Colocar el sprite del robot dentro de la celda DOM correspondiente
function placeRobotOnGrid() {
  // Remover robot anterior de cualquier celda
  const oldSprite = document.getElementById('robot-grid-sprite');
  if (oldSprite) oldSprite.remove();

  const targetCell = document.getElementById(`cell-${robotPos.x}-${robotPos.y}`);
  if (targetCell) {
    const spriteDiv = document.createElement('div');
    spriteDiv.id = 'robot-grid-sprite';
    spriteDiv.className = 'robot-sprite';
    spriteDiv.innerHTML = ROBOT_SVG;
    
    // Aplicar la rotación adecuada según la dirección
    const rotation = DIRECTION_ROTATIONS[robotPos.dir];
    spriteDiv.style.transform = `rotate(${rotation}deg)`;
    
    targetCell.appendChild(spriteDiv);
  }
}

// Agregar comando al mazo visual
function addCommandToQueue(cmdType) {
  if (commandQueue.length >= 10) return; // Máximo 10 instrucciones

  commandQueue.push(cmdType);
  updateVisualSequenceDeck();
}

function updateVisualSequenceDeck() {
  const deck = document.getElementById('visual-sequence-deck');
  if (!deck) return;

  if (commandQueue.length === 0) {
    deck.innerHTML = `<div class="deck-empty-prompt">¡Pulsa las flechas de arriba para armar tu camino!</div>`;
    return;
  }

  const iconLabels = {
    forward: { icon: '⬆', label: 'Avanzar', colorClass: 'block-forward' },
    left: { icon: '↩', label: 'Izquierda', colorClass: 'block-left' },
    right: { icon: '↪', label: 'Derecha', colorClass: 'block-right' }
  };

  deck.innerHTML = commandQueue.map((cmd, idx) => {
    const item = iconLabels[cmd];
    return `
      <div class="code-block-chip ${item.colorClass}" data-idx="${idx}" role="button" tabindex="0">
        <span>${item.icon}</span>
        <span>${item.label}</span>
      </div>
    `;
  }).join('');

  // Evento para remover un bloque al pulsarlo
  const chips = deck.querySelectorAll('.code-block-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (isExecuting) return;
      const idx = parseInt(chip.getAttribute('data-idx'));
      sounds.playPop();
      commandQueue.splice(idx, 1);
      updateVisualSequenceDeck();
    });
  });
}

// Ejecución animada de la secuencia de pasos programados
function runProgram() {
  isExecuting = true;
  disableToolbox(true);

  let currentStepIdx = 0;
  const level = PROG_LEVELS[currentLevelIdx];
  
  // Reiniciar posición por seguridad
  robotPos = { ...level.start };
  placeRobotOnGrid();

  const chips = document.querySelectorAll('.code-block-chip');

  executionInterval = setInterval(() => {
    // Quitar iluminación del paso anterior
    if (currentStepIdx > 0) {
      chips[currentStepIdx - 1].classList.remove('executing');
    }

    // Comprobar final de la secuencia
    if (currentStepIdx >= commandQueue.length) {
      clearInterval(executionInterval);
      executionInterval = null;
      checkEndCondition();
      return;
    }

    // Iluminar bloque actual
    chips[currentStepIdx].classList.add('executing');
    const activeCommand = commandQueue[currentStepIdx];
    
    // Ejecutar movimiento
    executeSingleCommand(activeCommand);
    currentStepIdx++;

    // Comprobar colisión o finalización anticipada
    if (hasCollided(level)) {
      clearInterval(executionInterval);
      executionInterval = null;
      handleCrash();
    }
  }, 750); // Velocidad pausada para que los niños observen
}

// Ejecutar una sola instrucción
function executeSingleCommand(cmd) {
  sounds.playRobot();

  const dirFlow = ['up', 'right', 'down', 'left'];

  if (cmd === 'left') {
    // Girar a la izquierda
    let idx = dirFlow.indexOf(robotPos.dir);
    idx = (idx - 1 + 4) % 4;
    robotPos.dir = dirFlow[idx];
  } else if (cmd === 'right') {
    // Girar a la derecha
    let idx = dirFlow.indexOf(robotPos.dir);
    idx = (idx + 1) % 4;
    robotPos.dir = dirFlow[idx];
  } else if (cmd === 'forward') {
    // Avanzar un casillero
    if (robotPos.dir === 'up') robotPos.y--;
    else if (robotPos.dir === 'right') robotPos.x++;
    else if (robotPos.dir === 'down') robotPos.y++;
    else if (robotPos.dir === 'left') robotPos.x--;
  }

  // Reflejar cambio en el tablero de juego
  placeRobotOnGrid();
}

// Verificar si colisionó contra bordes de pantalla o cajas obstáculos
function hasCollided(level) {
  // Colisión de pared
  if (robotPos.x < 0 || robotPos.x > 4 || robotPos.y < 0 || robotPos.y > 4) {
    return true;
  }
  // Colisión de obstáculo
  const isObstacle = level.obstacles.some(obs => obs.x === robotPos.x && obs.y === robotPos.y);
  return isObstacle;
}

// Comprobar victoria o fracaso
function checkEndCondition() {
  const level = PROG_LEVELS[currentLevelIdx];
  const chipHighlight = document.querySelectorAll('.code-block-chip');
  chipHighlight.forEach(c => c.classList.remove('executing'));

  if (robotPos.x === level.goal.x && robotPos.y === level.goal.y) {
    // ¡Victoria!
    sounds.playChime();
    speakText('¡Fantástico! ¡El robot llegó a la estrella mágica! ¡Eres un gran programador!');
    
    setTimeout(() => {
      alert('🎉 🌟 ¡LO LOGRASTE! ¡Felicidades! 🌟 🎉');
      unlockNextLevel();
    }, 300);
  } else {
    // Quedó a medio camino
    sounds.playBuzz();
    speakText('¡Uy! El robot no llegó a la estrella. Intenta de nuevo reordenando tus flechas de movimiento.');
    resetRobotPosition();
    disableToolbox(false);
    isExecuting = false;
  }
}

// Chocar el robot
function handleCrash() {
  sounds.playBuzz();
  speakText('¡Oh no! El robot chocó con un bloque o se salió del tapete de juego. ¡Cuidado!');
  
  const sprite = document.getElementById('robot-grid-sprite');
  if (sprite) {
    sprite.style.transform += ' scale(0.6)'; // Achicar indicando choque
  }

  setTimeout(() => {
    resetRobotPosition();
    disableToolbox(false);
    isExecuting = false;
    
    const chips = document.querySelectorAll('.code-block-chip');
    chips.forEach(c => c.classList.remove('executing'));
  }, 1000);
}

function resetRobotPosition() {
  const level = PROG_LEVELS[currentLevelIdx];
  robotPos = { ...level.start };
  placeRobotOnGrid();
}

function unlockNextLevel() {
  isExecuting = false;
  disableToolbox(false);
  
  // Avanzar al siguiente nivel si es posible
  currentLevelIdx = (currentLevelIdx + 1) % PROG_LEVELS.length;
  commandQueue = [];
  
  renderRobotWorkspace(document.getElementById('programacion-content-area'));
}

function stopExecution() {
  if (executionInterval) {
    clearInterval(executionInterval);
    executionInterval = null;
  }
  isExecuting = false;
}

function disableToolbox(disabled) {
  const buttons = document.querySelectorAll('.arrow-buttons-grid button, .action-controls-row button');
  buttons.forEach(btn => {
    btn.disabled = disabled;
    btn.style.opacity = disabled ? '0.4' : '1';
    btn.style.pointerEvents = disabled ? 'none' : 'all';
  });
}
