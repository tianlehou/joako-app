document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('radio-inputs-container');

    fetch('./components/radio-inputs.html')
        .then(response => response.text())
        .then(html => {
            container.innerHTML = html;
        })
        .catch(error => {
            console.error('Error al cargar radio-inputs.html:', error);
        });
});
