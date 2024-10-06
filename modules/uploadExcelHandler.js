import { ref, push } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { database } from "../../environment/firebaseConfig.js";

// Función para leer y procesar el archivo Excel y actualizar la base de datos
export function handleFileUpload() {
    const fileInput = document.getElementById('fileInput');
    const uploadButton = document.getElementById('uploadButton');
    const fileLabel = document.querySelector('label[for="fileInput"]');
    const modalElement = document.getElementById('newRegisterModal');

    // Ocultar el botón de carga inicialmente
    uploadButton.classList.add('hidden');

    // Mostrar el botón de cargar datos solo si hay un archivo seleccionado
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            const fileName = fileInput.files[0].name;
            fileLabel.textContent = `Archivo "${fileName}" ha sido seleccionado.`;
            uploadButton.classList.remove('hidden');
        } else {
            fileLabel.textContent = 'Seleccionar Archivo';
            uploadButton.classList.add('hidden');
        }
    });

    uploadButton.addEventListener('click', async () => {
        const file = fileInput.files[0];
        if (file) {
            try {
                await uploadExcelData(file);
                alert('Datos cargados exitosamente.');
                resetUploadForm();
                closeModal(modalElement);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
                alert('Error al cargar los datos.');
            }
        } else {
            alert('Por favor, selecciona un archivo.');
        }
    });
}

// Función para leer y procesar el archivo Excel
async function uploadExcelData(file) {
    const reader = new FileReader();
    const data = await new Promise((resolve, reject) => {
        reader.onload = (event) => resolve(new Uint8Array(event.target.result));
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });

    const workbook = XLSX.read(data, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Actualizar los nombres en la tabla
    const nombresRef = ref(database, collection);
    for (const item of jsonData) {
        const nuevoRegistro = { nombre: item.nombre };
        await push(nombresRef, nuevoRegistro);
    }
}

// Función para limpiar el formulario de carga
function resetUploadForm() {
    const fileInput = document.getElementById('fileInput');
    const fileLabel = document.querySelector('label[for="fileInput"]');
    const uploadButton = document.getElementById('uploadButton');

    fileInput.value = '';
    fileLabel.textContent = 'Seleccionar Archivo';
    uploadButton.classList.add('hidden');
}

// Función para cerrar el modal
function closeModal(modalElement) {
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
}
