// script.js

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

let selectedImage; // Variable para almacenar la imagen seleccionada
let imageContainer = document.getElementById('image-container'); 

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

function selectImage() {
    const images = document.querySelectorAll('#note-content-div img');
    images.forEach(img => {
        img.style.border = '2px solid transparent'; // Restablecer bordes en todas las imágenes
    });

    // Agregar evento click para seleccionar una imagen
    images.forEach(img => {
        img.addEventListener('click', function () {
            selectedImage = this;
            this.style.border = '2px dashed blue'; // Establecer un borde punteado en la imagen seleccionada
        });
    });
}

function deselectImage() {
    if (selectedImage) {
        selectedImage.style.border = '2px solid transparent'; // Restablecer el borde de la imagen seleccionada
        selectedImage = null;
    }
}

function moveImage() {
    if (selectedImage) {
        let isDragging = false;
        let offsetX, offsetY;
        let originalPosition = null;

        selectedImage.style.cursor = 'move';

        selectedImage.addEventListener('mousedown', function (event) {
            isDragging = true;
            offsetX = event.clientX - selectedImage.getBoundingClientRect().left;
            offsetY = event.clientY - selectedImage.getBoundingClientRect().top;
            originalPosition = selectedImage.style.position;

            // Cambia la posición a relativa para mover la imagen libremente
            selectedImage.style.position = 'relative';
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

            // Restaura la posición original (absoluta) de la imagen
            selectedImage.style.position = originalPosition;
        });
    }
}
/*
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
*/

let isResizing = false; // Variable de control para el redimensionamiento

function resizeImage() {
    if (selectedImage) {
        if (isResizing) {
            // Si ya se está redimensionando, desactivar el redimensionamiento
            isResizing = false;
            selectedImage.style.cursor = 'default'; // Restablecer el cursor
        } else {
            // Si no se está redimensionando, activar el redimensionamiento
            isResizing = true;
            selectedImage.style.cursor = 'nwse-resize';

            let startX, startY, startWidth, startHeight;

            selectedImage.addEventListener('mousedown', startResize);

            document.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', resize);
                selectedImage.removeEventListener('mousedown', startResize);
            });

            function startResize(event) {
                startX = event.clientX;
                startY = event.clientY;
                startWidth = parseInt(getComputedStyle(selectedImage).width, 10);
                startHeight = parseInt(getComputedStyle(selectedImage).height, 10);

                document.addEventListener('mousemove', resize);
            }

            function resize(event) {
                if (!isResizing) {
                    // Si se desactiva el redimensionamiento durante el movimiento del ratón, salir
                    document.removeEventListener('mousemove', resize);
                    return;
                }

                const newWidth = startWidth + event.clientX - startX;
                const newHeight = startHeight + event.clientY - startY;

                selectedImage.style.width = `${newWidth}px`;
                selectedImage.style.height = `${newHeight}px`;
            }
        }
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



