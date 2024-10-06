// Cargar el contenido del componente week-buttons.html
fetch('../components/week-buttons/week-buttons.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('week-buttons-container').innerHTML = data;

        // Obtener la URL actual
        const currentPage = window.location.pathname.split('/').pop();

        // Seleccionar todos los botones de la semana
        const buttons = document.querySelectorAll('.week-buttons a');

        // Asignar la clase 'active' al botón correspondiente
        buttons.forEach(button => {
            if (button.getAttribute('href') === `./${currentPage}`) {
                button.classList.add('active');
            }
        });
    });
