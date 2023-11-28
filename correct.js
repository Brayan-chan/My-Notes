document.addEventListener("DOMContentLoaded", function () {
  const editorContent = document.getElementById("note-content-div");

  // Configura Typo.js con el diccionario en español
  const dictionary = new Typo("es_ES", "typo.es_ES.aff", "typo.es_ES.dic");

  // Función para realizar la corrección ortográfica
  function corregirOrtografia() {
    const texto = editorContent.innerText;
    const palabras = texto.split(/\s+/);

    const palabrasIncorrectas = palabras.filter(
      (palabra) => !dictionary.check(palabra)
    );

    // Devuelve las palabras incorrectas
    return palabrasIncorrectas;
  }

  // Función para actualizar la vista previa y realizar la corrección ortográfica en tiempo real
  function updatePreviewWithSpellCheck() {
    const palabrasIncorrectas = corregirOrtografia();

    // Resalta las palabras incorrectas
    resaltarPalabrasIncorrectas(palabrasIncorrectas);

    // Asocia la función de mostrar sugerencias al clic derecho
    editorContent.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      const palabraSeleccionada = window.getSelection().toString().trim();
      if (
        palabraSeleccionada &&
        !dictionary.check(palabraSeleccionada) &&
        palabrasIncorrectas.includes(palabraSeleccionada)
      ) {
        mostrarSugerenciasEncima(
          palabraSeleccionada,
          dictionary.suggest(palabraSeleccionada),
          event.clientX,
          event.clientY
        );
      }
    });
  }

  // Función para resaltar las palabras incorrectas
  function resaltarPalabrasIncorrectas(palabrasIncorrectas) {
    const contenido = editorContent.innerText;
    const contenidoHTML = contenido.replace(
      new RegExp(
        palabrasIncorrectas.map((palabra) => `\\b${palabra}\\b`).join("|"),
        "gi"
      ),
      (match) => `<span class="incorrecta">${match}</span>`
    );
    editorContent.innerHTML = contenidoHTML;
  }

  // Función para mostrar sugerencias encima de la palabra incorrecta
  function mostrarSugerenciasEncima(palabraIncorrecta, sugerencias, x, y) {
    const sugerenciasDiv = document.getElementById("sugerenciasDiv");

    // Limpia sugerencias anteriores
    sugerenciasDiv.innerHTML = "";

    // Muestra las nuevas sugerencias
    sugerencias.forEach(function (sugerencia) {
      const sugerenciaElemento = document.createElement("div");
      sugerenciaElemento.innerText = sugerencia;

      sugerenciaElemento.addEventListener("click", function () {
        // Reemplaza la palabra incorrecta con la sugerencia seleccionada
        reemplazarPalabra(palabraIncorrecta, sugerencia);
        // Oculta las sugerencias después de la corrección
        sugerenciasDiv.style.display = "none";
        // Actualiza la vista previa después de la corrección
        updatePreviewWithSpellCheck();
      });

      sugerenciasDiv.appendChild(sugerenciaElemento);
    });

    // Posiciona el elemento de sugerencias encima de la palabra
    sugerenciasDiv.style.position = "absolute";
    sugerenciasDiv.style.top = y + "px";
    sugerenciasDiv.style.left = x + "px";
    sugerenciasDiv.style.display = "block";
  }

  // Función para reemplazar una palabra en el contenido del editor
  function reemplazarPalabra(palabraAntigua, palabraNueva) {
    const contenido = editorContent.innerHTML;
    const nuevoContenido = contenido.replace(
      new RegExp(escapeRegExp(palabraAntigua), "gi"),
      palabraNueva
    );
    editorContent.innerHTML = nuevoContenido;
  }

  // Función para escapar caracteres especiales en una expresión regular
  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // Asocia la función de corrección ortográfica a los eventos de entrada
  editorContent.addEventListener("input", updatePreviewWithSpellCheck);
});
