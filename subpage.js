function openSubpage(subpageId, title, content) {
  // Abre la ventana de la subpágina por su ID
  const subpageWindow = window.open("", subpageId, "width=600,height=400");
  if (!subpageWindow) {
    alert(
      "No se pudo abrir la subpágina. Asegúrate de desactivar el bloqueo de ventanas emergentes."
    );
    return;
  }

  // Contenido inicial de la subpágina con el mismo conjunto de funciones
  const subpageContent = `
  <!DOCTYPE html>
<html lang="en" x-webkit-speech>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subpaginas</title>

    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="navbar.js"></script>
    <link rel="stylesheet" href="navbar.css">
    <link rel="stylesheet" href="canvas.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/prism.min.js"></script>
</head>

<body>

    <!-- Formulario para crear nuevas notas -->
    <div id="editor">
        <button onclick="location.href='https://misnotas-bcc.netlify.app/' " style="border: none; background-color: transparent; font-size: 30px; cursor: pointer; padding: 10px;"><i class="fa-solid fa-arrow-left"></i></button><br><br><br>
        <div id="dark-mode-toggle" onclick="toggleDarkMode()">
            <i id="dark-mode-icon" class="fa-solid fa-toggle-on"></i>
        </div>

        <label for="note-title">Título:</label>
        <input type="text" id="note-title" placeholder="Título">
        <br><br>
        <div id="font-family-div">
        <label for="font-family" style="font-size: 18px;">Fuente:</label>
        <select id="font-family" style="font-size: 16px; width: 25.5%; cursor: pointer; border-radius: 5px;" onchange="changeFont()">
            <option value="Arial, sans-serif">Arial</option>
            <option value="Verdana, sans-serif">Verdana</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="'Courier New', monospace">Courier New</option>
            <option value="Impact, sans-serif">Impact</option>
            <option value="'Comic Sans MS', sans-serif">Comic Sans MS</option>
        </select>
        </div>

        <br><br>

        <div class="button-container">


            <!-- Botones de formato de texto -->
            <button onclick="applyFormat('bold')"><i class="fas fa-bold"></i></button>
            <button onclick="applyFormat('italic')"><i class="fas fa-italic"></i></button>
            <button onclick="applyFormat('underline')"><i class="fas fa-underline"></i></button>
            <button onclick="applyFormat('strikethrough')"><i class="fas fa-strikethrough"></i></button>
            <!-- Botones de color de texto, color de fondo y tamaño de fuente -->
            <button onclick="applyForeColor()"><i class="fas fa-font"></i></button>
            <button onclick="applyBackColor()"><i class="fas fa-highlighter"></i></button>
            <button onclick="applyFontSize()"><i class="fas fa-text-height"></i></button>


            <!-- Botones de alineación -->
            <button onclick="applyAlign('justifyLeft')">
                <i class="fas fa-align-left"></i>
            </button>
            <button onclick="applyAlign('justifyCenter')">
                <i class="fas fa-align-center"></i>
            </button>
            <button onclick="applyAlign('justifyRight')">
                <i class="fas fa-align-right"></i>
            </button>

            <!-- Botones de listas -->
            <button onclick="applyList('insertUnorderedList')">
                <i class="fas fa-list-ul"></i>
            </button>
            <button onclick="applyList('insertOrderedList')">
                <i class="fas fa-list-ol"></i>
            </button>

            <!-- Botones de hipervínculos -->
            <button onclick="addLink()">
                <i class="fas fa-link"></i>
            </button>
        </div>
        <br>
        <div class="Todos-botones">

            <!-- Botones de control de imagen -->
            <div class="image_controls" id="image-controls">
                <label for="image-upload" id="image-upload-label">
                    <button onclick="addImage()"><i class="fas fa-image"></i> Subir Imagen
                    </button>
                </label>
                <input type="file" id="image-upload" accept="image/*" style="display: none;">
                <button onclick="selectImage()"><i class="fas fa-mouse-pointer"></i> Seleccionar</button>
                <button onclick="moveImage()">
                    <i class="fas fa-arrows-alt"></i> Mover
                </button>
                <button onclick="resizeImage()">
                    <i class="fas fa-expand-arrows-alt"></i> Redimensionar
                </button>
            </div>
        </div><br>

        <!-- Botones de control de tabla -->
        <div class="table-controls" id="table-controls">
            <button onclick="createTable()"><i class="fas fa-table"></i> Add Table</button>


            <!-- Agrega el botón de código -->
            <button onclick="insertCode()"><i class="fas fa-code"></i> Add Code</button>
            <button onclick="resaltarCodigo()">
                <i class="fa-solid fa-file-code"></i> Resaltar Código
            </button>

            <!-- Nuevo botón para ingresar ecuación matemática -->
            <button onclick="insertEquation()"><i class="fas fa-calculator"></i> Ecuación</button>

            <div class="dropdown">
                <button class="dropdown-btn">Simbols ▼</button>
                <div class="dropdown-content">
                    <!-- Botones del menú desplegable -->
                    <button onclick="insertSpecialCharacter('∑')">∑</button>
                    <button onclick="insertSpecialCharacter('∞')">∞</button>
                    <button onclick="insertSpecialCharacter('∫')">∫</button>
                    <button onclick="insertSpecialCharacter('∏')">∏</button>
                    <button onclick="insertSpecialCharacter('√')">√</button>
                    <button onclick="insertSpecialCharacter('≈')">≈</button>
                    <button onclick="insertSpecialCharacter('≤')">≤</button>
                    <button onclick="insertSpecialCharacter('≥')">≥</button>
                    <button onclick="insertSpecialCharacter('≠')">≠</button>
                    <button onclick="insertSpecialCharacter('≡')">≡</button>
                    <button onclick="insertSpecialCharacter('≢')">≢</button>
                    <button onclick="insertSpecialCharacter('≣')">≣</button>
                    <button onclick="insertSpecialCharacter('Δ')">Δ</button>
                    <button onclick="insertSpecialCharacter('∅')">∅</button>
                    <button onclick="insertSpecialCharacter('θ')">θ</button>
                </div>
            </div>

            <button onclick="toggleTaskList()"><i class="fa-solid fa-list-check"></i> List</button>

            <button onclick="toggleDrawingMode()"><i class="fas fa-pencil"></i> Dibujar</button>

            <button onclick="toggleSpeechRecognition()">
                <i id="speech-icon" class="fas fa-microphone"></i> Escuchar
            </button>

            <button onclick="selectAllAndSummarize()"><i class="fa-solid fa-square-pen"></i> Resumir</button>

            <button onclick="toggleFullScreen()"><i class="fas fa-expand"></i> Full Screen</button>

            <button onclick="createSubpage()">Crear Subpágina</button>

            <!-- Agrega esta sección al cuerpo de tu documento -->
            <div id="sugerenciasDiv" class="suggestions-menu"></div>

        </div>

        
        <br>
        <label for="note-content">Contenido:</label>
        <div id="note-content-div" contenteditable="true" oninput="updatePreview()" oninput="handleInput()" onfocus="handleFocus()" onblur="handleBlur()">
            <!-- Dentro del note-content-div, agrega un contenedor para el resumen -->
            <div id="content-summary" contenteditable="false" style="display: none;">
                <p id="summary-text"></p>
                <button onclick="acceptSummary()"><i style="color: green; cursor: pointer;" class="fa-solid fa-check"></i></button>
                <button onclick="discardSummary()"><i style="color: red; cursor: pointer;" class="fa-solid fa-xmark"></i></button>
                <br><br>
            </div>
            <!-- Aqui se agregará el contenido de la nota -->
        </div><br>
        <button class="crear" onclick="createNote()">Crear Subpagina</button>
    </div>

    <!-- Vista previa de la nota -->
    <div id="note-preview">
        <h2>Vista Previa de la Nota</h2>
        <h3 id="preview-title"></h3>
        <div id="preview-content"></div>
    </div>

    <!-- Área para mostrar las notas existentes -->
    <div id="notes-container">
        <!-- Las notas se mostrarán aquí -->
    </div>

    <script src="script.js"></script>
    <script src="code.js"></script>
    <script src="equation.js"></script>
    <script src="listas.js"></script>
    <script src="pencil.js"></script>
    <script src="Typo.js"></script>
    <script src="escuchar.js"></script>
    <script src="full_screen.js"></script>
    <script src="resume.js"></script>
    <script src="subpage.js"></script>

</body>

</html>  
  `;

  // Escribe el contenido en la nueva ventana
  subpageWindow.document.write(subpageContent);

  // Cierra el documento de la nueva ventana para que pueda ser modificado por el script principal
  subpageWindow.document.close();
}

function createSubpage() {
  // Genera un ID único para la subpágina
  const subpageId = "subpage_" + Date.now();

  // Abre una nueva ventana para la subpágina
  openSubpage(subpageId, "Nueva Subpágina", "");

  // Solicita al usuario que ingrese un nombre para el enlace
  const linkName = prompt("Ingrese un nombre para el enlace:");

  // Crea un nuevo elemento div para representar el enlace en la página principal
  const noteContent = document.getElementById("note-content-div");
  const linkDiv = document.createElement("div");
  linkDiv.innerHTML = `<a href="javascript:void(0);" onclick="openSubpage('${subpageId}', '${
    linkName || "Nueva Subpágina"
  }', '')">${linkName || "Nueva Subpágina"}</a>`;

  // Inserta el enlace en el contenido de la nota
  noteContent.appendChild(linkDiv);
}


