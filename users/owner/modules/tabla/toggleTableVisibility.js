// Función para alternar la visibilidad de la tabla
export function toggleTableVisibility() {
    // Seleccionamos el header de la tabla y el contenido de la tabla
    const headerTabla = document.getElementById('headerTabla');
    const contenidoTabla = document.getElementById('contenidoTabla');
  
    // Seleccionamos todos los headers (th) excepto el header en el que se hace clic
    const headers = document.querySelectorAll('#miTabla th:not(#headerTabla)');
  
    // Añadimos un evento click al header de la tabla
    headerTabla.addEventListener('click', () => {
      // Alternamos la clase 'oculto' en el contenido de la tabla
      contenidoTabla.classList.toggle('oculto');
      
      // Alternamos la clase 'oculto' en todos los headers excepto el header de clic
      headers.forEach(header => {
        header.classList.toggle('oculto');
      });
    });
  }
  