console.log("video cargado");

const video = document.getElementById("goku");
const plane = document.querySelector("a-plane");

if (video) {
  const esIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  // Obtener theme actual
  const params = new URLSearchParams(window.location.search);
  const themeId = params.get('tema') || 1;
  const currentTheme = themesData[themeId] || themesData[1];
  const folder = currentTheme.folderName;

  if (esIOS) {
    /* En iOS usamos la versión con pantalla verde y aplicamos el shader ChromaKey */
    video.src = `assets/video/${folder}/prueba.mp4`;
    
    /* Aplicamos el shader chromakey a través del componente material nativo.
       El color de la pantalla verde pura es vec3(0,1,0). Es VITAL agregar transparent: true */
    plane.removeAttribute("chromakey"); // Por si acaso quedó de la versión anterior
    plane.setAttribute("material", "shader: chromakey; src: #goku; color: 0 1 0; transparent: true");
  } else {
    /* En Android / PC usamos el WebM transparente nativo */
    video.src = `assets/video/${folder}/Planta.webm`;
    plane.setAttribute("material", "transparent: true; src: #goku; shader: flat;");
  }

  // Forzar la recarga del video para que iOS detecte el nuevo archivo
  video.load();

  plane.setAttribute("visible", "false");

  video.addEventListener("loadeddata", () => {
    video.play().catch(() => {});
    plane.setAttribute("visible", "true");
  });

  document.addEventListener("click", () => {
    video.muted = true;
    video.play().catch(() => {});
  }, { once: true });
}