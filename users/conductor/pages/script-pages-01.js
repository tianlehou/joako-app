import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { database } from "../../../environment/firebaseConfig.js";

import { checkAuth } from '../../../modules/accessControl/authCheck.js';
import { checkUserAccess } from "../../../modules/accessControl/roleAccessControl.js";
import { filterDataByRole } from "../../../../modules/tabla/filterData/filterDataByRole.js";

import { includeHTML } from '../components/includeHTML/includeHTML.js';
import { changeEstadoSelectEvent } from "../modules/tabla/changeSelectEvent.js";

// Constantes y variables de estado
const tabla = document.getElementById("contenidoTabla");

export function mostrarDatos() {
  onValue(ref(database, collection), async (snapshot) => {
    tabla.innerHTML = "";

    const data = [];
    snapshot.forEach((childSnapshot) => {
      data.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });

    // Filtrar los datos según el rol del usuario
    const filteredData = await filterDataByRole(data);

    // Ordenar alfabéticamente los datos filtrados
    filteredData.sort((a, b) => a.nombre.localeCompare(b.nombre));

    let filaNumero = 1;

    for (let i = 0; i < filteredData.length; i++) {
      const user = filteredData[i];
      const row = `
            <tr>
              <td class="text-center">${filaNumero++}</td>
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
                    <option value="Ninguno" ${user.estado === "Ninguno" ? "selected" : ""}>Ninguno</option>
                    <option value="Activo" ${user.estado === "Activo" ? "selected" : ""}>Activo</option>
                    <option value="Sin carro" ${user.estado === "Sin carro" ? "selected" : ""}>Sin carro</option>
                  </select>
                </div>
              </td>
              <td class="text-center role-col">
                <div class="text-center">
                  <span>${user.role}</span>
                </div>
              </td>
            </tr>
          `;
      tabla.innerHTML += row;
    }
  });
}

// Inicializa la tabla y eventos al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  checkUserAccess();

  mostrarDatos();
  includeHTML();
  changeEstadoSelectEvent(tabla, database, collection);
});

console.log(database);
