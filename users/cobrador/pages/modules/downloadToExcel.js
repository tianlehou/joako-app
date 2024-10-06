// Importa las funciones 'onValue' y 'ref' de la biblioteca de base de datos en tiempo real de Firebase
import { onValue, ref } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
// Importa la configuración de la base de datos desde el archivo de configuración de Firebase
import { database } from "../../../../environment/firebaseConfig.js";

// Función para cargar un archivo Excel desde una URL
async function loadExcelTemplate(url) {
    // Obtiene el archivo como ArrayBuffer
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    // Lee el archivo Excel y devuelve el objeto de libro de trabajo
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    return workbook;
}

// Función para descargar los datos de la base de datos como un archivo Excel usando una plantilla
async function downloadToExcel() {
    // Muestra un cuadro de confirmación al usuario antes de proceder con la descarga
    const confirmDownload = confirm("¿Estás seguro de que deseas descargar el archivo Excel?");
    
    // Si el usuario confirma, procede con la descarga
    if (confirmDownload) {
        try {
            // Carga la plantilla de Excel desde la URL proporcionada
            const templateWorkbook = await loadExcelTemplate("../../../../assets/excelTemplate/datos-biblioteca.xlsx");
            
            // Obtiene los datos de la base de datos en tiempo real de Firebase
            onValue(ref(database, collection), (snapshot) => {
                const data = [];
                snapshot.forEach((childSnapshot) => {
                    // Extrae los valores de cada registro en la base de datos
                    const { unidad, placa, nombre, cedula, whatsapp, estado, role } = childSnapshot.val();
                    data.push({ unidad, placa, nombre, cedula, whatsapp, estado, role });
                });

                // Selecciona la primera hoja de la plantilla para insertar los datos
                const worksheet = templateWorkbook.Sheets[templateWorkbook.SheetNames[0]];

                // Obtiene el rango actual de la hoja
                const range = XLSX.utils.decode_range(worksheet['!ref']);
                let startRow = range.e.r + 1;

                // Inserta los datos en la hoja, comenzando desde la fila 2
                data.forEach((row, index) => {
                    const rowNum = startRow + index;
                    const cellValues = Object.values(row);
                    cellValues.forEach((value, colIndex) => {
                        const cellAddress = { c: colIndex, r: rowNum };
                        const cellRef = XLSX.utils.encode_cell(cellAddress);

                        // Copia el estilo de la celda de encabezado a las nuevas celdas
                        const headerCellAddress = { c: colIndex, r: 1 }; // Fila de encabezado es la fila 1
                        const headerCellRef = XLSX.utils.encode_cell(headerCellAddress);
                        const headerCell = worksheet[headerCellRef];

                        worksheet[cellRef] = { v: value, s: headerCell.s };
                    });
                });

                // Actualiza el rango de la hoja para incluir las nuevas filas
                worksheet['!ref'] = XLSX.utils.encode_range(range.s, { c: range.e.c, r: startRow + data.length - 1 });

                // Crea y descarga el archivo Excel
                XLSX.writeFile(templateWorkbook, "datos.xlsx");
                // Muestra un mensaje de éxito después de completar la descarga
                alert("Se ha descargado un excel con los datos del tablero", "success");
            });
        } catch (error) {
            // Muestra un mensaje de error si ocurre algún problema durante la carga o la descarga
            alert("Error al procesar la plantilla o los datos: " + error.message);
            console.error("Error al procesar la plantilla o los datos:", error);
        }
    } else {
        // Si el usuario cancela, muestra un mensaje indicando que la descarga fue cancelada
        alert("Descarga cancelada");
    }
}

// Verifica si el botón para descargar el archivo existe en el DOM
const downloadButton = document.getElementById("downloadToExcel");
if (downloadButton) {
    // Asigna la función 'downloadToExcel' al evento 'click' del botón
    downloadButton.addEventListener("click", downloadToExcel);
} else {
    // Si el botón no se encuentra en el DOM, imprime un mensaje en la consola
    console.log("El botón con ID 'downloadToExcel' no se encontró en el DOM, el script no se ejecutará.");
}
