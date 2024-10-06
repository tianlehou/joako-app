// Importaciones
import { database } from "../../../../environment/firebaseConfig.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { changeEstadoSelectEvent, changeRoleSelectEvent } from "../../modules/tabla/changeSelectEvent.js"; // Importa las funciones de changeSelectEvent.js
import { updateSelectElements } from "./updateSelectElements.js"; // Importa la función de updateSelectElement.js

const tabla = document.getElementById("contenidoTabla");

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

    // Aplica los estilos y actualiza los selects una vez que los datos han sido renderizados
    updateSelectElements(); // Llama a la función importada
  });
}

// Función para renderizar los datos en la tabla
function renderUsersTable(data) {
  const tabla = document.getElementById("miTabla");
  tabla.innerHTML = "";

  // Agrega el thead una sola vez antes de las filas
  const thead = `
    <thead>
      <tr>
        <th class="text-center">#</th>
        <th class="text-center" id="headerTabla">Unidad</th>
        <th class="text-center" id="headerTabla">Placa</th>
        <th class="text-center" id="headerTabla">Nombre</th>
        <th class="text-center" id="headerTabla">Cédula</th>
        <th class="text-center" id="headerTabla">WhatsApp</th>
        <th class="text-center" id="headerTabla">Estado</th>
        <th class="text-center" id="headerTabla">Rol</th>
        <th class="text-center" id="headerTabla">Email</th>
        <th class="text-center" id="headerTabla">Acciones</th>
      </tr>
    </thead>
  `;
  tabla.innerHTML = thead; // Inserta el encabezado en la tabla

  // Itera sobre los datos para crear las filas
  data.forEach((user, index) => {
    const row = `
      <tr>
        <td class="text-center">${index + 1}</td>
        <td class="text-center">${user.unidad}</td>
        <td class="text-center">${user.placa}</td>
        <td class="text-center">${user.nombre}</td>
        <td class="text-center">${user.cedula}</td>
        <td class="text-center">
          <a href="https://wa.me/${user.whatsapp}" target="_blank">
            ${user.whatsapp}
          </a>
        </td>
        <td class="text-center estado-col">
          <div class="flex-container">
            <span>${user.estado}</span>
            <select class="form-select estado-select" data-id="${user.id}">
              <option value="" ${user.estado === "" ? "selected" : ""}></option>
              <option value="Activo" ${user.estado === "Activo" ? "selected" : ""}>Activo</option>
              <option value="Sin carro" ${user.estado === "Sin carro" ? "selected" : ""}>Sin carro</option>
              <option value="Suspendido" ${user.estado === "Suspendido" ? "selected" : ""}>Suspendido</option>
              <option value="Expulsado" ${user.estado === "Expulsado" ? "selected" : ""}>Expulsado</option>
            </select>
          </div>
        </td>
        <td class="text-center role-col">
          <div class="flex-container">
            <span>${user.role}</span>
            <select class="form-select role-select" data-id="${user.id}">
              <option value="" ${user.role === "" ? "selected" : ""}></option>
              <option value="Propietario" ${user.role === "Propietario" ? "selected" : ""}>Propietario</option>
              <option value="Conductor" ${user.role === "Conductor" ? "selected" : ""}>Conductor</option>
              <option value="Secretario" ${user.role === "Secretario" ? "selected" : ""}>Secretario</option>
            </select>
          </div>
        </td>
        <td class="text-center">${user.email}</td>
        <td>
          <button class="btn btn-primary edit-user-button" data-id="${user.id}">Editar</button>
          <button class="btn btn-danger delete-user-button" data-id="${user.id}">Eliminar</button>
        </td>
      </tr>
    `;
    tabla.innerHTML += row; // Inserta cada fila debajo del thead
  });
}

export function initializeSearch(tabla) {
  document.getElementById("searchButton").addEventListener("click", () => findAndSearch(tabla));

  document.getElementById("searchInput").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      findAndSearch(tabla);
    }
  });
}

// Inicializa la tabla y eventos al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
  changeEstadoSelectEvent(tabla, database, collection);
  changeRoleSelectEvent(tabla, database, collection); // Llama a la función para cambiar el rol
});
