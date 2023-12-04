let recognition; // Declara la variable fuera de la función para que sea accesible globalmente
let isListening = false; // Bandera para verificar si se está escuchando

function toggleSpeechRecognition() {
  if (isListening) {
    stopSpeechRecognition();
  } else {
    startSpeechRecognition();
  }
}

function startSpeechRecognition() {
  recognition = new webkitSpeechRecognition() || new SpeechRecognition();

  // Configura el reconocimiento de voz
  recognition.lang = "es-ES"; // Configura el idioma según tus necesidades

  // Cuando el usuario ha iniciado el reconocimiento de voz
  recognition.onstart = function () {
    isListening = true;
  };

  // Cuando el usuario ha hablado
  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;

    // Inserta el texto en el contenido editable
    insertText(transcript);
  };

  // Inicia el reconocimiento de voz
  recognition.start();
}

function stopSpeechRecognition() {
  recognition.stop();
  isListening = false;
}

function insertText(text) {
  const noteContent = document.getElementById("note-content-div");
  // Asegúrate de que el contenido sea editable antes de insertar texto
  if (noteContent.isContentEditable) {
    // Crea un nodo de texto con el contenido
    const textNode = document.createTextNode(text);

    // Inserta el nodo de texto en la posición actual del cursor
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(textNode);
    
  }
}
