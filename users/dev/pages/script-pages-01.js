import {
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { database } from "../../../environment/firebaseConfig.js";

import "./auth/signup_Form.js";
import { checkAuth } from "../../../modules/accessControl/authCheck.js";
import { checkUserAccess } from "../../../modules/accessControl/roleAccessControl.js";
import { filterDataByRole } from "../../../modules/tabla/filterData/filterDataByRole.js";

import { deleteRow } from "./modules/deleteRow.js";
import { addEditEventListeners } from "./modules/editRow.js";
import "../../../modules/excel/downloadToExcel-biblioteca.js";

import { initializeSearch } from "./modules/searchFunction.js";
import { includeHTML } from "../components/includeHTML/includeHTML.js";
import {
  changeEstadoSelectEvent,
  changeRoleSelectEvent,
} from "../modules/tabla/changeSelectEvent.js";

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
                  <select class="form-select estado-select" data-id="${user.id
        }">
                    <option value="Ninguno" ${user.estado === "Ninguno" ? "selected" : ""
        }>Ninguno</option>
                    <option value="Activo" ${user.estado === "Activo" ? "selected" : ""
        }>Activo</option>
                    <option value="Sin carro" ${user.estado === "Sin carro" ? "selected" : ""
        }>Sin carro</option>
                    <option value="Suspendido" ${user.estado === "Suspendido" ? "selected" : ""
        }>Suspendido</option>
                    <option value="Expulsado" ${user.estado === "Expulsado" ? "selected" : ""
        }>Expulsado</option>
                  </select>
                </div>
              </td>
              <td class="text-center role-col">
                <div class="flex-container">
                  <span>${user.role}</span>
                  <select class="form-select role-select" data-id="${user.id}">
                    <option value="Ninguno" ${user.role === "Ninguno" ? "selected" : ""
        }>Ninguno</option>
                    <option value="Administrador" ${user.role === "Administrador" ? "selected" : ""
        }>Administrador</option>
                    <option value="Cobrador" ${user.role === "Cobrador" ? "selected" : ""
        }>Cobrador</option>
                    <option value="Propietario" ${user.role === "Propietario" ? "selected" : ""
        }>Propietario</option>
                    <option value="Conductor" ${user.role === "Conductor" ? "selected" : ""
        }>Conductor</option>
                    <option value="Secretario" ${user.role === "Secretario" ? "selected" : ""
        }>Secretario</option>
                  </select>
                </div>
              </td>
              <td>
                <button class="btn btn-primary edit-user-button" data-id="${user.id
        }"><i class="bi bi-highlighter"></i></button>
                <button class="btn btn-danger delete-user-button" data-id="${user.id
        }"><i class="bi bi-eraser-fill"></i></button>
              </td>
              <td class="text-center">${user.email}</td>
              <td class="text-center">${user.userId}</td>
            </tr>
          `;
      tabla.innerHTML += row;
    }
    deleteRow(database, collection);
    addEditEventListeners(database, collection);
  });
}

// Inicializa la tabla y eventos al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
  checkUserAccess();

  includeHTML();
  mostrarDatos();
  initializeSearch(tabla);
  changeRoleSelectEvent(tabla, database, collection);
  changeEstadoSelectEvent(tabla, database, collection);
});

console.log(database);
