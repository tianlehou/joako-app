// Importa funciones y referencias necesarias de Firebase y módulos personalizados
import { update, ref } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { database } from "../../../../environment/firebaseConfig.js";
import { mostrarDatos, collection } from '../script-pages-02.js';
import { loadEditNombreModal } from '../components/modal/editNombreModal.js'; // Importa la función del modal
import { loadEditNombreConfirmationModal } from '../components/modal/editNombreConfirmationModal.js'; // Importa la función del modal de confirmación

// Cargar los modales una vez en el inicio
loadEditNombreModal();
loadEditNombreConfirmationModal();

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

  // Rellenar el input del modal con el nombre actual
  const nombreActual = userRow.children[1].textContent;
  document.getElementById("editNombre").value = nombreActual;

  // Guardar el ID del usuario en un atributo de data para referencia futura
  document.getElementById("saveEditButton").setAttribute("data-id", id);

  // Mostrar el modal de edición
  const editModal = new bootstrap.Modal(document.getElementById('editNombreModal'));
  editModal.show();
}

// Evento para guardar cambios y confirmar antes de actualizar Firebase
document.getElementById("saveEditButton").addEventListener("click", function () {
  const id = this.getAttribute("data-id");
  const nuevoNombre = document.getElementById("editNombre").value;

  // Asegúrate de que el campo nombre no esté vacío
  if (!nuevoNombre) {
    alert("El nombre no puede estar vacío.");
    return;
  }

  // Muestra el modal de confirmación
  const confirmationModal = new bootstrap.Modal(document.getElementById('editNombreConfirmationModal'));
  confirmationModal.show();

  // Cuando se confirma la acción en el modal de confirmación
  document.getElementById("confirmActionButton").addEventListener("click", function () {
    const updates = { nombre: nuevoNombre };

    // Actualiza los datos en Firebase
    update(ref(database, `${collection}/${id}`), updates)
      .then(() => {
        alert("Usuario actualizado correctamente");
        mostrarDatos(); // Refresca los datos en la tabla
      })
      .catch((error) => {
        console.error("Error al actualizar usuario: ", error);
      });

    // Cerrar el modal de confirmación y el modal de edición
    confirmationModal.hide();
    const editModal = bootstrap.Modal.getInstance(document.getElementById('editNombreModal'));
    editModal.hide();
  });
});
