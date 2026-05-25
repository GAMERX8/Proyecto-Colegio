/* js/app.js - Coordinador Principal de la Aplicación */

// Estado global de la aplicación
window.state = {
  soundEnabled: false,
  activeModule: null,
};

// Sintetizador de Sonidos usando Web Audio API (Cero descargas de archivos!)
window.sounds = {
  ctx: null,

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  // Sonido de burbuja/pop al pulsar botones
  playPop() {
    this.init();
    if (!state.soundEnabled) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sine';
    const now = this.ctx.currentTime;

    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.start(now);
    osc.stop(now + 0.12);
  },

  // Sonido de campanas/victoria al ganar un juego
  playChime() {
    this.init();
    if (!state.soundEnabled) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.2, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.3);
    });
  },

  // Sonido de error o buzzer amigable
  playBuzz() {
    this.init();
    if (!state.soundEnabled) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sawtooth';
    const now = this.ctx.currentTime;

    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(100, now + 0.2);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.start(now);
    osc.stop(now + 0.2);
  },

  // Sonido de explosión del globo
  playBalloonPop() {
    this.init();
    if (!state.soundEnabled) return;

    const bufferSize = this.ctx.sampleRate * 0.1; // 0.1 segundos
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Ruido blanco
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    // Filtro para simular el sonido opaco de un globo
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    noise.start(now);
    noise.stop(now + 0.1);
  },

  // Sonido de robot sintetizado
  playRobot() {
    this.init();
    if (!state.soundEnabled) return;

    const osc = this.ctx.createOscillator();
    const mod = this.ctx.createOscillator();
    const modGain = this.ctx.createGain();
    const gain = this.ctx.createGain();

    mod.connect(modGain);
    modGain.connect(osc.frequency);
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'square';
    mod.type = 'sine';

    const now = this.ctx.currentTime;

    osc.frequency.setValueAtTime(300, now);
    mod.frequency.setValueAtTime(25, now);
    modGain.gain.setValueAtTime(150, now);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    mod.start(now);
    osc.start(now);
    mod.stop(now + 0.15);
    osc.stop(now + 0.15);
  }
};

// Asistencia por voz interactiva (SpeechSynthesis)
window.speakText = function(text) {
  if (!state.soundEnabled) return;
  
  // Cancelar narraciones previas para evitar encabalgamiento
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-MX'; // Español latino preferido
  utterance.rate = 1.0; // Velocidad pausada para niños
  utterance.pitch = 1.3; // Tono ligeramente más agudo para sonar amigable e infantil
  
  // Intentar buscar una voz femenina en español
  const voices = window.speechSynthesis.getVoices();
  const femaleVoice = voices.find(v => 
    v.lang.startsWith('es') && 
    (/sabina|helena|laura|monica|paulina|mia|female|mujer/i.test(v.name))
  ) || voices.find(v => v.lang.startsWith('es-MX') || v.lang.startsWith('es'));

  if (femaleVoice) {
    utterance.voice = femaleVoice;
  }
  
  window.speechSynthesis.speak(utterance);
};

// Inicialización de la Web
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupSoundToggle();
});

// Manejo de la Navegación (SPA)
function setupNavigation() {
  const cards = {
    'btn-cuentos': { overlay: 'cuentos-overlay', init: initCuentos },
    'btn-videos': { overlay: 'videos-overlay', init: initVideos },
    'btn-juegos': { overlay: 'juegos-overlay', init: initJuegos },
    'btn-programacion': { overlay: 'programacion-overlay', init: initProgramacion }
  };

  // Asignar clics a los botones sticker principales
  Object.entries(cards).forEach(([btnId, config]) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', () => {
        sounds.playPop();
        openModule(config.overlay, config.init);
      });
    }
  });

  // Botones de cerrado de modales
  const closeButtons = document.querySelectorAll('.btn-close-modal');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playPop();
      closeCurrentModule();
    });
  });

  // Escuchar tecla escape para cerrar modales
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.activeModule) {
      closeCurrentModule();
    }
  });
}

// Abrir Modulo
function openModule(overlayId, initCallback) {
  const overlay = document.getElementById(overlayId);
  if (!overlay) return;

  state.activeModule = overlayId;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevenir scroll de fondo

  // Inicializar modulo específico
  if (initCallback) {
    initCallback();
  }
}

// Cerrar Modulo Activo
function closeCurrentModule() {
  if (!state.activeModule) return;

  const overlay = document.getElementById(state.activeModule);
  if (overlay) {
    overlay.classList.remove('active');
  }

  // Cancelar narraciones por voz al salir
  window.speechSynthesis.cancel();

  // Detener procesos específicos de cada modulo
  if (state.activeModule === 'cuentos-overlay') closeCuentos();
  if (state.activeModule === 'videos-overlay') closeVideos();
  if (state.activeModule === 'juegos-overlay') closeJuegos();
  if (state.activeModule === 'programacion-overlay') closeProgramacion();

  state.activeModule = null;
  document.body.style.overflow = '';
}

// Controlador de Sonido Global
function setupSoundToggle() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  const volumeIcon = document.getElementById('volume-icon');

  // SVG paths para cambiar el icono
  const soundOnPath = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM3 9v6h4l5 5V4L7 9H3z"/>';
  const soundOffPath = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM3 9v6h4l5 5V4L7 9H3zm13.5-6.5L12 7l1.5 1.5L17 5l-1.5-1.5z M4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';

  soundBtn.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    sounds.init();

    if (state.soundEnabled) {
      volumeIcon.innerHTML = soundOnPath;
      soundBtn.style.background = '#85E3FF';
      sounds.playPop();
      
      // Saludo interactivo al encender el sonido por primera vez
      setTimeout(() => {
        speakText('¡Hola amiguito! Bienvenido a nuestra escuela divertida. ¿Qué quieres aprender hoy con tus profesoras?');
      }, 300);
    } else {
      volumeIcon.innerHTML = soundOffPath;
      soundBtn.style.background = '#FFFFFF';
      window.speechSynthesis.cancel();
    }
  });
}
