let drawingMode = false; // Variable para rastrear si estamos en modo de dibujo
let canvas; // Elemento de lienzo
let context; // Contexto de dibujo
let isDrawing = false;
let notes = []; // Almacena las notas

// Función para activar/desactivar el modo de dibujo
function toggleDrawingMode() {
  drawingMode = !drawingMode;

  if (drawingMode) {
    initializeCanvas();
  } else {
    stopDrawing();
  }
}

// Función para inicializar el lienzo
function initializeCanvas() {
  // No limpiar el lienzo existente, solo crear uno nuevo si no existe
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.width = 580;
    canvas.height = 500;
    canvas.style.backgroundColor = "#0D0909";
    canvas.style.margin = "auto"; // Centro el lienzo

    context = canvas.getContext("2d");

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    // Adjuntar el nuevo lienzo a la nota actual
    const noteContentDiv = document.getElementById("note-content-div");
    noteContentDiv.appendChild(canvas);
  }
}

// Función para limpiar el lienzo y desactivar el modo de dibujo
function clearCanvas() {
  if (canvas) {
    document.getElementById("note-content-div").removeChild(canvas);
    canvas = null;
    context = null;
  }
}

// Función para comenzar el dibujo
function startDrawing(e) {
  if (!drawingMode) return;

  isDrawing = true;
  context.beginPath();
  context.moveTo(e.clientX, e.clientY);
}

// Función para dibujar
function draw(e) {
  if (!isDrawing || !drawingMode) return;

  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = 5;
  context.strokeStyle = "white";

  context.lineTo(e.clientX, e.clientY);
  context.stroke();
}

// Función para detener el dibujo
function stopDrawing() {
  isDrawing = false;
}

// Evento para detener el dibujo cuando se hace clic en otro lugar de la nota
document
  .getElementById("note-content-div")
  .addEventListener("mousedown", function (e) {
    if (!canvas || !drawingMode) return;

    const clickedOutsideCanvas = !canvas.contains(e.target);
    if (clickedOutsideCanvas) {
      stopDrawing();
    }
  });

// Evento para detener el dibujo cuando se presiona la tecla Escape
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && drawingMode) {
    toggleDrawingMode();
  }
});

// Función para cambiar a una nota existente
function switchToNote(index) {
  const note = notes[index];

  // Mostrar el contenido y dibujo almacenado
  document.getElementById("note-content-div").innerHTML = note.content;

  if (note.drawing) {
    const img = new Image();
    img.src = note.drawing;
    img.onload = function () {
      initializeCanvas(); // Crear un nuevo lienzo solo si no hay uno existente
      context.drawImage(img, 0, 0);
    };
  } else {
    initializeCanvas(); // Crear un nuevo lienzo solo si no hay uno existente
  }
}



