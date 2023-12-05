function selectAllAndSummarize() {
  const noteContent = document.getElementById("note-content-div");

  // Selecciona todo el contenido del note-content-div
  const range = document.createRange();
  range.selectNodeContents(noteContent);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  // Genera un resumen del contenido seleccionado
  const selectedText = selection.toString();
  const summary = generateSummary(selectedText);

  // Muestra el contenedor de resumen y actualiza el texto
  const contentSummary = document.getElementById("content-summary");
  const summaryText = document.getElementById("summary-text");
  summaryText.textContent = summary;
  contentSummary.style.display = "block";
}

function acceptSummary() {
  const noteContent = document.getElementById("note-content-div");
  const summaryText = document.getElementById("summary-text");

  // Reemplaza el contenido del note-content-div con el resumen aceptado
  noteContent.innerHTML = summaryText.textContent;

  // Oculta el contenedor de resumen
  const contentSummary = document.getElementById("content-summary");
  contentSummary.style.display = "none";
}

function discardSummary() {
  // Simplemente oculta el contenedor de resumen sin hacer cambios
  const contentSummary = document.getElementById("content-summary");
  contentSummary.style.display = "none";
}

function generateSummary(text) {
  // Divide el texto en oraciones
  const sentences = text.split(/[.!?]/);

  // Filtra las oraciones para eliminar cadenas vacías
  const nonEmptySentences = sentences.filter(
    (sentence) => sentence.trim() !== ""
  );

  // Selecciona un número fijo de oraciones para el resumen (puedes ajustar este número)
  const summarySentences = nonEmptySentences.slice(0, 3); // Aquí se seleccionan las primeras 3 oraciones como ejemplo

  // Une las oraciones seleccionadas para formar el resumen
  const summary = summarySentences.join(" ");

  return summary;
}

