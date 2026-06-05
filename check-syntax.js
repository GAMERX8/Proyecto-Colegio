const fs = require('fs');
const vm = require('vm');

const files = [
  'js/documentos_db.js',
  'js/cuentos.js',
  'js/videos.js',
  'js/juegos.js',
  'js/planificacion.js',
  'js/app.js'
];

// Mock global objects
const mockWindow = {
  addEventListener: () => {},
  speechSynthesis: { cancel: () => {} },
  state: { soundEnabled: false, activeModule: null },
  sounds: { init: () => {}, playPop: () => {}, playChime: () => {}, playBuzz: () => {}, playBalloonPop: () => {}, playRobot: () => {} },
  document: {
    addEventListener: () => {},
    getElementById: () => ({ addEventListener: () => {} }),
    querySelectorAll: () => []
  }
};

global.window = mockWindow;
global.document = mockWindow.document;

files.forEach(file => {
  try {
    const code = fs.readFileSync(file, 'utf8');
    new vm.Script(code);
    console.log(`✅ ${file} is syntactically correct`);
  } catch (err) {
    console.error(`❌ Syntax error in ${file}:`, err.message);
  }
});
