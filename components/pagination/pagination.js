// Función para cargar el componente de paginación
function loadPagination() {
    fetch('../components/pagination/pagination.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('pagination-container').innerHTML = data;
        });
}

// Llama a la función para cargar la paginación
loadPagination();

