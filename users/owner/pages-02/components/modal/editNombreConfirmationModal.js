export function loadEditNombreConfirmationModal() {
  const bodyContent = `
<div class="modal fade" id="editNombreConfirmationModal" tabindex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered display-flex-center" style="max-width: 320px;">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="confirmationModalLabel">Confirmación</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p id="confirmationMessage">¿Estás seguro de que deseas realizar esta acción?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" id="confirmActionButton">Confirmar</button>
      </div>
    </div>
  </div>
</div>
  `;

  const bodyElement = document.createElement('div');
  bodyElement.innerHTML = bodyContent;
  document.getElementById('edit-nombre-confirmation-modal-container').appendChild(bodyElement);
}

// Cargar el modal en el DOM
loadEditNombreConfirmationModal();
