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
  const summary = generateKeywordSummary(selectedText);

  // Muestra el contenedor de resumen y actualiza el texto
  const contentSummary = document.getElementById("content-summary");
  contentSummary.style.display = "block"; // Mostrar el contenedor

  const summaryText = document.getElementById("summary-text");
  summaryText.textContent = summary;

  // Inserta el contenedor de resumen al principio del note-content-div
  noteContent.insertBefore(contentSummary, noteContent.firstChild);
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

function generateKeywordSummary(text) {
  // Divide el texto en oraciones
  const sentences = text.split(/[.!?]/);

  // Filtra las oraciones para eliminar cadenas vacías
  const nonEmptySentences = sentences.filter(
    (sentence) => sentence.trim() !== ""
  );

  // Selecciona las oraciones que contienen palabras clave
  const keywordSentences = nonEmptySentences.filter((sentence) =>
    containsKeyword(sentence)
  );

  // Selecciona un número fijo de oraciones para el resumen (puedes ajustar este número)
  const summarySentences = keywordSentences.slice(0, 3); // Aquí se seleccionan las primeras 3 oraciones como ejemplo

  // Une las oraciones seleccionadas para formar el resumen
  const summary = summarySentences.join(" ");

  return summary;
}

function containsKeyword(sentence) {
  // Lista de palabras clave
  const keywords = [
    "SON",
    "SE LOGRAN",
    "SE REALIZAN",
    "SE LOGRA",
    "SIGNIFICA",
    "SE CONSIDERA",
    "ES IMPORTANTE",
    "PROCESAN",
    "ES",
    "LOS",
    "LAS",
    "LA",
    "UN",
    "UNA",
    "TAMBIÉN",
    "CONOCIDA COMO",
    "ES UNA",
    "ES UN",
    "PROPIEDADES",
    "CARACTERÍSTICAS",
    "ÚTIL",
    "IMPORTANTE",
    "SE REFIERE",
    "REPRESENTA",
    "REPRESENTAN",
    "EN OTRAS PALABRAS",
    "PERMITE",
    "SU FUNCIÓN ES",
    "ES UN TIPO",
    "SON UN TIPO",
    "SE USA",
    "SE UTILIZA",
    "ESTABLECE",
    "INDICA",
    "INDICAN",
    "CONOCIDO COMO",
    "TAMBIÉN",
    "SIRVE",
    "SIRVEN",
    "SIRVE COMO",
    "SIRVEN COMO",
    "SIRVE PARA",
    "SIRVEN PARA",
    "FUNCIONA",
    "FUNCIONAN",
    "FUNCIONA COMO",
    "UTLIZA",
    "BASADA EN",
    "BASADO EN",
    "OTRA DE LAS CARACTERÍSTICAS",
  ];

  // Comprueba si la oración contiene alguna palabra clave
  return keywords.some((keyword) => sentence.toUpperCase().includes(keyword));
}
