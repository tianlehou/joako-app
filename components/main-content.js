// head.js
function loadHTMLmaincontent() {
    const bodyContent = `
  <!-- Main Content -->
  <main class="main-content">

    <div class="main-container">
      <table id="miTabla" class="table table-striped">
        <!-- Table - Head -->
        <thead>
          <tr>
            <th class="text-center">#</th>
            <th class="text-center">Unidad</th>
            <th class="text-center">Placa</th>
            <th class="text-center">Nombre</th>
            <th class="text-center">Cédula</th>
            <th class="text-center">Whatsapp</th>
            <th class="text-center">Estado</th>
            <th class="text-center">Rol</th>
            <th>Acciones</th>
            <th class="text-center">correo</th>
            <th class="text-center">UserID</th>
          </tr>
        </thead>

        <!--  Dinamic Table - Body -->
        <tbody class="table-body" id="contenidoTabla">
          <!-- aqui va el contenido d la tabla -->
        </tbody>
      </table>
    </div>
  </main>
    `;
  
    const bodyElement = document.createElement('div');
    bodyElement.innerHTML = bodyContent;
    document.getElementById('main-content-container').appendChild(bodyElement);
  }
  
  // Ejecutar la función para cargar el contenido del head
  loadHTMLmaincontent();
  