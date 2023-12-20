// Función para cambiar el tamaño de la página y la orientación
function setPageLayout(size, orientation) {
  const contentEditable = document.getElementById("note-content-div");

  // Aplicar estilos CSS al contenido editable
  contentEditable.style.width = size === "A4" ? "210mm" : "297mm";
  contentEditable.style.height = size === "A4" ? "297mm" : "210mm";
  contentEditable.style.margin = "auto";

  // Cambiar la orientación
  contentEditable.style.transform =
    orientation === "horizontal" ? "rotate(90deg)" : "rotate(0deg)";
}

// Ejemplo de cómo usar la función
setPageLayout("A4", "vertical");
