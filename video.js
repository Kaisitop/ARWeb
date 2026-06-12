console.log("video cargado");

const video = document.getElementById("goku");
const plane = document.querySelector("a-plane");

if (video) {
  const esIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  video.src = esIOS ? "PlantaMov.mov" : "Planta.webm";

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