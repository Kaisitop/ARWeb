const themesData = {
  1: {
    id: 1,
    folderName: '1_Plantas',
    title: "Plantas",
    color: "#4B9651",
    icon: "🌱",
    questions: [
      {
        titulo: "¿Qué ayuda a crecer a una planta?",
        subtitulo: "Pregunta 1 de 3",
        opciones: [
          { texto: "Agua y luz solar", icono: "A", correcta: true },
          { texto: "Humo", icono: "B", correcta: false },
          { texto: "Arena", icono: "C", correcta: false }
        ]
      },
      {
        titulo: "¿Qué parte de la planta absorbe agua?",
        subtitulo: "Pregunta 2 de 3",
        opciones: [
          { texto: "Flor", icono: "A", correcta: false },
          { texto: "Raíz", icono: "B", correcta: true },
          { texto: "Hoja", icono: "C", correcta: false }
        ]
      },
      {
        titulo: "¿Qué puede crecer de una semilla?",
        subtitulo: "Pregunta 3 de 3",
        opciones: [
          { texto: "Roca", icono: "A", correcta: false },
          { texto: "Árbol", icono: "B", correcta: true },
          { texto: "Nube", icono: "C", correcta: false }
        ]
      }
    ]
  },
  2: {
    id: 2,
    folderName: '2_Calculo',
    title: "Cálculo",
    color: "#3577BC",
    icon: "🔢",
    questions: [
      {
        titulo: "¿Cuántas frutas hay en total?",
        subtitulo: "Pregunta 1 de 3",
        opciones: [
          { texto: "8", icono: "A", correcta: false },
          { texto: "10", icono: "B", correcta: true },
          { texto: "12", icono: "C", correcta: false }
        ]
      },
      {
        titulo: "Si juntamos las naranjas y los plátanos, ¿cuántas frutas obtenemos?",
        subtitulo: "Pregunta 2 de 3",
        opciones: [
          { texto: "4", icono: "A", correcta: false },
          { texto: "5", icono: "B", correcta: true },
          { texto: "6", icono: "C", correcta: false }
        ]
      },
      {
        titulo: "Si agregamos cinco plátanos más, ¿cuántos plátanos habría?",
        subtitulo: "Pregunta 3 de 3",
        opciones: [
          { texto: "2", icono: "A", correcta: false },
          { texto: "3", icono: "B", correcta: true },
          { texto: "4", icono: "C", correcta: false }
        ]
      }
    ]
  },
  3: {
    id: 3,
    folderName: '3_Pensamiento_logico',
    title: "Pensamiento lógico",
    color: "#816DAF",
    icon: "🧩",
    questions: [
      {
        titulo: "¿Qué figura completa la secuencia?",
        subtitulo: "Pregunta 1 de 3",
        opciones: [
          { texto: "Cuadrado", icono: "A", correcta: false },
          { texto: "Triángulo", icono: "B", correcta: false },
          { texto: "Círculo", icono: "C", correcta: true }
        ]
      },
      {
        titulo: "¿Cuántas fresas debemos agregar para igualar las manzanas?",
        subtitulo: "Pregunta 2 de 3",
        opciones: [
          { texto: "1", icono: "A", correcta: true },
          { texto: "2", icono: "B", correcta: false },
          { texto: "3", icono: "C", correcta: false }
        ]
      },
      {
        titulo: "¿Qué multiplicación representa la cantidad de globos?",
        subtitulo: "Pregunta 3 de 3",
        opciones: [
          { texto: "3x4", icono: "A", correcta: true },
          { texto: "4x4", icono: "B", correcta: false },
          { texto: "2x6", icono: "C", correcta: false }
        ]
      }
    ]
  },
  4: {
    id: 4,
    folderName: '4_Espacio',
    title: "Espacio y sistema solar",
    color: "#1E3A8A",
    icon: "🪐",
    questions: [
      {
        titulo: "¿Cuál es el planeta más grande?",
        subtitulo: "Pregunta 1 de 3",
        opciones: [
          { texto: "Marte", icono: "A", correcta: false },
          { texto: "Júpiter", icono: "B", correcta: true },
          { texto: "Venus", icono: "C", correcta: false }
        ]
      },
      {
        titulo: "¿Qué usan los astronautas para viajar al espacio?",
        subtitulo: "Pregunta 2 de 3",
        opciones: [
          { texto: "Submarino", icono: "A", correcta: false },
          { texto: "Cohete", icono: "B", correcta: true },
          { texto: "Tren", icono: "C", correcta: false }
        ]
      },
      {
        titulo: "¿Qué brilla en el cielo durante la noche?",
        subtitulo: "Pregunta 3 de 3",
        opciones: [
          { texto: "Luna", icono: "A", correcta: true },
          { texto: "Arcoíris", icono: "B", correcta: false },
          { texto: "Sol", icono: "C", correcta: false }
        ]
      }
    ]
  },
  5: {
    id: 5,
    folderName: '5_Fenomenos',
    title: "Fenómenos naturales",
    color: "#EC6769",
    icon: "🌋",
    questions: [
      {
        titulo: "¿Qué sale de un volcán?",
        subtitulo: "Pregunta 1 de 3",
        opciones: [
          { texto: "Lava", icono: "A", correcta: true },
          { texto: "Nubes", icono: "B", correcta: false },
          { texto: "Arena", icono: "C", correcta: false }
        ]
      },
      {
        titulo: "¿Qué fenómeno gira muy fuerte?",
        subtitulo: "Pregunta 2 de 3",
        opciones: [
          { texto: "Tornado", icono: "A", correcta: true },
          { texto: "Rayo", icono: "B", correcta: false },
          { texto: "Volcán", icono: "C", correcta: false }
        ]
      },
      {
        titulo: "¿Qué ilumina el cielo durante una tormenta?",
        subtitulo: "Pregunta 3 de 3",
        opciones: [
          { texto: "Sol", icono: "A", correcta: false },
          { texto: "Arcoíris", icono: "B", correcta: false },
          { texto: "Rayo", icono: "C", correcta: true }
        ]
      }
    ]
  },
  6: {
    id: 6,
    folderName: '6_Analogias',
    title: "Analogías",
    color: "#FED43B",
    icon: "⚖️",
    questions: [
      {
        titulo: "Manzana es a fruta como zanahoria es a...",
        subtitulo: "Pregunta 1 de 3",
        opciones: [
          { texto: "Verdura", icono: "A", correcta: true },
          { texto: "Animal", icono: "B", correcta: false },
          { texto: "Juguete", icono: "C", correcta: false }
        ]
      },
      {
        titulo: "Pez es a agua como pájaro es a...",
        subtitulo: "Pregunta 2 de 3",
        opciones: [
          { texto: "Árbol", icono: "A", correcta: false },
          { texto: "Aire", icono: "B", correcta: true },
          { texto: "Tierra", icono: "C", correcta: false }
        ]
      },
      {
        titulo: "Semilla es a planta como huevo es a...",
        subtitulo: "Pregunta 3 de 3",
        opciones: [
          { texto: "Pollito", icono: "A", correcta: true },
          { texto: "Nido", icono: "B", correcta: false },
          { texto: "Pluma", icono: "C", correcta: false }
        ]
      }
    ]
  },
  7: {
    id: 7,
    folderName: '7_Selva',
    title: "Animales de la selva",
    color: "#4CB8A4",
    icon: "🐅",
    questions: [
      {
        titulo: "¿Qué animal pasa la mayor parte de su vida en los árboles?",
        subtitulo: "Pregunta 1 de 3",
        opciones: [
          { texto: "Jaguar", icono: "A", correcta: false },
          { texto: "Perezoso", icono: "B", correcta: true },
          { texto: "Tucán", icono: "C", correcta: false }
        ]
      },
      {
        titulo: "¿Qué animal tiene un pico grande y colorido?",
        subtitulo: "Pregunta 2 de 3",
        opciones: [
          { texto: "Mono", icono: "A", correcta: false },
          { texto: "Tucán", icono: "B", correcta: true },
          { texto: "Perezoso", icono: "C", correcta: false }
        ]
      },
      {
        titulo: "¿Cuál es un felino de la selva?",
        subtitulo: "Pregunta 3 de 3",
        opciones: [
          { texto: "Jaguar", icono: "A", correcta: true },
          { texto: "Tucán", icono: "B", correcta: false },
          { texto: "Mono", icono: "C", correcta: false }
        ]
      }
    ]
  },
  8: {
    id: 8,
    folderName: '8_Oceano',
    title: "Animales del océano",
    color: "#6CC8EB",
    icon: "🐬",
    questions: [
      {
        titulo: "¿Cuál es un mamífero marino?",
        subtitulo: "Pregunta 1 de 3",
        opciones: [
          { texto: "Delfín", icono: "A", correcta: true },
          { texto: "Tortuga", icono: "B", correcta: false },
          { texto: "Tiburón", icono: "C", correcta: false }
        ]
      },
      {
        titulo: "¿Qué animal tiene caparazón?",
        subtitulo: "Pregunta 2 de 3",
        opciones: [
          { texto: "Tiburón", icono: "A", correcta: false },
          { texto: "Tortuga", icono: "B", correcta: true },
          { texto: "Pulpo", icono: "C", correcta: false }
        ]
      },
      {
        titulo: "¿Qué animal tiene dientes afilados?",
        subtitulo: "Pregunta 3 de 3",
        opciones: [
          { texto: "Pulpo", icono: "A", correcta: false },
          { texto: "Tortuga", icono: "B", correcta: false },
          { texto: "Tiburón", icono: "C", correcta: true }
        ]
      }
    ]
  },
  9: {
    id: 9,
    folderName: '9_Cuerpo_humano',
    title: "Cuerpo humano",
    color: "#E59432",
    icon: "🫀",
    questions: [
      {
        titulo: "¿Qué órgano recibe los alimentos que comemos?",
        subtitulo: "Pregunta 1 de 3",
        opciones: [
          { texto: "Corazón", icono: "A", correcta: false },
          { texto: "Estómago", icono: "B", correcta: true },
          { texto: "Pulmón", icono: "C", correcta: false }
        ]
      },
      {
        titulo: "¿Qué órgano nos ayuda a respirar?",
        subtitulo: "Pregunta 2 de 3",
        opciones: [
          { texto: "Estómago", icono: "A", correcta: false },
          { texto: "Pulmones", icono: "B", correcta: true },
          { texto: "Corazón", icono: "C", correcta: false }
        ]
      },
      {
        titulo: "¿Qué órgano bombea sangre a todo el cuerpo?",
        subtitulo: "Pregunta 3 de 3",
        opciones: [
          { texto: "Pulmones", icono: "A", correcta: false },
          { texto: "Estómago", icono: "B", correcta: false },
          { texto: "Corazón", icono: "C", correcta: true }
        ]
      }
    ]
  },
  10: {
    id: 10,
    folderName: '10_Visual',
    title: "Comprensión visual y valores",
    color: "#ED719A",
    icon: "🤝",
    questions: [
      {
        titulo: "¿Cuál parece ser el problema principal?",
        subtitulo: "Pregunta 1 de 3",
        opciones: [
          { texto: "El cachorro no puede salir", icono: "A", correcta: true },
          { texto: "Juegan escondidas", icono: "B", correcta: false },
          { texto: "Busca comida", icono: "C", correcta: false }
        ]
      },
      {
        titulo: "¿Por qué ayudan al cachorro?",
        subtitulo: "Pregunta 2 de 3",
        opciones: [
          { texto: "Empatía", icono: "A", correcta: true },
          { texto: "Correr más rápido", icono: "B", correcta: false },
          { texto: "Buscar juguete", icono: "C", correcta: false }
        ]
      },
      {
        titulo: "¿Qué habría ocurrido si lo ignoraban?",
        subtitulo: "Pregunta 3 de 3",
        opciones: [
          { texto: "Seguiría atrapado", icono: "A", correcta: true },
          { texto: "Construiría una casa", icono: "B", correcta: false },
          { texto: "Ganarían premio", icono: "C", correcta: false }
        ]
      }
    ]
  }
};
