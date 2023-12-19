function getYouTubeEmbedCode(videoUrl) {
  // Extraer el ID del video de la URL de YouTube
  const videoId = extractVideoId(videoUrl);

  // Construir el código de inserción con estilos para ajustar el tamaño
  const embedCode = `
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
            <iframe 
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                src="https://www.youtube.com/embed/${videoId}" 
                frameborder="0" 
                allowfullscreen>
            </iframe>
        </div>
    `;

  return embedCode;
}

function extractVideoId(videoUrl) {
  // Expresión regular para extraer el ID del video de la URL de YouTube
  const regExp =
    /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = videoUrl.match(regExp);

  if (match && match[1]) {
    return match[1];
  }

  // En caso de que no se pueda extraer el ID del video
  alert(
    "No se pudo extraer el ID del video de YouTube. Asegúrate de ingresar una URL válida."
  );
  return null;
}

function insertYouTubeVideo() {
  const videoUrl = prompt("Ingresa el URL del video de YouTube:");

  if (videoUrl) {
    const embedCode = getYouTubeEmbedCode(videoUrl);

    if (embedCode) {
      insertHtmlAtCursor(embedCode);
    }
  }
}

//Videos desde galeria

function insertVideoFromGallery() {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "video/*";

  fileInput.addEventListener("change", handleVideoFileSelect);

  fileInput.click();
}

function handleVideoFileSelect(event) {
  const fileInput = event.target;
  const files = fileInput.files;

  if (files.length > 0) {
    const videoFile = files[0];
    const videoUrl = URL.createObjectURL(videoFile);

    insertVideoElement(videoUrl);
  }
}

function insertVideoElement(videoUrl) {
  const videoCode = `
        <div>
            <video controls style="max-width: 100%;">
                <source src="${videoUrl}" type="video/mp4">
                Tu navegador no soporta el tag de video.
            </video>
        </div>
    `;

  insertHtmlAtCursor(videoCode);
}

function insertHtmlAtCursor(html) {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const fragment = range.createContextualFragment(html);
  range.deleteContents();
  range.insertNode(fragment);
}