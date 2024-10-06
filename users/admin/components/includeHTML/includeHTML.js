// Define la función includeHTML
export function includeHTML() {
  // Selecciona todos los elementos que tienen el atributo 'data-include-html'
  const elements = document.querySelectorAll("[data-include-html]");

  // Itera sobre cada elemento encontrado
  elements.forEach((element) => {
    // Obtiene el valor del atributo 'data-include-html', que es la ruta del archivo a incluir
    const file = element.getAttribute("data-include-html");

    // Si existe un archivo especificado
    if (file) {
      // Realiza una solicitud para obtener el contenido del archivo especificado
      fetch(file)
        // Convierte la respuesta a texto plano
        .then((response) => response.text())
        // Inserta el contenido del archivo dentro del elemento HTML
        .then((data) => {
          element.innerHTML = data;
          // Elimina el atributo 'data-include-html' del elemento después de incluir el contenido
          element.removeAttribute("data-include-html");
          // Vuelve a llamar a includeHTML para procesar cualquier nueva inclusión dentro del contenido cargado
          includeHTML();
        });
    }
  });
}
