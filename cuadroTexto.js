let isTextBoxDrawingMode = false;

function toggleTextBoxDrawingMode() {
  isTextBoxDrawingMode = !isTextBoxDrawingMode;

  if (isTextBoxDrawingMode) {
    // Habilitar el modo de dibujo de cuadro de texto
    enableTextBoxDrawingMode();
  } else {
    // Deshabilitar el modo de dibujo de cuadro de texto
    disableTextBoxDrawingMode();
  }
}

function enableTextBoxDrawingMode() {
  // Agregar un evento de clic al contenido editable para permitir al usuario dibujar cuadros de texto
  const contentEditable = document.getElementById("note-content-div");
  contentEditable.addEventListener("click", handleTextBoxDrawing);
}

function disableTextBoxDrawingMode() {
  // Quitar el evento de clic del contenido editable para detener el dibujo de cuadros de texto
  const contentEditable = document.getElementById("note-content-div");
  contentEditable.removeEventListener("click", handleTextBoxDrawing);
}

function handleTextBoxDrawing(event) {
  // Evitar que el evento se propague al contenido editable subyacente
  event.stopPropagation();

  // Aquí puedes implementar la lógica para dibujar o crear cuadros de texto en el contenido editable
  // Puedes usar las coordenadas del evento (event.clientX, event.clientY) para determinar la posición
  // También puedes agregar un elemento <div> o similar para representar el cuadro de texto y permitir al usuario escribir en él
  // Recuerda ajustar y estilizar según tus necesidades
  const textBox = document.createElement("div");
  textBox.contentEditable = true;
  textBox.style.border = "1px dashed #000"; // Puedes personalizar el estilo del borde
  textBox.style.position = "absolute";
  textBox.style.left = `${event.clientX}px`;
  textBox.style.top = `${event.clientY}px`;

  // Agregar el cuadro de texto al contenido editable
  const contentEditable = document.getElementById("note-content-div");
  contentEditable.appendChild(textBox);

  // Desactivar el modo de dibujo de cuadro de texto después de crear el cuadro
  toggleTextBoxDrawingMode();
}

