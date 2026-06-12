console.log("quiz cargado");

/* ==========================
   AUDIO SYSTEM CONTROLADO
========================== */

let audioListo = false;

const audios = [
  new Audio("audio/Primera-pregunta.aac"),
  new Audio("audio/Segunda-pregunta.aac"),
  new Audio("audio/Tercera-pregunta.aac"),
];

/* activar audio SOLO desde botón quiz */
function activarAudioSistema() {
  if (audioListo) return;

  audios.forEach((audio) => {
    audio.muted = false;
    audio.play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
      })
      .catch(() => {});
  });

  audioListo = true;
}

/* reproducir audio seguro */
function reproducirAudio(index) {
  if (!audioListo) return;

  audios.forEach((a) => {
    a.pause();
    a.currentTime = 0;
  });

  if (audios[index]) {
    audios[index].play().catch((err) => {
      console.log("Error audio:", err);
    });
  }
}

/* ==========================
   PREGUNTAS
========================== */

const preguntas = [
  {
    titulo: "¿Qué le ayuda a crecer a una planta?",
    subtitulo: "Para que crezca sana y feliz 🌱",
    opciones: [
      { texto: "Agua limpia", icono: "💧", correcta: true },
      { texto: "Refresco u otro líquido", icono: "🥤", correcta: false },
    ],
  },

  {
    titulo: "¿Qué parte de la planta absorbe agua?",
    subtitulo: "Observa bien cómo se alimenta 🌿",
    opciones: [
      { texto: "Flor", icono: "🌸", correcta: false },
      { texto: "Raíz", icono: "🌱", correcta: true },
      { texto: "Hoja", icono: "🍃", correcta: false },
    ],
  },

  {
    titulo: "¿Qué puede crecer de una semilla?",
    subtitulo: "Las semillas tienen vida 🌳",
    opciones: [
      { texto: "Roca", icono: "🪨", correcta: false },
      { texto: "Árbol", icono: "🌳", correcta: true },
      { texto: "Nube", icono: "☁️", correcta: false },
    ],
  },
];

let preguntaActual = 0;
let puntaje = 0;

/* ==========================
   BOTÓN QUIZ
========================== */

function abrirPanel() {
  document.getElementById("quiz-panel").classList.add("open");

  // 🔥 ACTIVACIÓN REAL DEL AUDIO AQUÍ (NO EN OTRO SITIO)
  activarAudioSistema();

  preguntaActual = 0;
  puntaje = 0;

  cargarPregunta();

  // 🔊 reproducir primera pregunta inmediatamente
  setTimeout(() => {
    reproducirAudio(preguntaActual);
  }, 300);
}

function cerrarPanel() {
  document.getElementById("quiz-panel").classList.remove("open");

  audios.forEach((a) => {
    a.pause();
    a.currentTime = 0;
  });
}

/* ==========================
   CARGAR PREGUNTA
========================== */

function cargarPregunta() {
  const pregunta = preguntas[preguntaActual];

  document.getElementById("question-title").textContent =
    pregunta.titulo;

  document.getElementById("question-subtitle").textContent =
    pregunta.subtitulo;

  const contenedor = document.getElementById("quiz-options");
  contenedor.innerHTML = "";

  pregunta.opciones.forEach((opcion) => {
    const btn = document.createElement("button");

    btn.className = "option";

    btn.innerHTML = `
      <span class="opt-icon">${opcion.icono}</span>
      ${opcion.texto}
    `;

    btn.onclick = () => responder(btn, opcion.correcta);

    contenedor.appendChild(btn);
  });

  // 🔊 audio SIEMPRE al cargar pregunta
  setTimeout(() => {
    reproducirAudio(preguntaActual);
  }, 200);
}

/* ==========================
   RESPUESTA
========================== */

function responder(boton, correcta) {
  const opciones = document.querySelectorAll(".option");

  audios.forEach((a) => {
    a.pause();
    a.currentTime = 0;
  });

  opciones.forEach((op) => (op.style.pointerEvents = "none"));

  if (correcta) {
    puntaje++;

    boton.className = "option correct";
    boton.innerHTML =
      '<span class="opt-icon">✅</span> 🎉 ¡Correcto!';
  } else {
    boton.className = "option wrong";
    boton.innerHTML =
      '<span class="opt-icon">❌</span> 🌱 Incorrecto';
  }

  setTimeout(() => {
    preguntaActual++;

    if (preguntaActual < preguntas.length) {
      cargarPregunta();
    } else {
      mostrarResultado();
    }
  }, 900);
}

/* ==========================
   RESULTADO FINAL
========================== */

function mostrarResultado() {
  document.getElementById("question-title").textContent =
    "🏁 Resultado final";

  document.getElementById("question-subtitle").textContent =
    `Obtuviste ${puntaje} / ${preguntas.length}`;

  document.getElementById("quiz-options").innerHTML = `
    <button class="option correct">
      <span class="opt-icon">🌱</span>
      ${puntaje} / ${preguntas.length}
    </button>
  `;
}

/* ==========================
   GLOBAL
========================== */

window.abrirPanel = abrirPanel;
window.cerrarPanel = cerrarPanel;