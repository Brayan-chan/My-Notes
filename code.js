// Agrega una nueva función para insertar código
function insertCode() {
  // Pregunta al usuario qué lenguaje desea ingresar
  const language = prompt("Ingrese el lenguaje de programación:");

  if (language) {
    // Obtiene el contenido actual del editor
    const contentDiv = document.getElementById("note-content-div");

    // Pide al usuario que ingrese el código
    const code = prompt(`Ingrese su código ${language}:`);

    // Si el usuario ingresó código, lo agrega al editor con el formato correspondiente
    if (code) {
      // Crea un nuevo elemento pre para el código
      const codeElement = document.createElement("pre");

      // Asigna la clase correspondiente al lenguaje para resaltar la sintaxis
      codeElement.classList.add(`language-${language}`);

      // Agrega el código al elemento pre
      codeElement.textContent = code;

      // Inserta el elemento pre en el editor
      contentDiv.appendChild(codeElement);

      // Actualiza la vista previa
      updatePreview();
    }
  }
}

function resaltarCodigo() {
  // Obtén el contenido del área de contenido
  var contenidoCodigo = document.getElementById("note-content-div").innerText;

  // Obtén el lenguaje del código (puedes permitir que el usuario lo seleccione)
  var lenguajeSeleccionado = "javascript"; // Cambia esto según tus necesidades

  // Resalta el código con Prism.js
  var codigoResaltado = Prism.highlight(
    contenidoCodigo,
    Prism.languages[lenguajeSeleccionado],
    lenguajeSeleccionado
  );

  // Establece el código resaltado en el área de contenido
  document.getElementById("note-content-div").innerHTML = codigoResaltado;

  // Actualiza la vista previa con el código resaltado
  document.getElementById("preview-content").innerHTML = codigoResaltado;
}
