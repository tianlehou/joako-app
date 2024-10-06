// loadExcelData.js
export function loadExcelData(file) {
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets['Predeterminada']; // Nombre de la hoja de Excel
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Aquí jsonData es un array de objetos con los datos de Excel
        console.log(jsonData);
        
        // Llama a una función para cargar los datos en la tabla
        cargarDatosEnTabla(jsonData);
    };

    reader.readAsArrayBuffer(file);
}

function cargarDatosEnTabla(data) {
    const tabla = document.getElementById("contenidoTabla");
    data.forEach((row, index) => {
        const nuevaFila = `
            <tr>
                <td class="text-center">${index + 1}</td>
                <td class="text-center">${row.Nombre}</td>
                <!-- Añade más columnas según los datos del archivo Excel -->
            </tr>
        `;
        tabla.innerHTML += nuevaFila;
    });
}
