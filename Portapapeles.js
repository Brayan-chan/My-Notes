// Variable global para almacenar el portapapeles
const clipboard = [];

// Función para abrir la ventana del portapapeles
function openClipboardWindow() {
  // Crear el contenedor de la ventana
  const clipboardContainer = document.createElement("div");
  clipboardContainer.id = "clipboard-container";
  clipboardContainer.innerHTML = `
    <div id="clipboard-header">
      <span>Portapapeles:</span>
      <button onclick="closeClipboardWindow()">❌</button>
    </div>
    <div id="clipboard-list">
      <!-- Aquí se mostrará la lista de elementos del portapapeles -->
    </div>
  `;

  // Agregar la ventana al cuerpo del documento
  document.body.appendChild(clipboardContainer);

  // Mostrar la lista de elementos del portapapeles
  const clipboardList = document.getElementById("clipboard-list");
  updateClipboardList(clipboardList);
}

// Función para cerrar la ventana del portapapeles
function closeClipboardWindow() {
  const clipboardContainer = document.getElementById("clipboard-container");
  if (clipboardContainer) {
    clipboardContainer.remove();
  }
}

// Función para actualizar la lista de elementos del portapapeles
function updateClipboardList(container) {
  // Limpiar la lista existente
  container.innerHTML = "";

  // Agregar cada elemento del portapapeles a la lista
  clipboard.forEach((item, index) => {
    const listItem = document.createElement("div");
    listItem.innerHTML = `
      <span>${item}</span>
      <button class="clipboard-buttons" onclick="insertFromClipboard(${index})">✔️</button>
      <button class="clipboard-buttons" onclick="removeFromClipboard(${index})">❌</button>
    `;
    container.appendChild(listItem);
  });
}

// Función para insertar un elemento del portapapeles en el note-content-div
function insertFromClipboard(index) {
  const contentEditable = document.getElementById("note-content-div");
  if (contentEditable) {
    const selectedText = clipboard[index];
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(selectedText));
  }

  // Cerrar la ventana del portapapeles después de insertar
  closeClipboardWindow();
}

// Función para eliminar un elemento del portapapeles
function removeFromClipboard(index) {
  clipboard.splice(index, 1);

  // Actualizar la lista de elementos del portapapeles
  const clipboardList = document.getElementById("clipboard-list");
  updateClipboardList(clipboardList);
}

// Evento para abrir la ventana del portapapeles al hacer clic en el botón
document
  .getElementById("clipboard-button")
  .addEventListener("click", async () => {
    try {
      // Obtener el texto del portapapeles
      const text = await navigator.clipboard.readText();

      // Agregar el texto al portapapeles solo si no está vacío y no está ya en la lista
      if (text.trim() !== "" && !clipboard.includes(text)) {
        clipboard.unshift(text);

        // Actualizar la lista de elementos del portapapeles
        const clipboardList = document.getElementById("clipboard-list");
        updateClipboardList(clipboardList);
      }
    } catch (err) {
      console.error("Error al acceder al portapapeles:", err);
    }

    // Abrir la ventana del portapapeles
    openClipboardWindow();
  });

// También puedes cerrar la ventana del portapapeles haciendo clic fuera de ella
document.addEventListener("click", (event) => {
  const clipboardContainer = document.getElementById("clipboard-container");
  if (clipboardContainer && !clipboardContainer.contains(event.target)) {
    closeClipboardWindow();
  }
});
