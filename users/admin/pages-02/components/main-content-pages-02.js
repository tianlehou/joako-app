// main-content-pages-02.js
import { getMonthAndYearFromURL, getDaysInMonth } from "../modules/calendarUtils.js";
// Esta función genera los encabezados de los días del mes.
function generateCalendarHeaders() {
  const { month, year } = getMonthAndYearFromURL(); // Asegúrate de tener esta función disponible para obtener el mes y año
  const daysInMonth = getDaysInMonth(month, year); // Asegúrate de tener esta función disponible para obtener la cantidad de días en el mes
  let headers = '';
  for (let i = 1; i <= daysInMonth; i++) {
      headers += `<th class="text-center">${i}</th>`;
  }
  headers += `<th>Acciones</th><th class="text-center">userId</th>`; // Añade las columnas adicionales necesarias
  return headers;
}

function loadHTMLmaincontent() {
  const bodyContent = `
  <!-- Main Content -->
  <main class="main-content">
    <!-- Main Content - Container -->
    <div class="main-container">
      <table id="miTabla" class="table table-striped">
        <!-- Table - Head -->
        <thead>
          <tr>
            <th class="text-center">#</th>
            <th class="text-center" id="headerTabla">Nombre</th>
            ${generateCalendarHeaders()}
          </tr>
        </thead>

        <!--  Dinamic Table - Body -->
        <tbody class="table-body" id="contenidoTabla">
          <!-- aqui va el contenido de la tabla -->
        </tbody>
      </table>
    </div>
  </main>
  `;

  const bodyElement = document.createElement('div');
  bodyElement.innerHTML = bodyContent;
  document.getElementById('main-content-pages-02-container').appendChild(bodyElement);
}

// Ejecutar la función para cargar el contenido del head
loadHTMLmaincontent();
