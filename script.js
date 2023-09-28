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

let selectedImage;
let offsetX, offsetY;
let isResizing = false;
let isMoving = false;
let originalWidth, originalHeight;
let originalX, originalY;

function addImage() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.src = e.target.result;
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
                img.draggable = true;

                // Agrega la clase resizable para permitir el redimensionamiento
                img.classList.add('resizable');

                const contentDiv = document.getElementById('note-content-div');

                img.addEventListener('click', function () {
                    selectedImage = this;
                });

                const existingImage = contentDiv.querySelector('img');
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
    const images = document.querySelectorAll('#note-content-div img');
    images.forEach(img => {
        img.style.border = '2px solid transparent';
    });

    images.forEach(img => {
        img.addEventListener('click', function () {
            selectedImage = this;
            this.style.border = '2px dashed blue';
        });
    });
}

function deselectImage() {
    if (selectedImage) {
        selectedImage.style.border = '2px solid transparent';
        selectedImage = null;
    }
}

function moveImage() {
    if (selectedImage) {
        let isDragging = false;
        let originalX, originalY, originalPosition;
        selectedImage.style.cursor = 'move';

        selectedImage.addEventListener('mousedown', function (event) {
            isDragging = true;
            originalX = event.clientX - selectedImage.getBoundingClientRect().left;
            originalY = event.clientY - selectedImage.getBoundingClientRect().top;
            originalPosition = selectedImage.style.position || '';

            selectedImage.style.position = 'absolute';

            document.addEventListener('mousemove', drag);

            event.preventDefault();
        });

        document.addEventListener('mouseup', function () {
            if (isDragging) {
                isDragging = false;
                selectedImage.style.position = originalPosition;
                document.removeEventListener('mousemove', drag);
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
        let isResizing = false;
        let originalWidth, originalHeight;

        const resizeHandles = document.createElement('div');
        resizeHandles.className = 'resize-handles';
        selectedImage.appendChild(resizeHandles);

        const resizeHandleNW = document.createElement('div');
        resizeHandleNW.className = 'resize-handle';
        resizeHandleNW.style.left = '0';
        resizeHandleNW.style.top = '0';
        resizeHandles.appendChild(resizeHandleNW);

        const resizeHandleSE = document.createElement('div');
        resizeHandleSE.className = 'resize-handle';
        resizeHandleSE.style.right = '0';
        resizeHandleSE.style.bottom = '0';
        resizeHandles.appendChild(resizeHandleSE);

        selectedImage.style.cursor = 'nwse-resize';

        selectedImage.addEventListener('mousedown', function (event) {
            isResizing = true;
            originalWidth = selectedImage.offsetWidth;
            originalHeight = selectedImage.offsetHeight;

            const startX = event.clientX;
            const startY = event.clientY;

            document.addEventListener('mousemove', resize);

            event.preventDefault();
        });

        document.addEventListener('mouseup', function () {
            if (isResizing) {
                isResizing = false;
                selectedImage.style.cursor = 'move';
                document.removeEventListener('mousemove', resize);
                resizeHandles.style.display = 'none';
            }
        });

        function resize(event) {
            if (isResizing) {
                console.log('resize');
                const newWidth = originalWidth + event.clientX - startX;
                const newHeight = originalHeight + event.clientY - startY;

                selectedImage.style.width = `${newWidth}px`;
                selectedImage.style.height = `${newHeight}px`;

                // Actualiza las manijas de redimensionamiento
                resizeHandles.style.display = 'block';
                resizeHandleSE.style.display = 'block';
                resizeHandleNW.style.display = 'block';
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

// Obtener el contenedor de contenido y registrar eventos de arrastrar y soltar
const contentDiv = document.getElementById('note-content-div');

contentDiv.addEventListener('dragover', function (e) {
    e.preventDefault();
    contentDiv.classList.add('drag-over');
});

contentDiv.addEventListener('dragleave', function () {
    contentDiv.classList.remove('drag-over');
});

contentDiv.addEventListener('drop', function (e) {
    e.preventDefault();
    contentDiv.classList.remove('drag-over');

    const files = e.dataTransfer.files;

    for (const file of files) {
        if (file.type.startsWith('image/')) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.style.maxWidth = '100%';
            img.style.height = 'auto';

            img.addEventListener('click', function () {
                selectedImage = this;
            });

            contentDiv.appendChild(img);
            updatePreview();
        }
    }
});

// Agregar evento para centrar la imagen en el contenedor
document.getElementById('center-image-button').addEventListener('click', centerImage);

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
        selectedImage.style.cursor = 'move';

        selectedImage.addEventListener('touchstart', function (event) {
            isDragging = true;
            originalX = event.touches[0].clientX - selectedImage.getBoundingClientRect().left;
            originalY = event.touches[0].clientY - selectedImage.getBoundingClientRect().top;
            originalPosition = selectedImage.style.position || '';

            selectedImage.style.position = 'absolute';

            document.addEventListener('touchmove', drag);

            event.preventDefault();
        });

        document.addEventListener('touchend', function () {
            if (isDragging) {
                isDragging = false;
                selectedImage.style.position = originalPosition;
                document.removeEventListener('touchmove', drag);
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

// Función para redimensionar imágenes en dispositivos móviles
function resizeImageMobile() {
    if (selectedImage) {
        let isResizing = false;
        let originalWidth, originalHeight;

        const resizeHandles = document.createElement('div');
        resizeHandles.className = 'resize-handles';
        selectedImage.appendChild(resizeHandles);

        const resizeHandleNW = document.createElement('div');
        resizeHandleNW.className = 'resize-handle';
        resizeHandleNW.style.left = '0';
        resizeHandleNW.style.top = '0';
        resizeHandles.appendChild(resizeHandleNW);

        const resizeHandleSE = document.createElement('div');
        resizeHandleSE.className = 'resize-handle';
        resizeHandleSE.style.right = '0';
        resizeHandleSE.style.bottom = '0';
        resizeHandles.appendChild(resizeHandleSE);

        selectedImage.style.cursor = 'nwse-resize';

        selectedImage.addEventListener('touchstart', function (event) {
            isResizing = true;
            originalWidth = selectedImage.offsetWidth;
            originalHeight = selectedImage.offsetHeight;

            const startX = event.touches[0].clientX;
            const startY = event.touches[0].clientY;

            document.addEventListener('touchmove', resize);

            event.preventDefault();
        });

        document.addEventListener('touchend', function () {
            if (isResizing) {
                isResizing = false;
                selectedImage.style.cursor = 'move';
                document.removeEventListener('touchmove', resize);
                resizeHandles.style.display = 'none';
            }
        });

        function resize(event) {
            if (isResizing) {
                const newWidth = originalWidth + event.touches[0].clientX - startX;
                const newHeight = originalHeight + event.touches[0].clientY - startY;

                selectedImage.style.width = `${newWidth}px`;
                selectedImage.style.height = `${newHeight}px`;

                // Actualiza las manijas de redimensionamiento
                resizeHandles.style.display = 'block';
                resizeHandleSE.style.display = 'block';
                resizeHandleNW.style.display = 'block';
            }
        }
    }
}
