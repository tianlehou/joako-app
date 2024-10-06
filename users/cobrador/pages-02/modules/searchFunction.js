import { database } from "../../../../environment/firebaseConfig.js";
import { ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { addEditEventListeners } from './editRow.js'; // Importa la función para añadir event listeners a los botones de editar
import { deleteRow } from './deleteRow.js'; // Importa la función para añadir event listeners a los botones de borrar
import { updateSelectElements } from "./updateSelectElements.js";
import { collection } from "../script-pages-02.js";

// Función para buscar y filtrar los datos
export function findAndSearch(tabla) {
  const input = document.getElementById("searchInput").value.toLowerCase();

  // Obtén los datos desde Firebase
  onValue(ref(database, collection), (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot) => {
      const user = { id: childSnapshot.key, ...childSnapshot.val() };
      data.push(user);
    });

    // Filtrar los datos
    const filteredData = data.filter(user => {
      return Object.values(user).some(value => value.toString().toLowerCase().includes(input));
    });

    // Renderiza los datos filtrados
    renderUsersTable(filteredData);
  });
}

// Función para renderizar los datos en la tabla
function renderUsersTable(data) {
  const tabla = document.getElementById("miTabla");
  tabla.innerHTML = "";

  data.forEach((user, index) => {
    const row = `
      <tr>
        <thead>
          <tr>
            <th class="text-center">#</th>
            <th class="text-center" id="headerTabla">Unidad</th>
            ${Array.from({ length: 31 }, (_, i) => `<th class="text-center">${i + 1}</th>`).join('')}
            <th>Acciones</th>
            <th class="text-center">userId</th>
          </tr>
        </thead>

        <td class="text-center">${index + 1}</td>
        <td class="text-center">${user.nombre}</td>

                ${Array.from({ length: 31 }, (_, i) => {
                    const dia = (i + 1).toString(); // Convertimos el índice a un número de día (de "1" a "31")
                    const cobroData = user[dia] || {}; // Asume que es un objeto { Cobro: ..., timestamp: ... }
                    const cobro = cobroData.Cobro || ''; // Accede al valor del cobro
                    const timestamp = cobroData.timestamp || ''; // Accede al timestamp
                    const isHidden = ["6.00", "10.00", "11.00", "24.00"].includes(cobro);
        
                    return `
                        <td class="${isHidden ? 'text-center' : ''}">
                          <div class="flex-container display-center">
                            <select class="form-select pay-select ${isHidden ? 'd-none' : ''}" data-id="${user.id}" data-field="${dia}">
                              ${["", "6.00", "10.00", "11.00", "24.00", "No Pagó"].map(option => 
                                `<option value="${option}" ${cobro === option ? "selected" : ""}>${option}</option>`
                              ).join('')}
                            </select>
                            <div class="timestamp">${timestamp.replace(' ', '<br>')}</div>
                          </div>
                        </td>
                    `;
                }).join('')}
        
        <td class="display-flex-center">
          <button class="btn btn-primary mg-05em edit-user-button" data-id="${user.id}">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-danger mg-05em delete-user-button" data-id="${user.id}">
            <i class="bi bi-eraser-fill"></i>
          </button>
        </td>
        <td class="text-center">
          <span class="${!user.userId ? 'invisible-value' : ''}">${user.userId || ''}</span>
        </td>
      </tr>
    `;
    tabla.innerHTML += row;
  });

  // Añadir el manejador de eventos a los selects
  attachSelectChangeListeners();
  updateSelectElements(database, collection); 
}

// Función para adjuntar manejadores de eventos a los selects
function attachSelectChangeListeners() {
  document.querySelectorAll('.form-select').forEach(select => {
    select.addEventListener('change', (event) => {
      const selectElement = event.target;
      const newValue = selectElement.value;
      const id = selectElement.getAttribute('data-id');
      const field = selectElement.getAttribute('data-field');

      // Actualiza los datos en Firebase
      update(ref(database, `${collection}/${id}`), {
        [field]: newValue
      }).then(() => {
        console.log('Datos actualizados exitosamente');
      }).catch(error => {
        console.error('Error al actualizar los datos: ', error);
      });
    });
  });

  // Añadir el manejador de eventos para los botones de editar y borrar
  addEditEventListeners();
  deleteRow(database, collection);
}

// Función para inicializar la búsqueda
export function initializeSearch(tabla) {
  document.getElementById("searchButton").addEventListener("click", () => findAndSearch(tabla));

  document.getElementById("searchInput").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      findAndSearch(tabla);
    }
  });
}
