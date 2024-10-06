// Importa funciones y referencias necesarias de Firebase y módulos personalizados
import { update, ref } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { database } from "../../../../environment/firebaseConfig.js";
import { mostrarDatos } from '../script-pages-01.js';

// Selecciona el modal y los elementos del formulario
const editModal = document.getElementById("editModal");
const closeEditModal = document.getElementById("closeEditModal");
const saveEditButton = document.getElementById("saveEditButton");
const editForm = document.getElementById("editForm");

// Campos del formulario dentro del modal
const editUnidad = document.getElementById("editUnidad");
const editPlaca = document.getElementById("editPlaca");
const editNombre = document.getElementById("editNombre");
const editCedula = document.getElementById("editCedula");
const editWhatsapp = document.getElementById("editWhatsapp");

let currentUserId = null; // Variable para almacenar el ID del usuario actual

// Función para añadir event listeners a los botones de editar
export function addEditEventListeners() {
  const editButtons = document.querySelectorAll(".edit-user-button");
  editButtons.forEach((button) => {
    button.addEventListener("click", handleEdit);
  });
}

// Función que maneja la edición de un usuario
function handleEdit(event) {
  const button = event.target.closest(".edit-user-button"); // Asegura que se selecciona el botón correctamente
  const id = button.getAttribute("data-id");
  const userRow = button.closest("tr");
  
  // Verifica si el ID es válido
  if (!id) {
    console.error("ID de usuario no encontrado o inválido.");
    return;
  }

  // Guarda el ID del usuario actual para usarlo al guardar
  currentUserId = id;

  // Carga los valores actuales en el formulario del modal
  editUnidad.value = userRow.children[1].textContent;
  editPlaca.value = userRow.children[2].textContent;
  editNombre.value = userRow.children[3].textContent;
  editCedula.value = userRow.children[4].textContent;
  editWhatsapp.value = userRow.children[5].textContent;

  // Abre el modal
  editModal.style.display = "block";
}

// Función para cerrar el modal
closeEditModal.onclick = function() {
  editModal.style.display = "none";
};

// Función que maneja el guardado de la edición
saveEditButton.addEventListener("click", function() {
  // Captura los valores del formulario
  const unidad = editUnidad.value;
  const placa = editPlaca.value;
  const nombre = editNombre.value;
  const cedula = editCedula.value;
  const whatsapp = editWhatsapp.value;

  // Asegúrate de que los campos esenciales no estén vacíos
  if (!nombre) {
    alert("Todos los campos deben ser llenados.");
    return;
  }

  // Mostrar confirmación antes de proceder
  const confirmar = confirm("¿Estás seguro de que deseas actualizar este usuario?");
  
  if (confirmar) {
    const updates = { unidad, placa, nombre, cedula, whatsapp };

    // Actualiza los datos en Firebase
    update(ref(database, `${collection}/${currentUserId}`), updates)
      .then(() => {
        alert("Usuario actualizado correctamente");
        mostrarDatos(); // Refresca los datos en la tabla
        editModal.style.display = "none"; // Cierra el modal
      })
      .catch((error) => {
        console.error("Error al actualizar usuario: ", error);
      });
  } else {
    alert("Actualización cancelada.");
  }
});

// Cierra el modal si se hace clic fuera de él
window.onclick = function(event) {
  if (event.target == editModal) {
    editModal.style.display = "none";
  }
};
