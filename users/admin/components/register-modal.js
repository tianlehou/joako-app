// head.js
function loadregistermodal() {
    const bodyContent = `
<!-- Register Modal -->
  <div class="modal fade" id="myModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Formulario de Registro
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="row g-3 needs-validation" id="modalForm" novalidate>
            <div class="col-md-6">
              <label for="validationCustomUnidad" class="form-label">Unidad</label>
              <input type="text" class="form-control" id="validationCustomUnidad" placeholder="Unidad" required>
              <div class="invalid-feedback">
                Por favor, ingrese una unidad.
              </div>
            </div>
            <div class="col-md-6">
              <label for="validationCustomPlaca" class="form-label">Placa</label>
              <input type="text" class="form-control" id="validationCustomPlaca" placeholder="Placa" required>
              <div class="invalid-feedback">Por favor, ingrese una placa.</div>
            </div>
            <div class="col-md-6">
              <label for="validationCustomNombre" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="validationCustomNombre" placeholder="Nombre" required>
              <div class="invalid-feedback">Por favor, ingrese un nombre.</div>
            </div>
            <div class="col-md-6">
              <label for="validationCustomCedula" class="form-label">Cédula</label>
              <input type="text" class="form-control" id="validationCustomCedula" placeholder="Cédula" required>
              <div class="invalid-feedback">Por favor, ingrese una cédula.</div>
            </div>
            <div class="col-md-6">
              <label for="validationCustomWhatsapp" class="form-label">Whatsapp</label>
              <input type="text" class="form-control" id="validationCustomWhatsapp" placeholder="Whatsapp" required>
              <div class="invalid-feedback">Por favor, ingrese un número de Whatsapp.</div>
            </div>
            <div class="col-md-6">
              <label for="validationCustomEmail" class="form-label">Correo</label>
              <input type="email" class="form-control" id="validationCustomEmail" placeholder="Correo" required autocomplete="username">
              <div class="invalid-feedback">Por favor, ingrese un correo válido.</div>
            </div>
            <div class="col-md-6">
              <label for="validationCustomPassword" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="validationCustomPassword" placeholder="Contraseña" required autocomplete="current-password">
              <div class="invalid-feedback">Por favor, ingrese una contraseña.</div>
            </div>
            <div class="col-12">
              <button class="btn btn-primary" type="submit" id="submitModalForm-btn">
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
    `;

    const bodyElement = document.createElement('div');
    bodyElement.innerHTML = bodyContent;
    document.getElementById('register-modal-container').appendChild(bodyElement);
}

// Ejecutar la función para cargar el contenido del head
loadregistermodal();
