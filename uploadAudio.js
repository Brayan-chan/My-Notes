function uploadAudio() {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "audio/*";

  fileInput.addEventListener("change", handleAudioSelect);

  fileInput.click();
}

function handleAudioSelect(event) {
  const fileInput = event.target;
  const files = fileInput.files;

  if (files.length > 0) {
    const audioFile = files[0];
    const audioUrl = URL.createObjectURL(audioFile);

    // Preguntar al usuario por el nombre del audio
    const audioName = prompt("Ingresa un nombre para el audio:");

    if (audioName) {
      // Crear un contenedor para el nombre y el reproductor de audio
      const audioContainer = document.createElement("div");

      // Crear un elemento de audio
      const audioElement = document.createElement("audio");
      audioElement.controls = true;
      audioElement.src = audioUrl;

      // Mostrar el nombre
      const audioNameElement = document.createElement("p");
      audioNameElement.textContent = audioName;

      // Agregar los elementos al contenedor
      audioContainer.appendChild(audioNameElement);
      audioContainer.appendChild(audioElement);

      // Agregar el contenedor al contenido editable
      const contentEditable = document.getElementById("note-content-div");
      contentEditable.appendChild(audioContainer);

      // Agregar un evento al nombre para permitir la edición
      audioNameElement.addEventListener("click", function () {
        const newAudioName = prompt(
          "Ingresa un nuevo nombre para el audio:",
          audioName
        );
        if (newAudioName && newAudioName !== audioName) {
          audioNameElement.textContent = newAudioName;
        }
      });
    }
  }
}
