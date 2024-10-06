// Función para obtener la fecha y hora en la zona horaria de Panamá.
function getPanamaDateTime() {
    const panamaOffset = -5;
    const date = new Date();
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const panamaDate = new Date(utc + (3600000 * panamaOffset));
    
    // Formatear manualmente para obtener DD/MM/AA y HH:MM:SS
    const day = String(panamaDate.getDate()).padStart(2, '0');
    const month = String(panamaDate.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const year = String(panamaDate.getFullYear()).slice(-2); // Obtener solo los dos últimos dígitos del año
    const hours = String(panamaDate.getHours()).padStart(2, '0');
    const minutes = String(panamaDate.getMinutes()).padStart(2, '0');
    const seconds = String(panamaDate.getSeconds()).padStart(2, '0');

    // Retornar tanto la fecha como la hora por separado para visualización
    return {
        date: `${day}/${month}/${year}`,
        time: `${hours}:${minutes}:${seconds}`
    };
}

// Función principal que maneja los eventos y actualiza el select correspondiente
export function updateSelectElements() {
    const selectElements = document.querySelectorAll(".pay-select");

    selectElements.forEach((selectElement) => {

        // Aplicar los estilos iniciales basados en el valor actual del select
        const timestamp = getPanamaDateTime(); // Llamada a la función para obtener timestamp actual
        updateCellAppearance(selectElement, selectElement.value, timestamp); 
    });
}

// Función para aplicar estilos según el valor de Cobro
function applyStyles(cobroElement, selectedValue) {
    if (["6.00", "10.00", "11.00", "24.00"].includes(selectedValue)) {
        cobroElement.style.color = "var(--clr-primary)";
        cobroElement.style.fontWeight = "500";
        cobroElement.style.fontSize = "1.33em";
    } else if (selectedValue === "No Pagó") {
        cobroElement.style.color = "var(--clr-error)";
    }
}

// Función para actualizar visualmente el select y la celda correspondiente
function updateCellAppearance(selectElement, selectedValue, timestamp) {
    const tdElement = selectElement.closest('td');

    // Asegúrate de que la celda contenga un contenedor donde puedas mostrar los valores
    let displayElement = tdElement.querySelector('.display-values');
    if (!displayElement) {
        // Si no existe, crea un contenedor para los valores
        displayElement = document.createElement('div');
        displayElement.classList.add('display-values');
        tdElement.appendChild(displayElement);
    }

    // Mostrar el valor seleccionado de Cobro y el timestamp en el contenedor
    displayElement.innerHTML = `
        <span class="cobro-value">${selectedValue}</span><br>
    `;

    // Aplicar estilos según el valor de Cobro
    applyStyles(displayElement.querySelector('.cobro-value'), selectedValue);
}