# 🍏 Solución de Transparencia de Video en iOS (WebGL / A-Frame)

Este documento detalla los cambios realizados para solucionar el problema de renderizado de videos con fondo transparente en dispositivos iOS (iPhone/iPad) al usar realidad aumentada (AR.js / A-Frame).

## 🐛 El Problema Original
La tecnología WebGL en iOS Safari (el motor que dibuja el entorno 3D) tiene un bug histórico de hardware: cuando intenta procesar videos `.mov` (HEVC) o `.webm` con canal Alpha (transparencia) hacia una textura 3D, **ignora o elimina el canal transparente**, renderizando un fondo negro o sólido en lugar de dejar ver la cámara detrás de él.

> [!NOTE]
> Esto solo afecta al entorno WebGL (la escena 3D). Las etiquetas `<video>` estándar superpuestas sobre el HTML (como las animaciones de estrellitas que agregamos en el quiz) sí soportan `.mov` con transparencia de forma nativa en iOS.

## 🛠️ La Solución: ChromaKey Shader (Pantalla Verde)
Dado que WebGL en iOS se niega a procesar el canal Alpha nativo de un video, la solución estándar de la industria es utilizar una "Pantalla Verde" y borrarla mediante código puro en la tarjeta gráfica.

### Cambios realizados:

#### 1. Creación del Shader (`js/chromakey.js`)
Se creó un componente de sombreado (Shader) personalizado utilizando la API nativa de A-Frame (`AFRAME.registerShader`).
- Este código se ejecuta miles de veces por segundo en el procesador gráfico (GPU).
- Lee la textura del video frame a frame, busca pixeles con un color específico (verde: `vec3(0.0, 1.0, 0.0)`) y, dependiendo de su distancia matemática respecto a ese color (el `threshold`), modifica su canal Alpha a `0.0` (haciéndolo invisible).

#### 2. Inclusión del Shader (`ar.html`)
Se agregó la etiqueta para cargar el script:
```html
<script src="js/chromakey.js"></script>
```
*Se incluyó justo antes de `js/data.js` para asegurar que A-Frame lo registre antes de intentar usarlo.*

#### 3. Lógica Condicional (`js/video.js`)
Se modificó la lógica en el archivo `video.js` para servir archivos distintos dependiendo del sistema operativo del usuario.

```javascript
if (esIOS) {
  /* En iOS usamos el MP4 con fondo verde y aplicamos ChromaKey */
  video.src = `assets/video/${folder}/prueba.mp4`;
  plane.removeAttribute("chromakey"); 
  plane.setAttribute("material", "shader: chromakey; src: #goku; color: 0 1 0; transparent: true");
} else {
  /* En Android / PC mantenemos la gran calidad del WebM transparente */
  video.src = `assets/video/${folder}/Planta.webm`;
  plane.setAttribute("material", "transparent: true; src: #goku; shader: flat;");
}

// Forzar la recarga del video en iOS
video.load();
```

> [!IMPORTANT]
> **Atributos Clave:**
> - `color: 0 1 0`: Le dice al shader que busque verde puro (`X:0, Y:1, Z:0` = `R:0, G:1, B:0`).
> - `transparent: true`: Sin este parámetro, el motor 3D de A-Frame se niega a mezclar canales Alpha. Todo lo que el Shader borraba, se rellenaba con color negro sólido. ¡Este fue el causante del *"cuadro oscuro"*!

## ⚙️ Ajustes a futuro (Fine-Tuning)
Aunque actualmente el resultado es funcional, se evidencian algunos bordes verdes y "huecos" en el modelo. Esto es normal en videos comprimidos en `.mp4` debido a la compresión de croma (el color verde nunca es 100% uniforme alrededor del personaje).

Si decides mejorar el recorte más adelante, debes modificar estos valores en `js/video.js`:
```javascript
plane.setAttribute("material", "shader: chromakey; src: #goku; color: 0 1 0; threshold: 0.4; smoothing: 0.1; transparent: true");
```
* **Aumentar `threshold`** (ej. `0.45`): Borra más gama de colores parecidos al verde (elimina los bordes verdes).
* **Disminuir `threshold`** (ej. `0.35`): Es más estricto, exige un verde más puro (evita que se borren pedazos del personaje).
* **Aumentar `smoothing`** (ej. `0.15`): Hace que la transición entre lo sólido y lo borrado sea más difuminada y suave, evitando recortes dentados.
