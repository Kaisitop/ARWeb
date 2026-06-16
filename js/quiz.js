console.log("quiz cargado");

/* ==========================
   THEME SETUP
========================== */
const params      = new URLSearchParams(window.location.search);
const themeId     = parseInt(params.get('tema')) || 1;
const currentTheme = themesData[themeId] || themesData[1];

/* Ajustar color hex sumando offset a cada canal */
function adjustColor(hex, amount) {
  return '#' + hex.replace(/^#/, '').replace(/../g, c =>
    ('0' + Math.min(255, Math.max(0, parseInt(c, 16) + amount)).toString(16)).slice(-2)
  );
}

/* Aplicar variables CSS del tema */
document.documentElement.style.setProperty('--primary',       currentTheme.color);
document.documentElement.style.setProperty('--primary-dark',  adjustColor(currentTheme.color, -35));
document.documentElement.style.setProperty('--primary-light', adjustColor(currentTheme.color, 145));
document.documentElement.style.setProperty('--handle-bg',     adjustColor(currentTheme.color, 90));
document.documentElement.style.setProperty('--option-border', adjustColor(currentTheme.color, 110));

/* Poblar badge del tema y botón quiz al cargar el DOM */
document.addEventListener("DOMContentLoaded", () => {
  const btnIcon = document.querySelector('#btn-quiz .btn-icon');
  if (btnIcon) btnIcon.textContent = currentTheme.icon;

  const badgeIcon  = document.getElementById('theme-badge-icon');
  const badgeTitle = document.getElementById('theme-badge-title');
  const panelIcon  = document.getElementById('panel-icon');

  if (badgeIcon)  badgeIcon.textContent  = currentTheme.icon;
  if (badgeTitle) badgeTitle.textContent = currentTheme.title;
  if (panelIcon)  panelIcon.textContent  = currentTheme.icon;
});

/* ==========================
   AUDIO SYSTEM & TIMER STATE
========================== */
const sfxCorrect = new Audio("public/correcto.aac");
const sfxIncorrect = new Audio("public/incorrecto.aac");

let timerInterval;
let timeLeft = 15;
const MAX_TIME = 15;

let audioListo = false;
const folder = currentTheme.folderName;

const audios = [
  new Audio(`assets/audio/${folder}/Primera-pregunta.aac`),
  new Audio(`assets/audio/${folder}/Segunda-pregunta.aac`),
  new Audio(`assets/audio/${folder}/Tercera-pregunta.aac`),
];

function activarAudioSistema() {
  if (audioListo) return;
  audios.forEach(audio => {
    audio.muted = false;
    audio.play().then(() => { audio.pause(); audio.currentTime = 0; }).catch(() => {});
  });
  audioListo = true;
}

function reproducirAudio(index) {
  if (!audioListo) return;
  audios.forEach(a => { a.pause(); a.currentTime = 0; });
  if (audios[index]) {
    audios[index].play().catch(err => console.log("Error audio:", err));
  }
}

/* ==========================
   PREGUNTAS
========================== */
const preguntas = currentTheme.questions;
let preguntaActual = 0;
let puntaje = 0;

/* Actualizar barra de progreso */
function actualizarProgreso() {
  const bar = document.getElementById('quiz-progress-bar');
  if (!bar) return;
  const pct = ((preguntaActual) / preguntas.length) * 100;
  bar.style.width = `${pct}%`;
}

/* ==========================
   ABRIR / CERRAR PANEL
========================== */
function abrirPanel() {
  document.getElementById("quiz-panel").classList.add("open");
  document.getElementById("quiz-overlay").classList.add("open");

  activarAudioSistema();

  preguntaActual = 0;
  puntaje = 0;
  actualizarProgreso();
  cargarPregunta();

  setTimeout(() => reproducirAudio(preguntaActual), 300);
}

function cerrarPanel() {
  clearInterval(timerInterval);
  document.getElementById("quiz-panel").classList.remove("open");
  document.getElementById("quiz-overlay").classList.remove("open");
  audios.forEach(a => { a.pause(); a.currentTime = 0; });
}

/* ==========================
   CARGAR PREGUNTA
========================== */
function cargarPregunta() {
  const pregunta = preguntas[preguntaActual];

  document.getElementById("question-title").textContent    = pregunta.titulo;
  document.getElementById("question-subtitle").textContent = pregunta.subtitulo;

  const contenedor = document.getElementById("quiz-options");
  contenedor.innerHTML = "";

  const letras = ['A', 'B', 'C'];

  pregunta.opciones.forEach((opcion, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerHTML = `
      <span class="opt-icon">${letras[i]}</span>
      ${opcion.texto}
    `;
    btn.onclick = () => responder(btn, opcion.correcta);
    contenedor.appendChild(btn);
  });

  actualizarProgreso();
  iniciarTemporizador();

  setTimeout(() => reproducirAudio(preguntaActual), 200);
}

/* ==========================
   TEMPORIZADOR
========================== */
function iniciarTemporizador() {
  clearInterval(timerInterval);
  timeLeft = MAX_TIME;
  actualizarVistaTimer();
  
  timerInterval = setInterval(() => {
    timeLeft--;
    actualizarVistaTimer();
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      // Tiempo agotado = respuesta incorrecta
      const dummyBtn = document.createElement("button");
      responder(dummyBtn, false, true);
    }
  }, 1000);
}

function actualizarVistaTimer() {
  const timerElement = document.getElementById("quiz-timer");
  const textElement = document.getElementById("timer-text");
  if (!timerElement || !textElement) return;
  
  textElement.textContent = timeLeft;
  
  if (timeLeft <= 5) {
    timerElement.classList.add("warning");
  } else {
    timerElement.classList.remove("warning");
  }
}

/* ==========================
   ANIMACIÓN ESTRELLA
========================== */

/* Duraciones reales de los webm (en ms) — ajusta si cambias los archivos */
const STAR_HAPPY_MS = 2200;   // felizAnim.webm
const STAR_SAD_MS   = 1800;   // tristeAnim.webm

const starOverlay = document.getElementById('star-anim-overlay');
const starVideo   = document.getElementById('star-anim-video');

/**
 * Muestra la animación de estrella, espera a que el video termine
 * (o al timeout de seguridad) y luego llama al callback.
 * @param {'happy'|'sad'} type
 * @param {Function} onDone - se llama cuando la animación termina
 */
function mostrarEstrella(type, onDone) {
  /* Detección básica de iOS */
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  
  /* En iOS carga feliz.mov / triste.mov. En Android/otros carga felizAnim.webm / tristeAnim.webm */
  const baseName = type === 'happy' ? 'feliz' : 'triste';
  const src      = isIOS ? `public/${baseName}.mov` : `public/${baseName}Anim.webm`;
  const duration = type === 'happy' ? STAR_HAPPY_MS : STAR_SAD_MS;

  /* Asignar fuente y mostrar */
  starVideo.src = src;
  starVideo.currentTime = 0;
  starOverlay.classList.remove('hiding');
  starOverlay.classList.add('active');
  starVideo.play().catch(() => {});

  /* Tiempo de seguridad por si el evento 'ended' no llega */
  let safeTimeout;

  function cerrarEstrella() {
    clearTimeout(safeTimeout);
    starVideo.removeEventListener('ended', cerrarEstrella);

    /* Fade out */
    starOverlay.classList.add('hiding');
    setTimeout(() => {
      starOverlay.classList.remove('active', 'hiding');
      starVideo.src = '';
      if (onDone) onDone();
    }, 270); /* duración de starFadeOut */
  }

  starVideo.addEventListener('ended', cerrarEstrella, { once: true });
  safeTimeout = setTimeout(cerrarEstrella, duration + 300); /* +300ms margen */
}

/* ==========================
   RESPONDER
========================== */
function responder(boton, correcta, porTiempo = false) {
  clearInterval(timerInterval); // Detener el temporizador

  const opciones = document.querySelectorAll(".option");

  /* Detener audio y bloquear opciones inmediatamente */
  audios.forEach(a => { a.pause(); a.currentTime = 0; });
  opciones.forEach(op => op.classList.add("disabled"));

  if (correcta) {
    puntaje++;
    sfxCorrect.play().catch(() => {});
    boton.className = "option correct";
    boton.innerHTML = '<span class="opt-icon">✅</span> 🎉 ¡Correcto!';
  } else {
    sfxIncorrect.play().catch(() => {});
    
    if (porTiempo) {
      document.getElementById("question-title").textContent = "⏳ ¡Tiempo Agotado!";
    } else if (boton && boton.parentNode) {
      boton.className = "option wrong";
      boton.innerHTML = `<span class="opt-icon">❌</span> ${currentTheme.icon} Incorrecto`;
    }

    /* Revelar la respuesta correcta */
    const todas      = Array.from(opciones);
    const correctaIdx = preguntas[preguntaActual].opciones.findIndex(o => o.correcta);
    if (todas[correctaIdx] && todas[correctaIdx] !== boton) {
      todas[correctaIdx].classList.remove("disabled");
      todas[correctaIdx].classList.add("correct");
      todas[correctaIdx].innerHTML = `<span class="opt-icon">✅</span> ${preguntas[preguntaActual].opciones[correctaIdx].texto}`;
    }
  }

  /* Pequeño delay para que el usuario vea el resultado visual (400ms)
     antes de que aparezca la estrella */
  setTimeout(() => {
    mostrarEstrella(correcta ? 'happy' : 'sad', () => {
      /* Callback: la animación terminó → avanzar */
      preguntaActual++;
      if (preguntaActual < preguntas.length) {
        cargarPregunta();
      } else {
        mostrarResultado();
      }
    });
  }, 400);
}


/* ==========================
   RESULTADO FINAL
========================== */
function mostrarResultado() {
  const bar = document.getElementById('quiz-progress-bar');
  if (bar) bar.style.width = '100%';

  const stars = puntaje === 3 ? '⭐⭐⭐' : puntaje === 2 ? '⭐⭐' : puntaje === 1 ? '⭐' : '😅';
  const msg   = puntaje === 3 ? '¡Perfecto! ¡Lo lograste!' : puntaje >= 2 ? '¡Muy bien hecho!' : '¡Sigue practicando!';

  document.getElementById("question-title").textContent    = `${stars} ${msg}`;
  document.getElementById("question-subtitle").textContent = `Obtuviste ${puntaje} de ${preguntas.length}`;

  document.getElementById("quiz-options").innerHTML = `
    <button class="option correct" style="justify-content:center; font-size:17px;">
      <span class="opt-icon" style="font-size:22px;">${currentTheme.icon}</span>
      ${puntaje} / ${preguntas.length} correctas
    </button>
    <button class="option" onclick="reiniciarQuiz()" style="justify-content:center; border-color: var(--primary); background: var(--primary-light);">
      <span class="opt-icon" style="font-size:20px;">🔁</span>
      Intentar de nuevo
    </button>
  `;
}


function reiniciarQuiz() {
  clearInterval(timerInterval);
  preguntaActual = 0;
  puntaje = 0;
  actualizarProgreso();
  cargarPregunta();
  setTimeout(() => reproducirAudio(0), 300);
}

/* ==========================
   GLOBAL
========================== */
window.abrirPanel   = abrirPanel;
window.cerrarPanel  = cerrarPanel;
window.reiniciarQuiz = reiniciarQuiz;
