let drawingMode = false;
let canvas;
let context;
let isDrawing = false;
let notes = [];

function toggleDrawingMode() {
  drawingMode = !drawingMode;

  const contentDiv = document.getElementById("note-content-div");

  if (drawingMode) {
    initializeCanvas();
    contentDiv.setAttribute("contenteditable", "false"); // Desactivar la edición durante el modo dibujo
  } else {
    stopDrawing();
    contentDiv.setAttribute("contenteditable", "true"); // Permitir la edición de contenido
  }
}




function initializeCanvas() {
  canvas = document.createElement("canvas");
  canvas.width = 410;
  canvas.height = 500;
  canvas.style.backgroundColor = "#0D0909";
  canvas.style.margin = "auto";

  context = canvas.getContext("2d");

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);

  const noteContentDiv = document.getElementById("note-content-div");
  noteContentDiv.appendChild(canvas);
}

function startDrawing(e) {
  if (!drawingMode) return;

  isDrawing = true;
  context.beginPath();
  context.moveTo(e.clientX, e.clientY);
}

function draw(e) {
  if (!isDrawing || !drawingMode) return;

  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = 5;
  context.strokeStyle = "white";

  context.lineTo(e.clientX, e.clientY);
  context.stroke();
}

function stopDrawing() {
  isDrawing = false;
}

document
  .getElementById("note-content-div")
  .addEventListener("mousedown", function (e) {
    if (!canvas || !drawingMode) return;

    const clickedOutsideCanvas = !canvas.contains(e.target);
    if (clickedOutsideCanvas) {
      stopDrawing();
    }
  });

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && drawingMode) {
    toggleDrawingMode();
  }
});

function switchToNote(index) {
  const note = notes[index];

  // Mostrar el contenido almacenado
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

