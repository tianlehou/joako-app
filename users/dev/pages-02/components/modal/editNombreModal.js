export function loadEditNombreModal() {
  const bodyContent = `
  <div class="modal fade" id="editNombreModal" tabindex="-1" aria-labelledby="editNombreModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editNombreModalLabel">Editar Nombre</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="editNombreForm">
            <div class="mb-3">
              <label for="editUserName" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="editNombre" required>
            </div>
            <!-- Otros campos que desees editar -->
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" id="saveEditButton">Guardar Cambios</button>
        </div>
      </div>
    </div>
  </div>
    `;

  const bodyElement = document.createElement('div');
  bodyElement.innerHTML = bodyContent;
  document.getElementById('edit-nombre-modal-container').appendChild(bodyElement);
}

// Ejecutar la función para cargar el contenido del head
loadEditNombreModal();
