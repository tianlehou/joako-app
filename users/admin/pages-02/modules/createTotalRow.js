// createTotalRow.js

/**
 * Crea y agrega una fila de totales al <thead> de la tabla.
 * Asegúrate de ajustar el número de columnas según sea necesario.
 */
export function createTotalRow() {
    const thead = document.createElement('thead');
    thead.classList.add('total-row');

    const tr = document.createElement('tr');
    
    // Ajusta el número de celdas según el número de columnas en tu tabla
    const thEmpty = document.createElement('th');
    thEmpty.textContent = ''; // Celda vacía para alineación
    tr.appendChild(thEmpty);

    const thTotal1 = document.createElement('th');
    thTotal1.textContent = 'Total:';
    tr.appendChild(thTotal1);

    const thTotal2 = document.createElement('th');
    thTotal2.textContent = 'Total:';
    tr.appendChild(thTotal2);

    // Agrega más celdas según el número de columnas para totales
    // ...

    thead.appendChild(tr);
    document.querySelector('table').insertBefore(thead, document.querySelector('tbody'));
}
