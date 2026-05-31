# Guía Técnica: Docentes Creativos e Innovadores

Bienvenido a la guía técnica del portal educativo "Docentes Creativos e Innovadores". Este proyecto es una aplicación web interactiva (Single Page Application - SPA) diseñada específicamente para niños de educación inicial (preescolar). 

El sistema está construido sin dependencias externas pesadas, garantizando una carga rápida y máxima compatibilidad.

## 🏗️ Arquitectura del Proyecto

El proyecto está construido utilizando **Vanilla Web Technologies** (HTML5, CSS3, JavaScript puro). No requiere procesos de compilación (como Webpack o Vite) ni frameworks (como React o Angular), lo cual lo hace extremadamente ligero y fácil de mantener.

### Estructura de Directorios

```text
📦 Proyecto Colegio
 ┣ 📂 assets/              # Contiene todas las imágenes (PNG) e iconos (SVG)
 ┣ 📂 css/                 # Hojas de estilo modulares
 ┃ ┣ 📜 styles.css         # Diseño base, tokens de color, animaciones globales
 ┃ ┣ 📜 cuentos.css        # Estilos específicos del módulo de Cuentos
 ┃ ┣ 📜 juegos.css         # Estilos específicos del módulo de Juegos
 ┃ ┣ 📜 programacion.css   # Estilos específicos del módulo de Programación
 ┃ ┗ 📜 videos.css         # Estilos específicos del módulo de Videos
 ┣ 📂 js/                  # Lógica de la aplicación
 ┃ ┣ 📜 app.js             # Orquestador principal, estado global y motor de audio
 ┃ ┣ 📜 cuentos.js         # Lógica de interacción y renderizado de los cuentos
 ┃ ┣ 📜 juegos.js          # Lógica interactiva de los minijuegos
 ┃ ┣ 📜 programacion.js    # Lógica de ejecución de bloques (algoritmos)
 ┃ ┗ 📜 videos.js          # Integración de reproductores de video interactivos
 ┣ 📜 index.html           # Punto de entrada y esqueleto principal de la SPA
 ┗ 📜 .gitignore           # Archivos ignorados por Git
```

## ⚙️ Tecnologías y APIs Principales

Para lograr una experiencia interactiva sin sobrecargar la red, la página utiliza APIs nativas del navegador:

### 1. Sintetizador de Sonido (Web Audio API)
En lugar de cargar pesados archivos `.mp3` o `.wav` que lentificarían la carga para usuarios con conexiones lentas, todos los efectos de sonido (burbujas, clics, campanitas, zumbidos) se generan programáticamente ("al vuelo") utilizando la **Web Audio API** dentro de `js/app.js`.
- **Ventaja:** Cero tiempo de descarga, interactividad inmediata y control total sobre las frecuencias y tonos.

### 2. Narración por Voz (Web Speech API)
La aplicación cuenta con accesibilidad auditiva que lee los títulos y narra los cuentos. Esto se implementa utilizando `window.speechSynthesis`.
- La función `speakText()` en `app.js` está configurada para buscar en el sistema operativo del usuario una **voz femenina en español**, ajustando el *pitch* (tono) a un nivel ligeramente más agudo (`1.3`) y el *rate* (velocidad) a un ritmo pausado (`1.0`) para que suene amigable para los niños.

### 3. Sistema SPA (Single Page Application)
La navegación no recarga la página. `index.html` contiene el menú principal y contenedores modales ocultos (`<div class="module-overlay">`). 
- Al hacer clic en una tarjeta, `js/app.js` inyecta dinámicamente el contenido invocando a `initCuentos()`, `initVideos()`, etc., y muestra el modal usando transiciones CSS (`transform` y `opacity`).

## 🎨 Sistema de Diseño (UI/UX)

El diseño está pensado en un **estilo "Sticker" premium**:
- **Colores:** Paletas vibrantes definidas como variables globales (`--color-yellow`, `--color-blue`, etc.) en `styles.css`.
- **Tipografías:** Se utilizan fuentes modernas (`Fredoka` para títulos redondeados y `Outfit` para textos), importadas desde Google Fonts.
- **Micro-animaciones:** Uso extensivo de animaciones CSS (`@keyframes`) para las nubes flotantes de fondo, el "latido" de las estrellas y el movimiento de suspensión de los iconos de las tarjetas (`floatStickerIcon`), fomentando la interacción del niño.
- **Responsive Design:** Utiliza CSS Grid y Flexbox adaptables, garantizando que los módulos y tarjetas se redimensionen correctamente en pantallas de celulares, tablets y proyectores de aulas.

## 🚀 Despliegue y Mantenimiento

El despliegue de esta plataforma es directo:
1. Al no requerir Node.js ni "build steps", cualquier servidor estático puede alojar los archivos.
2. Está optimizado para **Vercel** o **GitHub Pages**, conectando directamente el repositorio de Git. Cualquier actualización subida a la rama `main` de GitHub se reflejará instantáneamente en el entorno de producción.

## 📝 Notas de Integración

- **Módulos:** Cada nueva funcionalidad o juego debe tener su propio archivo `.css` y `.js`, y debe ser registrado en el objeto `cards` de la función `setupNavigation()` en `app.js` para ser inyectado correctamente en su overlay correspondiente.
- **Asistencia Docente:** Los textos actualizados en la UI asocian dinámicamente a cada módulo a una profesora específica (Miss Diana, Miss Sonia, Miss Deysi, Miss Magaly), personalizando la experiencia.
