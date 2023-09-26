// script.js
let selectedImage; // Variable para almacenar la imagen seleccionada

function applyFormat(style) {
    document.execCommand(style, false, null);
}

function applyForeColor() {
    const color = prompt('Ingresa el color de texto (nombre o código hexadecimal):');
    if (color) {
        document.execCommand('foreColor', false, color);
    }
}

function applyBackColor() {
    const color = prompt('Ingresa el color de fondo (nombre o código hexadecimal):');
    if (color) {
        document.execCommand('backColor', false, color);
    }
}

function applyFontSize() {
    const size = prompt('Ingresa el tamaño de fuente (1-7):');
    if (size && /^[1-7]$/.test(size)) {
        document.execCommand('fontSize', false, size);
    }
}

function applyAlign(align) {
    document.execCommand(align, false, null);
}

function applyList(listType) {
    document.execCommand(listType, false, null);
}

function addLink() {
    const url = prompt('Ingresa la URL del hipervínculo:');
    if (url) {
        document.execCommand('createLink', false, url);
    }
}

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

                img.addEventListener('click', function () {
                    // Al hacer clic en la imagen, la seleccionamos
                    selectedImage = this;
                });

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

// Función para centrar la imagen seleccionada
function centerImage() {
    if (selectedImage) {
        const containerWidth = document.getElementById('note-content-div').offsetWidth;
        const containerHeight = document.getElementById('note-content-div').offsetHeight;
        const imageWidth = selectedImage.offsetWidth;
        const imageHeight = selectedImage.offsetHeight;

        // Calcula la posición para centrar la imagen sin rebasar los bordes
        const centerX = (containerWidth - imageWidth) / 2;
        const centerY = (containerHeight - imageHeight) / 2;

        // Aplica la posición centrada
        selectedImage.style.left = `${centerX}px`;
        selectedImage.style.top = `${centerY}px`;
    }
}

// Función para mover la imagen seleccionada
function moveImage() {
    if (selectedImage) {
        let isDragging = false;
        let offsetX, offsetY;

        selectedImage.style.cursor = 'move';

        selectedImage.addEventListener('mousedown', function (event) {
            isDragging = true;
            offsetX = event.clientX - selectedImage.getBoundingClientRect().left;
            offsetY = event.clientY - selectedImage.getBoundingClientRect().top;
        });

        document.addEventListener('mousemove', function (event) {
            if (isDragging) {
                const x = event.clientX - offsetX;
                const y = event.clientY - offsetY;

                selectedImage.style.left = `${x}px`;
                selectedImage.style.top = `${y}px`;
            }
        });

        document.addEventListener('mouseup', function () {
            isDragging = false;
        });
    }
}

function resizeImage() {
    if (selectedImage) {
        selectedImage.style.cursor = 'nwse-resize';

        selectedImage.addEventListener('mousedown', function (event) {
            event.preventDefault();
            const startX = event.clientX;
            const startY = event.clientY;
            const startWidth = parseInt(getComputedStyle(selectedImage).width, 10);
            const startHeight = parseInt(getComputedStyle(selectedImage).height, 10);

            document.addEventListener('mousemove', resize);

            document.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', resize);
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
    const title = document.getElementById('note-title').value;
    const contentDiv = document.getElementById('note-content-div');

    if (title || contentDiv.innerHTML.trim() !== '') {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
            <h2>${title}</h2>
            <div>${contentDiv.innerHTML}</div>
        `;

        const notesContainer = document.getElementById('notes-container');
        notesContainer.appendChild(noteElement);

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




