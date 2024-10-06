function loadnewregistermodal() {
  const bodyContent = `
  <!--=== ===== New Register Modal ===== ===-->
  <div class="modal fade" id="newRegisterModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Formulario de Registro</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
  
              <div class="modal-body">
                  <form class="row g-3 needs-validation" id="registerForm" novalidate>
                      <div class="display-flex-center">
                          <div class="col-md-6 display-flex-center">
                              <label for="validationNombre" class="form-label col-6">Nombre</label>
                              <input type="text" class="form-control" id="validationNombre" placeholder="Nombre" required />
                              <div class="invalid-feedback">Por favor, ingrese Nombre.</div>
                          </div>
  
                          <div class="col-3">
                              <button class="btn btn-primary" type="submit" id="submitModalForm-btn">
                                  Agregar
                              </button>
                          </div>
                      </div>
                      <p>- Agrega uno a la vez.</p>
                  </form>
                  <div class="line"></div>
                  <footer>
                      <label for="fileInput">Seleccionar Archivo</label>
                      <input type="file" id="fileInput" accept=".xlsx" />
                      <button id="uploadButton" class="hidden">Cargar Datos</button>
                      <p>- Selecciona y carga un archivo excel con una lista de nombres predeterminado.</p>
                  </footer>
              </div>
          </div>
      </div>
  </div>
  
  <style>
      .hidden {
          display: none;
      }
  
      #fileInput {
          display: none;
          /* Oculta el input de archivo */
      }
  
      #uploadButton {
          background-color: #4CAF50;
          /* Verde */
          border: none;
          color: white;
          padding: 12px 24px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
          border-radius: 8px;
          transition: background-color 0.3s ease;
      }
  
      #uploadButton:hover {
          background-color: #45a049;
          /* Un verde un poco más oscuro */
      }
  
      #uploadButton:active {
          background-color: #3e8e41;
          /* Verde aún más oscuro al hacer clic */
          box-shadow: 0 5px #666;
          transform: translateY(2px);
      }
  
      /* Estilo para una etiqueta que simule un botón */
      label[for="fileInput"] {
          background-color: #008CBA;
          /* Azul */
          color: white;
          padding: 12px 24px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
          border-radius: 8px;
          transition: background-color 0.3s ease;
      }
  
      label[for="fileInput"]:hover {
          background-color: #007bb5;
          /* Azul un poco más oscuro */
      }
  
      label[for="fileInput"]:active {
          background-color: #006ba1;
          /* Azul más oscuro al hacer clic */
          box-shadow: 0 5px #666;
          transform: translateY(2px);
      }
  
      .line {
          border: .1px #999 solid;
      }
  </style>
  `;
  
  const bodyElement = document.createElement('div');
  bodyElement.innerHTML = bodyContent;
  document.getElementById('new-register-modal-container').appendChild(bodyElement);
  
  // Reafirmar que el botón de cargar datos esté oculto al cargar el modal
  const uploadButton = document.getElementById('uploadButton');
  uploadButton.classList.add('hidden');
}

// Ejecutar la función para cargar el contenido del modal
loadnewregistermodal();
