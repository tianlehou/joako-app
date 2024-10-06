// Función principal que maneja los eventos y actualiza el select correspondiente
export function updateSelectElements() {
    // Selecciona todas las celdas de rol en la tabla
    const roleCells = document.querySelectorAll('.role-col');

    roleCells.forEach(cell => {
        const roleText = cell.querySelector('span').textContent.trim(); // Obtiene el rol actual de la celda
        const selectElement = cell.querySelector('select'); // Selecciona el elemento select dentro de la celda
        const row = cell.closest('tr'); // Selecciona la fila completa a la que pertenece la celda

        // Oculta la fila si el rol es "Desarrollador"
        if (roleText === 'Desarrollador') {
            row.style.display = 'none';
        }

        // Aplica estilos según el rol del usuario
        applyRoleStyles(cell, roleText);

        // Verifica si el rol es "Administrador" o "Cobrador" y elimina el select
        if (roleText === 'Administrador' || roleText === 'Cobrador') {
            if (selectElement) {
                selectElement.remove(); // Elimina el select si el rol es "Administrador" o "Cobrador"
            }
        }
    });

    // Selecciona todas las celdas de estado en la tabla
    const estadoCells = document.querySelectorAll('.estado-col');

    estadoCells.forEach(cell => {
        const estadoText = cell.querySelector('span').textContent.trim(); // Obtiene el estado actual de la celda
        const selectElement = cell.querySelector('select'); // Selecciona el elemento select dentro de la celda

        // Aplica estilos según el estado del usuario
        applyEstadoStyles(cell, estadoText);

        // Verifica si el estado es "Expulsado" y elimina el select
        if (estadoText === 'Expulsado') {
            if (selectElement) {
                selectElement.remove();
            }
        }
    });
}

// Función para aplicar estilos según el valor del rol
function applyRoleStyles(cell, roleText) {
    const roleElement = cell.querySelector('span');

    if (roleText === "Administrador") {
        roleElement.style.color = "var(--clr-primary)"; // Color azul para Administrador
        roleElement.style.fontWeight = "bold";
    } else if (roleText === "Cobrador") {
        roleElement.style.color = "var(--clr-secondary)"; // Color verde para Cobrador
        roleElement.style.fontWeight = "bold";
    } else if (roleText === "Propietario") {
        roleElement.style.color = "orange"; // Color verde para Cobrador
        roleElement.style.fontWeight = "bold";
    } else if (roleText === "Conductor" || roleText === "Secretario") {
        roleElement.style.color = "gray"; // Color verde para Cobrador
        roleElement.style.fontWeight = "bold";
    }
}

// Función para aplicar estilos según el valor del estado
function applyEstadoStyles(cell, estadoText) {
    const estadoElement = cell.querySelector('span');

    if (estadoText === "Activo") {
        estadoElement.style.color = "var(--clr-secondary)"; // Color rojo para Expulsado
        estadoElement.style.fontWeight = "bold";
    } else if (estadoText === "Sin carro") {
        estadoElement.style.color = "var(--clr-primary)"; // Color rojo para Expulsado
        estadoElement.style.fontWeight = "bold";
    } else if (estadoText === "Suspendido") {
        estadoElement.style.color = "orange"; // Color rojo para Expulsado
        estadoElement.style.fontWeight = "bold";
    } else if (estadoText === "Expulsado") {
        estadoElement.style.color = "var(--clr-error)"; // Color rojo para Expulsado
        estadoElement.style.fontWeight = "bold";
    }
}
