# 🚀 ChildAR - Visor de Realidad Aumentada Educativo

**ChildAR** es un proyecto educativo de Realidad Aumentada (AR) diseñado específicamente para niños. Utiliza tecnologías web (`A-Frame`, `AR.js`) para ofrecer una experiencia inmersiva directamente desde el navegador de un celular, sin requerir la instalación de aplicaciones nativas.

---

## 📂 Arquitectura y Estructura de Archivos

El proyecto ha sido modularizado para facilitar su escalabilidad y mantener buenas prácticas de código. Cada tema o materia está separado y la lógica está unificada.

```text
📦 ProyectoKat
 ┣ 📂 assets/            # Archivos multimedia categorizados
 ┃ ┣ 📂 audio/           # Audios de las preguntas (por tema)
 ┃ ┃ ┣ 📂 1_Plantas/
 ┃ ┃ ┗ 📂 ... (hasta 10_Visual)
 ┃ ┗ 📂 video/           # Videos AR proyectados (por tema)
 ┃   ┣ 📂 1_Plantas/
 ┃   ┃  ┣ Planta.webm    # Para Android
 ┃   ┃  ┗ prueba.mp4     # Para iOS (ChromaKey)
 ┃   ┗ 📂 ...
 ┣ 📂 css/
 ┃ ┗ 📜 styles.css       # Estilos unificados (Tailwind para Inicio, CSS Nativo para AR)
 ┣ 📂 js/
 ┃ ┣ 📜 chromakey.js     # Componente Shader para eliminar fondo verde en iOS
 ┃ ┣ 📜 data.js          # Base de datos centralizada (Preguntas, íconos, colores)
 ┃ ┣ 📜 quiz.js          # Lógica interactiva del cuestionario, cronómetro y audios
 ┃ ┗ 📜 video.js         # Lógica de AR y detección de sistema operativo
 ┣ 📂 public/            # Archivos globales (Animaciones de estrellas, SFX global)
 ┃ ┣ 📜 correcto.aac     # Sonido global de respuesta correcta
 ┃ ┣ 📜 incorrecto.aac   # Sonido global de respuesta incorrecta
 ┃ ┗ 📜 ...
 ┣ 📜 ar.html            # Visor principal de Realidad Aumentada y Quiz
 ┗ 📜 index.html         # Pantalla de inicio (Menú principal)
```

---

## 🛠️ Buenas Prácticas y Escalabilidad

### 1. Sistema de "Temas" Dinámico (`data.js`)
El proyecto no duplica archivos HTML por cada tema. En su lugar, el menú en `index.html` envía al usuario a `ar.html?tema=X`. 
El archivo `js/data.js` lee ese parámetro y configura dinámicamente:
- El color de la interfaz de usuario.
- El ícono del tema.
- La carpeta exacta en `assets/` de donde se extraen los recursos de video y audio.
- La lista de preguntas.

### 2. Soporte Cruzado de Plataformas (iOS vs Android)
Debido a las estrictas limitaciones de Safari móvil con los videos 3D:
- **Android/PC:** Usa videos formato `.webm` con canal Alpha nativo para el rendimiento óptimo.
- **iOS (iPhone/iPad):** Usa videos `.mp4` con fondo verde puro (`#00FF00`) y procesa la transparencia matemática en la GPU utilizando un **ChromaKey Shader** (`js/chromakey.js`).

### 3. El Cronómetro de Cuestionario
Cada pregunta tiene un tiempo límite configurable (por defecto 15 segundos). Si el usuario no selecciona una opción, el sistema registra la respuesta como incorrecta, reproduce el audio asociado (`incorrecto.aac`) y avanza a la siguiente animación.

---

## 💻 ¿Cómo agregar nuevos temas?

Para agregar los contenidos finales de un nuevo módulo (por ejemplo: "El Espacio"), sigue estos pasos:

1. **Crear carpetas de recursos:**
   Dentro de `assets/audio/` y `assets/video/`, crea una carpeta idéntica a la propiedad `folderName` asignada en `data.js` (Ej. `4_Espacio`).

2. **Añadir el contenido de Video (AR):**
   - En la nueva carpeta `assets/video/4_Espacio/` añade el video para Android: `Planta.webm` (renómbralo según tu código o mantén la estructura estándar).
   - Añade el video para iPhone con fondo verde: `prueba.mp4`.

3. **Añadir el contenido de Audio (Preguntas):**
   - En `assets/audio/4_Espacio/` añade `Primera-pregunta.aac`, `Segunda-pregunta.aac` y `Tercera-pregunta.aac`.

4. **Actualizar la Base de Datos (`data.js`):**
   Abre el archivo `data.js`, busca la ID del tema (Ej: `4`) y actualiza el texto de sus preguntas y opciones correctas.

¡Eso es todo! La arquitectura automatizada hará que los colores, audios y preguntas se integren sin tocar el código fuente del visor AR.

---

## 🚀 Ejecución Local

Para probar el escáner de Realidad Aumentada y tener permisos de cámara desde tu celular, **este proyecto debe ejecutarse bajo un servidor local y en protocolo HTTPS**.

Usando Node.js / npx o utilidades como *Live Server* en VSCode:
1. Abre tu terminal en la carpeta principal.
2. Inicia un servidor web.
3. Asegúrate de acceder vía `https://` o `http://localhost` para que el navegador permita acceder a la cámara (`webcam`).
