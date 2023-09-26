// script.js
function applyFormat(style) {
    document.execCommand(style, false, null);
}

// script.js
function addImage() {
    const fileInput = document.getElementById('image-upload');
    fileInput.click();

    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.src = e.target.result;
                img.style.maxWidth = '100%';
                img.style.height = 'auto';

                // Inserta la imagen en el contenido actual
                const contentDiv = document.getElementById('note-content-div');

                // Verifica si ya hay una imagen en el contenido
                const existingImage = contentDiv.querySelector('img');
                if (existingImage) {
                    existingImage.src = img.src; // Reemplaza la imagen existente
                } else {
                    contentDiv.appendChild(img); // Agrega la imagen al contenido
                }

                updatePreview(); // Actualiza la vista previa

                // Limpia el input de archivo para que se pueda seleccionar la misma imagen nuevamente
                fileInput.value = null;
            };
            reader.readAsDataURL(file);
        }
    });
}


// Función para crear una nueva nota
function createNote() {
    const title = document.getElementById('note-title').value;
    const contentDiv = document.getElementById('note-content-div');

    if (title || contentDiv.innerHTML.trim() !== '') {
        // Crea un elemento de nota y muestra el título y contenido
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
            <h2>${title}</h2>
            <div>${contentDiv.innerHTML}</div>
        `;

        const notesContainer = document.getElementById('notes-container');
        notesContainer.appendChild(noteElement);

        // Limpia el formulario y la vista previa
        document.getElementById('note-title').value = '';
        contentDiv.innerHTML = '';
        document.getElementById('preview-title').textContent = '';
        const previewContent = document.getElementById('preview-content');
        while (previewContent.firstChild) {
            previewContent.removeChild(previewContent.firstChild);
        }
    }
}

function updatePreview() {
    const title = document.getElementById('note-title').value;
    const contentDiv = document.getElementById('note-content-div');
    const previewTitle = document.getElementById('preview-title');
    const previewContent = document.getElementById('preview-content');

    previewTitle.textContent = title;
    previewContent.innerHTML = contentDiv.innerHTML;
}




