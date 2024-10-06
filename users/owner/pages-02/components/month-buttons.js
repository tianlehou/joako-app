// Cargar el contenido del componente month-buttons.html
fetch('./components/month-buttons.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('month-buttons-container').innerHTML = data;

        // Obtener la URL actual
        const currentPage = window.location.pathname.split('/').pop();

        // Seleccionar todos los botones de la semana
        const buttons = document.querySelectorAll('.month-buttons a');

        // Asignar la clase 'active' al botón correspondiente
        buttons.forEach(button => {
            if (button.getAttribute('href') === `./${currentPage}`) {
                button.classList.add('active');
            }
        });
    });
