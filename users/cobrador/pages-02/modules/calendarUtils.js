// Función para obtener la cantidad de días en un mes específico
export function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

// Función para obtener el mes y año a partir de la URL
export function getMonthAndYearFromURL() {
    const url = window.location.href;
    const month = parseInt(url.split('/month-')[1].split('.html')[0], 10);
    const year = new Date().getFullYear(); // Puedes ajustar el año según sea necesario
    return { month, year };
}

// Genera las columnas del calendario basadas en la cantidad de días en el mes
export function generateCalendarDays(month, year, user) {
    const daysInMonth = getDaysInMonth(month, year);
    return Array.from({ length: daysInMonth }, (_, i) => {
        const dia = (i + 1).toString();
        const cobro = user[dia]?.Cobro || "";
        const timestamp = user[dia]?.timestamp || "";
        return `
            <td class="${['6.00', '10.00', '11.00', '24.00'].includes(cobro) ? 'text-center' : ''}">
              <div class="flex-container display-center">
                <select class="form-select pay-select ${['6.00', '10.00', '11.00', '24.00'].includes(cobro) ? 'd-none' : ''}" data-id="${user.id}" data-field="${dia}">
                  ${["", "6.00", "10.00", "11.00", "24.00", "No Pagó"].map(option => 
                    `<option value="${option}" ${cobro === option ? "selected" : ""}>${option}</option>`
                  ).join('')}
                </select>
                <div class="timestamp">${timestamp.replace(' ', '<br>') || ''}</div>
              </div>
            </td>
        `;
    }).join('');
}