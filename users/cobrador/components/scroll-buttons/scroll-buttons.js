// Obtener el contenedor donde se insertará el componente
const scrollButtonsContainer = document.getElementById('scroll-buttons-container');

// Usar fetch para cargar el archivo HTML del componente
fetch('../components/scroll-buttons/scroll-buttons.html')
  .then(response => response.text())
  .then(data => {
    // Insertar el contenido del archivo HTML en el contenedor
    scrollButtonsContainer.innerHTML = data;
  })
  .catch(error => console.error('Error al cargar el componente de botones de desplazamiento:', error));

  