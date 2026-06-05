/* js/planificacion.js - Lógica del Gestor de Documentos de Planificación en el Módulo de Programación */

// Variable para almacenar el estado del visor de documentos activo
let activeViewer = null;

/**
 * Inicialización principal del módulo de Programación (Reemplaza el antiguo juego de robótica)
 */
window.initProgramacion = function() {
  const contentArea = document.getElementById('programacion-content-area');
  if (!contentArea) return;

  renderCategorySelector(contentArea);

  // Audio de bienvenida adaptado de Miss Magaly
  if (window.speakText) {
    setTimeout(() => {
      window.speakText('¡Hola de nuevo! Soy Miss Magaly. He preparado este espacio de planificación para ti. Elige una de estas carpetas para revisar tus fichas, programaciones anuales, semanales o planes de sesión.');
    }, 500);
  }
};

/**
 * Cierre del módulo de Programación
 */
window.closeProgramacion = function() {
  cleanupModulo('programacion-content-area');
};

/**
 * Renderiza la pantalla inicial de selección de carpetas/categorías
 */
function renderCategorySelector(container) {
  container.innerHTML = `
    <div class="plan-container" style="align-items: center;">
      <p style="font-family: var(--font-body); font-size: 1.3rem; font-weight: 700; color: #555555; text-align: center; margin-bottom: 25px;">
        Selecciona una categoría de documentos de planificación educativa:
      </p>
      
      <div class="subcategories-grid">
        <!-- FICHAS -->
        <button class="subcategory-card sub-fichas" data-key="fichas" data-folder="FICHAS" data-title="Fichas Educativas">
          <div class="sub-icon-wrapper">
            <img src="assets/juegos_icon.png" alt="Fichas icon">
          </div>
          <div class="sub-info">
            <h3 class="sub-title">Fichas</h3>
            <span class="sub-subtitle">(Fichas PDF)</span>
          </div>
        </button>

        <!-- PROGRAMACIÓN ANUAL -->
        <button class="subcategory-card sub-anual" data-key="programacionAnual" data-folder="PROGRAMACIÓN ANUAL" data-title="Programación Anual">
          <div class="sub-icon-wrapper">
            <img src="assets/programacion_icon.png" alt="Prog Anual icon">
          </div>
          <div class="sub-info">
            <h3 class="sub-title">Prog. Anual</h3>
            <span class="sub-subtitle">(Word DOCX)</span>
          </div>
        </button>

        <!-- SESIÓN DE CLASE -->
        <button class="subcategory-card sub-sesiones" data-key="sesionClase" data-folder="SESION DE CLASE" data-title="Sesiones de Clase">
          <div class="sub-icon-wrapper">
            <img src="assets/cuentos_icon.png" alt="Sesiones icon">
          </div>
          <div class="sub-info">
            <h3 class="sub-title">Sesiones</h3>
            <span class="sub-subtitle">(Plan de Clase)</span>
          </div>
        </button>

        <!-- UNIDAD SEMANAL -->
        <button class="subcategory-card sub-semanal" data-key="unidadSemanal" data-folder="UNIDAD  SEMANAL" data-title="Unidad Semanal">
          <div class="sub-icon-wrapper">
            <img src="assets/videos_icon.png" alt="Unidad Semanal icon">
          </div>
          <div class="sub-info">
            <h3 class="sub-title">U. Semanal</h3>
            <span class="sub-subtitle">(Semanal DOCX)</span>
          </div>
        </button>
      </div>
    </div>
  `;

  // Asignar eventos a las tarjetas de subcategorías
  const cards = container.querySelectorAll('.subcategory-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const dbKey = card.getAttribute('data-key');
      const folderName = card.getAttribute('data-folder');
      const title = card.getAttribute('data-title');
      
      if (window.sounds && window.sounds.playPop) window.sounds.playPop();
      initDocumentList(dbKey, folderName, title, container);
    });
  });
}

/**
 * Inicializa y muestra la lista de archivos de la carpeta seleccionada
 */
function initDocumentList(dbKey, folderName, title, container) {
  const files = DOCUMENTOS_DB[dbKey] || [];

  container.innerHTML = `
    <div class="plan-container">
      <!-- Fila de cabecera con botón de retroceso y título -->
      <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px; width: 100%;">
        <button class="back-home-btn" id="btn-back-to-categories" style="padding: 8px 16px; font-size: 1.1rem; background: #FF9800;">
          <span>◀ Volver</span>
        </button>
        <h3 style="font-family: var(--font-title); font-size: 1.6rem; font-weight: 800; color: #333333; margin: 0; text-transform: uppercase;">
          ${title}
        </h3>
      </div>

      <!-- Buscador de archivos -->
      <div class="search-wrapper">
        <svg class="search-icon-svg" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input type="text" class="search-input" id="search-${dbKey}" placeholder="Buscar documentos por nombre..." aria-label="Buscar documentos">
      </div>

      <!-- Cuadrícula para listar los archivos -->
      <div class="docs-list-grid" id="grid-${dbKey}">
        <!-- Inyectado dinámicamente -->
      </div>
    </div>
  `;

  // Renderizar la lista
  renderDocs(files, dbKey, folderName, container);

  // Botón volver a categorías
  document.getElementById('btn-back-to-categories').addEventListener('click', () => {
    if (window.sounds && window.sounds.playPop) window.sounds.playPop();
    renderCategorySelector(container);
  });

  // Escuchar entrada en el buscador
  const searchInput = document.getElementById(`search-${dbKey}`);
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const filtered = files.filter(f => f.toLowerCase().includes(term));
      renderDocs(filtered, dbKey, folderName, container);
    });
  }

  // Reproducir voz explicativa del módulo
  if (window.speakText) {
    window.speakText(`Viendo carpeta de ${title}. Escribe para buscar o haz clic para ver un archivo.`);
  }
}

/**
 * Renderiza los documentos en la grilla interactiva
 */
function renderDocs(filesList, dbKey, folderName, container) {
  const grid = document.getElementById(`grid-${dbKey}`);
  if (!grid) return;

  if (filesList.length === 0) {
    grid.innerHTML = `<div class="no-results-msg">No se encontraron documentos en esta carpeta.</div>`;
    return;
  }

  grid.innerHTML = filesList.map((fileName) => {
    const isDocx = fileName.toLowerCase().endsWith('.docx');
    const typeLabel = isDocx ? 'Word' : 'PDF';
    const typeIcon = isDocx ? '📝' : '📕';
    const cleanName = fileName.replace(/\.[^/.]+$/, ""); // Quitar extensión en la interfaz

    return `
      <div class="doc-item-card" data-filename="${encodeURIComponent(fileName)}">
        <div class="doc-card-header">
          <span class="doc-type-icon" title="${typeLabel}">${typeIcon}</span>
          <h3 class="doc-card-title">${cleanName}</h3>
        </div>
        <div class="doc-card-actions">
          <button class="doc-btn doc-btn-view" data-action="view">
            <span>👁 Ver</span>
          </button>
          <button class="doc-btn doc-btn-download" data-action="download" title="Descargar archivo">
            <span>⬇</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Configurar listeners en las tarjetas
  const cards = grid.querySelectorAll('.doc-item-card');
  cards.forEach(card => {
    const fileName = decodeURIComponent(card.getAttribute('data-filename'));

    card.addEventListener('click', (e) => {
      if (e.target.closest('[data-action="download"]')) return;
      if (window.sounds && window.sounds.playPop) window.sounds.playPop();
      abrirDocumento(folderName, fileName, container);
    });

    const downloadBtn = card.querySelector('.doc-btn-download');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.sounds && window.sounds.playPop) window.sounds.playPop();
        descargarArchivo(folderName, fileName);
      });
    }
  });
}

/**
 * Abre y visualiza el documento seleccionado
 */
function abrirDocumento(folderName, fileName, container) {
  if (activeViewer) {
    activeViewer.remove();
  }

  const fileUrl = `documentos/${encodeURIComponent(folderName)}/${encodeURIComponent(fileName)}`;
  const isDocx = fileName.toLowerCase().endsWith('.docx');
  const cleanTitle = fileName.replace(/\.[^/.]+$/, "");

  // Crear elemento del visor
  const viewerDiv = document.createElement('div');
  viewerDiv.className = 'doc-viewer-overlay';
  viewerDiv.innerHTML = `
    <div class="viewer-header">
      <button class="back-home-btn" id="viewer-back-btn">
        <span>◀ Cerrar</span>
      </button>
      <h3 class="viewer-title">${cleanTitle}</h3>
      <button class="back-home-btn" id="viewer-download-btn" style="background:#51CF66">
        <span>⬇ Descargar</span>
      </button>
    </div>
    <div class="viewer-body">
      ${isDocx 
        ? `<div class="viewer-loader" id="viewer-loader">
             <div class="spinner"></div>
             <span class="loader-text">Procesando y renderizando documento Word...</span>
           </div>
           <div class="word-render-container" id="word-container"></div>`
        : `<iframe class="pdf-iframe-viewer" src="${fileUrl}"></iframe>`
      }
    </div>
  `;

  container.appendChild(viewerDiv);
  activeViewer = viewerDiv;

  // Botón de regresar del visor
  document.getElementById('viewer-back-btn').addEventListener('click', () => {
    if (window.sounds && window.sounds.playPop) window.sounds.playPop();
    cerrarVisor();
  });

  // Botón de descarga
  document.getElementById('viewer-download-btn').addEventListener('click', () => {
    if (window.sounds && window.sounds.playPop) window.sounds.playPop();
    descargarArchivo(folderName, fileName);
  });

  // Si es Word, renderizarlo localmente
  if (isDocx) {
    const wordContainer = document.getElementById('word-container');
    const loader = document.getElementById('viewer-loader');

    fetch(fileUrl)
      .then(response => {
        if (!response.ok) throw new Error('Error al descargar el archivo.');
        return response.arrayBuffer();
      })
      .then(arrayBuffer => {
        return docx.renderAsync(arrayBuffer, wordContainer);
      })
      .then(() => {
        if (loader) loader.style.display = 'none';
        if (window.speakText) {
          window.speakText(`Se ha cargado el documento Word.`);
        }
      })
      .catch(error => {
        console.error('Error renderizando DOCX:', error);
        if (loader) {
          loader.innerHTML = `
            <span style="font-size:3rem">⚠️</span>
            <span class="loader-text" style="color:#FF4B4B">Error al renderizar el documento Word localmente.</span>
            <button class="doc-btn doc-btn-view" onclick="this.closest('.doc-viewer-overlay').querySelector('#viewer-download-btn').click()" style="margin-top:10px">Descargar para ver en Word</button>
          `;
        }
      });
  } else {
    if (window.speakText) {
      window.speakText(`Abriendo archivo PDF.`);
    }
  }
}

/**
 * Cierra el visor de documentos activo
 */
function cerrarVisor() {
  if (activeViewer) {
    activeViewer.remove();
    activeViewer = null;
  }
}

/**
 * Descarga física del archivo desde el servidor
 */
function descargarArchivo(folderName, fileName) {
  const fileUrl = `documentos/${encodeURIComponent(folderName)}/${encodeURIComponent(fileName)}`;
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Limpieza del módulo
 */
function cleanupModulo(containerId) {
  cerrarVisor();
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = '';
  }
}
