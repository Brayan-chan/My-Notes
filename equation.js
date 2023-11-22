// script.js

// ... (otras funciones)

// Función para insertar ecuación matemática con formato mejorado
function insertEquation() {
  // Pide al usuario que ingrese la ecuación matemática
  const equation = prompt("Ingrese la ecuación matemática:");

  if (equation) {
    // Obtiene el contenido actual del editor
    const contentDiv = document.getElementById("note-content-div");

    // Crea un nuevo elemento span para la ecuación
    const equationElement = document.createElement("span");

    // Asigna la clase correspondiente para el formato de la ecuación
    equationElement.classList.add("math-equation");

    // Procesa la ecuación para manejar superíndices y subíndices
    const processedEquation = processEquation(equation);

    // Agrega la ecuación procesada al elemento span
    equationElement.innerHTML = processedEquation;

    // Inserta el elemento span en el editor
    contentDiv.appendChild(equationElement);

    // Actualiza la vista previa
    updatePreview();
  }
}

// Función para procesar la ecuación y manejar superíndices y subíndices
function processEquation(equation) {
  // Reemplaza '^' con HTML para superíndice
  equation = equation.replace(/\^(\d+)/g, "<sup>$1</sup>");

  // Reemplaza '_{' con HTML para subíndice
  equation = equation.replace(/_({.*?})/g, "<sub>$1</sub>");

  return equation;
}

// Función para insertar caracteres especiales o símbolos matemáticos
function insertSpecialCharacter(character) {
  // Obtiene el contenido actual del editor
  const contentDiv = document.getElementById("note-content-div");

  // Crea un nuevo elemento span para el carácter especial
  const charElement = document.createElement("span");

  // Asigna la clase correspondiente para el formato del carácter
  charElement.classList.add("special-character");

  // Agrega el carácter al elemento span
  charElement.textContent = character;

  // Inserta el elemento span en el editor
  contentDiv.appendChild(charElement);

  // Actualiza la vista previa
  updatePreview();
}

// ... (otras funciones)
