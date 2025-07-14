// script.js

// Funciones para manejo de localStorage de notas
function saveNotesToStorage() {
  const notesContainer = document.getElementById("notes-container");
  const notes = [];
  
  // Recopilar todas las notas existentes
  const noteElements = notesContainer.querySelectorAll(".note");
  noteElements.forEach((noteElement, index) => {
    const titleElement = noteElement.querySelector("h3");
    const contentElement = noteElement.querySelector("div");
    
    if (titleElement && contentElement) {
      notes.push({
        id: index,
        title: titleElement.textContent,
        content: contentElement.innerHTML,
        timestamp: Date.now()
      });
    }
  });
  
  localStorage.setItem("myNotes", JSON.stringify(notes));
  updateNotesCounter(notes.length);
  console.log("Notes saved to localStorage:", notes.length, "notes");
}

function updateNotesCounter(count) {
  const counterElement = document.getElementById("notes-count");
  if (counterElement) {
    counterElement.textContent = count || 0;
  }
}

function loadNotesFromStorage() {
  const savedNotes = localStorage.getItem("myNotes");
  if (savedNotes) {
    const notes = JSON.parse(savedNotes);
    const notesContainer = document.getElementById("notes-container");
    
    // Limpiar contenedor antes de cargar
    notesContainer.innerHTML = "";
    
    notes.forEach((note, index) => {
      const noteElement = document.createElement("div");
      noteElement.classList.add("note");
      noteElement.setAttribute("data-note-id", index);
      noteElement.innerHTML = `
        <button style="float: right; color: red; background-color: transparent; border: none; cursor: pointer;" onclick="deleteNote(this)"><i class="fa-solid fa-trash-can"></i></button>
        <button style="float: right; color: green; background-color: transparent; border: none; cursor: pointer;" onclick="editNote(this)"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="print-button" style="float: right; color: black; background-color: transparent; border: none; cursor: pointer;" onclick="printNote(this)"><i class="fa-solid fa-print"></i></button>
        <button style="float: right; color: blue; background-color: transparent; border: none; cursor: pointer;" onclick="copyNote(this)"><i class="fa-solid fa-copy"></i></button>
        <h3>${note.title}</h3>
        <div>${note.content}</div>
      `;
      notesContainer.appendChild(noteElement);
    });
    
    updateNotesCounter(notes.length);
    console.log("Notes loaded from localStorage:", notes.length, "notes");
  } else {
    updateNotesCounter(0);
  }
}

function deleteNoteFromStorage(noteElement) {
  const noteId = parseInt(noteElement.getAttribute("data-note-id"));
  const savedNotes = localStorage.getItem("myNotes");
  
  if (savedNotes) {
    let notes = JSON.parse(savedNotes);
    // Filtrar la nota a eliminar
    notes = notes.filter((_, index) => index !== noteId);
    
    // Reindexar las notas restantes
    const notesContainer = document.getElementById("notes-container");
    const remainingNotes = notesContainer.querySelectorAll(".note");
    remainingNotes.forEach((element, index) => {
      element.setAttribute("data-note-id", index);
    });
    
    localStorage.setItem("myNotes", JSON.stringify(notes));
    console.log("Note deleted from localStorage. Remaining notes:", notes.length);
  }
}

function updateNoteInStorage(oldNoteElement, newTitle, newContent) {
  const noteId = parseInt(oldNoteElement.getAttribute("data-note-id"));
  const savedNotes = localStorage.getItem("myNotes");
  
  if (savedNotes) {
    const notes = JSON.parse(savedNotes);
    if (notes[noteId]) {
      notes[noteId].title = newTitle;
      notes[noteId].content = newContent;
      notes[noteId].timestamp = Date.now();
      
      localStorage.setItem("myNotes", JSON.stringify(notes));
      console.log("Note updated in localStorage:", noteId);
    }
  }
}

// Funciones auxiliares para gestión de notas
function clearAllNotes() {
  if (confirm("¿Estás seguro de que quieres eliminar todas las notas? Esta acción no se puede deshacer.")) {
    localStorage.removeItem("myNotes");
    const notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = "";
    updateNotesCounter(0);
    console.log("All notes cleared from localStorage and UI");
  }
}

function exportNotes() {
  const savedNotes = localStorage.getItem("myNotes");
  if (savedNotes) {
    const notes = JSON.parse(savedNotes);
    const dataStr = JSON.stringify(notes, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `my-notes-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    console.log("Notes exported:", notes.length, "notes");
  } else {
    alert("No hay notas para exportar.");
  }
}

function importNotes(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const importedNotes = JSON.parse(e.target.result);
        if (Array.isArray(importedNotes)) {
          localStorage.setItem("myNotes", JSON.stringify(importedNotes));
          loadNotesFromStorage();
          console.log("Notes imported:", importedNotes.length, "notes");
          alert(`${importedNotes.length} notas importadas correctamente.`);
        } else {
          alert("El archivo no tiene el formato correcto.");
        }
      } catch (error) {
        alert("Error al leer el archivo: " + error.message);
      }
    };
    reader.readAsText(file);
  }
}

function changeFont() {
  const fontFamilySelect = document.getElementById("font-family");
  const selectedFont = fontFamilySelect.value;
  const noteContentDiv = document.getElementById("note-content-div");
  
  // Aplicar la fuente al contenedor completo
  noteContentDiv.style.fontFamily = selectedFont;
  
  // También aplicar a cualquier texto que esté seleccionado
  if (window.getSelection().toString()) {
    document.execCommand("fontName", false, selectedFont);
  }
}

function applyFontFamily() {
  const fontFamily = prompt(
    "Ingresa el nombre de la fuente (por ejemplo, Arial):"
  );
  if (fontFamily) {
    document.execCommand("fontName", false, fontFamily);
  }
}

function handleInput() {
  console.log("Se ha detectado una entrada de texto");
}

function applyFormat(style) {
  document.execCommand(style, false, null);
}

function applyForeColor() {
  const color = prompt(
    "Ingresa el color de texto (nombre o código hexadecimal):"
  );
  if (color) {
    document.execCommand("foreColor", false, color);
  }
}

function applyBackColor() {
  const color = prompt(
    "Ingresa el color de fondo (nombre o código hexadecimal):"
  );
  if (color) {
    document.execCommand("backColor", false, color);
  }
}

function applyFontSize() {
  const size = prompt("Ingresa el tamaño de fuente (1-7):");
  if (size && /^[1-7]$/.test(size)) {
    document.execCommand("fontSize", false, size);
  }
}

function applyAlign(align) {
  document.execCommand(align, false, null);
}

function applyList(listType) {
  document.execCommand(listType, false, null);
}

function addLink() {
  const url = prompt("Ingresa la URL del hipervínculo:");
  if (url) {
    document.execCommand("createLink", false, url);
  }
}

function addImage() {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.display = "none";

  fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
        img.style.maxWidth = "100%";
        img.style.height = "auto";
        img.draggable = true;

        // Agrega la clase resizable para permitir el redimensionamiento
        img.classList.add("resizable");

        const contentDiv = document.getElementById("note-content-div");

        img.addEventListener("click", function () {
          selectedImage = this;
        });

        const existingImage = contentDiv.querySelector("img");
        if (existingImage) {
          existingImage.src = img.src;
        } else {
          contentDiv.appendChild(img);
        }

        updatePreview();
        fileInput.value = null;
      };
      reader.readAsDataURL(file);
    }
  });

  fileInput.click();
}

function selectImage() {
  const images = document.querySelectorAll("#note-content-div img");
  images.forEach((img) => {
    img.style.border = "2px solid transparent";
  });

  images.forEach((img) => {
    img.addEventListener("click", function () {
      selectedImage = this;
      this.style.border = "2px dashed blue";
    });
  });
}

function deselectImage() {
  if (selectedImage) {
    selectedImage.style.border = "2px solid transparent";
    selectedImage = null;
  }
}

function moveImage() {
  if (selectedImage) {
    let isDragging = false;
    let originalX, originalY, originalPosition;
    selectedImage.style.cursor = "move";

    selectedImage.addEventListener("mousedown", function (event) {
      isDragging = true;
      originalX = event.clientX - selectedImage.getBoundingClientRect().left;
      originalY = event.clientY - selectedImage.getBoundingClientRect().top;
      originalPosition = selectedImage.style.position || "";

      selectedImage.style.position = "relative";

      document.addEventListener("mousemove", drag);

      event.preventDefault();
    });

    document.addEventListener("mouseup", function () {
      if (isDragging) {
        isDragging = false;
        selectedImage.style.position = originalPosition;
        document.removeEventListener("mousemove", drag);
      }
    });

    function drag(event) {
      if (isDragging) {
        const x = event.clientX - originalX;
        const y = event.clientY - originalY;

        selectedImage.style.left = `${x}px`;
        selectedImage.style.top = `${y}px`;
      }
    }
  }
}

function resizeImage() {
  if (selectedImage) {
    selectedImage.style.cursor = "nwse-resize";

    selectedImage.addEventListener("mousedown", function (event) {
      event.preventDefault();
      const startX = event.clientX;
      const startY = event.clientY;
      const startWidth = parseInt(getComputedStyle(selectedImage).width, 10);
      const startHeight = parseInt(getComputedStyle(selectedImage).height, 10);

      document.addEventListener("mousemove", resize);

      document.addEventListener("mouseup", function () {
        document.removeEventListener("mousemove", resize);
      });

      function resize(event) {
        const newWidth = startWidth + event.clientX - startX;
        const newHeight = startHeight + event.clientY - startY;

        selectedImage.style.width = `${newWidth}px`;
        selectedImage.style.height = `${newHeight}px`;
      }
    });
  }
}

function createNote() {
  const title = document.getElementById("note-title").value;
  const contentDiv = document.getElementById("note-content-div");

  if (title || contentDiv.innerHTML.trim() !== "") {
    const notesContainer = document.getElementById("notes-container");
    const currentNotesCount = notesContainer.querySelectorAll(".note").length;
    
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.setAttribute("data-note-id", currentNotesCount);
    noteElement.innerHTML = `
            <button style="float: right; color: red; background-color: transparent; border: none; cursor: pointer;" onclick="deleteNote(this)"><i class="fa-solid fa-trash-can"></i></button>
            <button style="float: right; color: green; background-color: transparent; border: none; cursor: pointer;" onclick="editNote(this)"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="print-button" style="float: right; color: black; background-color: transparent; border: none; cursor: pointer;" onclick="printNote(this) "><i class="fa-solid fa-print"></i></button>
            <button style="float: right; color: blue; background-color: transparent; border: none; cursor: pointer;" onclick="copyNote(this)"><i class="fa-solid fa-copy"></i></button>

            <h3>${title}</h3>
            <div>${contentDiv.innerHTML}</div>
        `;

    notesContainer.appendChild(noteElement);

    // Guardar en localStorage después de crear la nota
    saveNotesToStorage();

    document.getElementById("note-title").value = "";
    contentDiv.innerHTML = "";
    document.getElementById("preview-title").textContent = "";
    const previewContent = document.getElementById("preview-content");
    while (previewContent.firstChild) {
      previewContent.removeChild(previewContent.firstChild);
    }
  }
}

function deleteNote(button) {
  const note = button.closest(".note");
  
  // Eliminar del localStorage antes de eliminar del DOM
  deleteNoteFromStorage(note);
  
  // Eliminar del DOM
  note.remove();
  
  // Actualizar el localStorage con la nueva estructura
  saveNotesToStorage();
}

function editNote(button) {
  const note = button.closest(".note");
  const title = note.querySelector("h3").textContent;
  const contentElement = note.querySelector("div");
  const content = contentElement.innerHTML;
  
  // Llenar los campos del editor con el contenido de la nota
  document.getElementById("note-title").value = title;
  document.getElementById("note-content-div").innerHTML = content;
  
  // Guardar referencia a la nota que se está editando
  const noteId = note.getAttribute("data-note-id");
  document.getElementById("note-content-div").setAttribute("data-editing-note-id", noteId);
  
  // Eliminar la nota del DOM (se recreará al guardar)
  deleteNoteFromStorage(note);
  note.remove();
  
  // Actualizar localStorage después de eliminar
  saveNotesToStorage();
}

//FUNCIONES PRELIMINARES PARA CREAR NOTAS CON DIBUJOS PERO FALTA PONER LA LOGICA PARA QUE TAMBIEN DEJE INSERTAR LAS IMAGENES Y LAS TABLAS
//ESTE CODIGO ESTA BIEN PERO HAY QUE CORREGIR EL ERROR DEL CANVAS QUE SE GENERA CUANDO SE CREA UNA NOTA

/*
function createNote() {
  const title = document.getElementById("note-title").value;
  const contentDiv = document.getElementById("note-content-div");

  if (title || contentDiv.innerHTML.trim() !== "") {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");

    // Crear una nueva imagen a partir del contenido del canvas
    const canvasImage = new Image();
    canvasImage.src = canvas.toDataURL();

    // Establecer el fondo negro para la imagen
    canvasImage.style.backgroundColor = "black";
    canvasImage.style.display = "block"; // Asegurar que la imagen se muestre como bloque

    noteElement.innerHTML = `
      <h2>${title}</h2>
      <div>${contentDiv.innerHTML}</div>
    `;

    // Agregar la imagen al elemento de la nota
    noteElement.appendChild(canvasImage);

    const notesContainer = document.getElementById("notes-container");
    notesContainer.appendChild(noteElement);

    document.getElementById("note-title").value = "";
    contentDiv.innerHTML = "";
    document.getElementById("preview-title").textContent = "";
    const previewContent = document.getElementById("preview-content");
    while (previewContent.firstChild) {
      previewContent.removeChild(previewContent.firstChild);
    }
  }
}
*/


function updatePreview() {
  const title = document.getElementById("note-title").value;
  const contentDiv = document.getElementById("note-content-div");
  const previewTitle = document.getElementById("preview-title");
  const previewContent = document.getElementById("preview-content");

  previewTitle.textContent = title;
  previewContent.innerHTML = contentDiv.innerHTML;
}

// Obtener el contenedor de contenido y registrar eventos de arrastrar y soltar
const contentDiv = document.getElementById("note-content-div");

contentDiv.addEventListener("dragover", function (e) {
  e.preventDefault();
  contentDiv.classList.add("drag-over");
});

contentDiv.addEventListener("dragleave", function () {
  contentDiv.classList.remove("drag-over");
});

contentDiv.addEventListener("drop", function (e) {
  e.preventDefault();
  contentDiv.classList.remove("drag-over");

  const files = e.dataTransfer.files;

  for (const file of files) {
    if (file.type.startsWith("image/")) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.style.maxWidth = "100%";
      img.style.height = "auto";

      img.addEventListener("click", function () {
        selectedImage = this;
      });

      contentDiv.appendChild(img);
      updatePreview();
    }
  }
});

// Agregar evento para centrar la imagen en el contenedor
document
  .getElementById("center-image-button")
  .addEventListener("click", centerImage);

function centerImage() {
  if (selectedImage) {
    const containerWidth = contentDiv.offsetWidth;
    const containerHeight = contentDiv.offsetHeight;
    const imageWidth = selectedImage.offsetWidth;
    const imageHeight = selectedImage.offsetHeight;

    const centerX = (containerWidth - imageWidth) / 2;
    const centerY = (containerHeight - imageHeight) / 2;

    selectedImage.style.left = `${centerX}px`;
    selectedImage.style.top = `${centerY}px`;
  }
}

// Función para mover imágenes en dispositivos móviles
function moveImageMobile() {
  if (selectedImage) {
    let isDragging = false;
    let originalX, originalY, originalPosition;
    selectedImage.style.cursor = "move";

    selectedImage.addEventListener("touchstart", function (event) {
      isDragging = true;
      originalX =
        event.touches[0].clientX - selectedImage.getBoundingClientRect().left;
      originalY =
        event.touches[0].clientY - selectedImage.getBoundingClientRect().top;
      originalPosition = selectedImage.style.position || "";

      selectedImage.style.position = "absolute";

      document.addEventListener("touchmove", drag);

      event.preventDefault();
    });

    document.addEventListener("touchend", function () {
      if (isDragging) {
        isDragging = false;
        selectedImage.style.position = originalPosition;
        document.removeEventListener("touchmove", drag);
      }
    });

    function drag(event) {
      if (isDragging) {
        const x = event.touches[0].clientX - originalX;
        const y = event.touches[0].clientY - originalY;

        selectedImage.style.left = `${x}px`;
        selectedImage.style.top = `${y}px`;
      }
    }
  }
}

// Función para redimensionar imágenes en dispositivos móviles con manijas en las esquinas
function resizeImageMobileCustom() {
  if (selectedImage) {
    let isResizing = false;
    let originalWidth, originalHeight;
    let startX, startY;

    // Crear manijas en las esquinas
    const resizeHandleNW = document.createElement("div");
    resizeHandleNW.className = "resize-handle";
    resizeHandleNW.style.position = "absolute";
    resizeHandleNW.style.width = "20px";
    resizeHandleNW.style.height = "20px";
    resizeHandleNW.style.top = "0";
    resizeHandleNW.style.left = "0";
    resizeHandleNW.style.background = "rgba(0, 0, 0, 0.5)";
    resizeHandleNW.style.cursor = "nwse-resize";
    selectedImage.appendChild(resizeHandleNW);

    const resizeHandleNE = document.createElement("div");
    resizeHandleNE.className = "resize-handle";
    resizeHandleNE.style.position = "absolute";
    resizeHandleNE.style.width = "20px";
    resizeHandleNE.style.height = "20px";
    resizeHandleNE.style.top = "0";
    resizeHandleNE.style.right = "0";
    resizeHandleNE.style.background = "rgba(0, 0, 0, 0.5)";
    resizeHandleNE.style.cursor = "nesw-resize";
    selectedImage.appendChild(resizeHandleNE);

    const resizeHandleSW = document.createElement("div");
    resizeHandleSW.className = "resize-handle";
    resizeHandleSW.style.position = "absolute";
    resizeHandleSW.style.width = "20px";
    resizeHandleSW.style.height = "20px";
    resizeHandleSW.style.bottom = "0";
    resizeHandleSW.style.left = "0";
    resizeHandleSW.style.background = "rgba(0, 0, 0, 0.5)";
    resizeHandleSW.style.cursor = "nesw-resize";
    selectedImage.appendChild(resizeHandleSW);

    const resizeHandleSE = document.createElement("div");
    resizeHandleSE.className = "resize-handle";
    resizeHandleSE.style.position = "absolute";
    resizeHandleSE.style.width = "20px";
    resizeHandleSE.style.height = "20px";
    resizeHandleSE.style.bottom = "0";
    resizeHandleSE.style.right = "0";
    resizeHandleSE.style.background = "rgba(0, 0, 0, 0.5)";
    resizeHandleSE.style.cursor = "nwse-resize";
    selectedImage.appendChild(resizeHandleSE);

    // Agregar eventos de inicio de redimensionamiento a las manijas
    resizeHandleNW.addEventListener("touchstart", startResizeNW);
    resizeHandleNE.addEventListener("touchstart", startResizeNE);
    resizeHandleSW.addEventListener("touchstart", startResizeSW);
    resizeHandleSE.addEventListener("touchstart", startResizeSE);

    function startResizeNW(event) {
      isResizing = true;
      originalWidth = selectedImage.offsetWidth;
      originalHeight = selectedImage.offsetHeight;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;

      event.preventDefault();
    }

    // Agregar eventos de movimiento de redimensionamiento
    document.addEventListener("touchmove", function (event) {
      if (isResizing) {
        const currentX = event.touches[0].clientX;
        const currentY = event.touches[0].clientY;
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;

        let newWidth = originalWidth + deltaX;
        let newHeight = originalHeight + deltaY;

        // Limitar el tamaño mínimo si es necesario
        if (newWidth < 50) {
          newWidth = 50;
        }
        if (newHeight < 50) {
          newHeight = 50;
        }

        selectedImage.style.width = `${newWidth}px`;
        selectedImage.style.height = `${newHeight}px`;

        startX = currentX;
        startY = currentY;
      }
    });

    // Agregar eventos de finalización de redimensionamiento
    document.addEventListener("touchend", function () {
      isResizing = false;
    });
  }
}

document.addEventListener("touchend", function () {
  isResizing = false;
});

// Crear tablas
function createTable() {
  const rows = prompt("Número de filas:");
  const cols = prompt("Número de columnas:");

  if (rows && cols && /^\d+$/.test(rows) && /^\d+$/.test(cols)) {
    const table = document.createElement("table");
    table.classList.add("editable-table");

    for (let i = 0; i < rows; i++) {
      const row = table.insertRow();
      for (let j = 0; j < cols; j++) {
        const cell = row.insertCell();
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("editable-cell");
        contentDiv.setAttribute("contenteditable", "true");
        cell.appendChild(contentDiv);
      }
    }

    const contentDiv = document.getElementById("note-content-div");
    contentDiv.focus();
    document.execCommand("insertHTML", false, table.outerHTML);
    // No es necesario llamar a updatePreview aquí
  } else {
    alert("Por favor, ingresa números válidos para filas y columnas.");
  }
}

function toggleDarkMode() {
  const body = document.body;
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const darkModeIcon = document.getElementById("dark-mode-icon");

  // Toggle el modo oscuro
  body.classList.toggle("dark-mode");
  darkModeToggle.classList.add("animate-toggle");

  // Determinar el estado actual después del toggle
  const isDarkMode = body.classList.contains("dark-mode");

  // Actualizar el icono basado en el estado actual
  if (isDarkMode) {
    darkModeIcon.classList.remove("fa-toggle-off");
    darkModeIcon.classList.add("fa-toggle-on");
  } else {
    darkModeIcon.classList.remove("fa-toggle-on");
    darkModeIcon.classList.add("fa-toggle-off");
  }

  // Guardar el estado en localStorage
  localStorage.setItem("darkMode", isDarkMode.toString());
  console.log("Dark mode toggled. New state:", isDarkMode);

  // Remover la animación después de completarse
  setTimeout(() => {
    darkModeToggle.classList.remove("animate-toggle");
  }, 300);
}