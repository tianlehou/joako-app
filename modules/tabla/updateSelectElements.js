// Importa las funciones `ref` y `update` desde el módulo Firebase para manipular la base de datos en tiempo real.
import { ref, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Exporta la función `updateSelectElements`, que se utiliza para actualizar los elementos `select` en la tabla.
export function updateSelectElements(database, collection) {
    // Selecciona todos los elementos del DOM con la clase `pay-select`.
    const selectElements = document.querySelectorAll(".pay-select");

    // Itera sobre cada elemento `select` encontrado.
    selectElements.forEach((selectElement) => {
        // Define una función interna `updateSelectElement` para actualizar la apariencia y comportamiento de cada `select`.
        const updateSelectElement = () => {
            // Obtiene el valor seleccionado actualmente en el `select`.
            const selectedValue = selectElement.value;
            // Almacena el valor seleccionado en un atributo `data-oldValue` para referencia futura.
            selectElement.dataset.oldValue = selectedValue;
            // Desactiva el `select` si el valor es "12.00" o "pagado", impidiendo que el usuario lo modifique.
            selectElement.disabled = selectedValue === "12.00" || selectedValue === "pagado";

            // Encuentra el elemento `span` asociado dentro del mismo contenedor `div` que el `select`.
            const spanElement = selectElement.closest('div.flex-container').querySelector('span');

            // Si el valor seleccionado es "12.00" o "Completado", cambia el color del texto a verde y lo hace en negrita.
            if (selectedValue === "12.00" || selectedValue === "Completado") {
                spanElement.style.color = "green";
                spanElement.style.fontWeight = "bold";
            // Si el valor seleccionado es "pagado", inserta un ícono de luz verde dentro del `span`.
            } else if (selectedValue === "pagado") {
                spanElement.innerHTML = '<span class="luz-verde"></span>';
            // Si el valor seleccionado es otro, restablece el texto del `span` al valor seleccionado y lo formatea con estilo normal.
            } else {
                spanElement.textContent = selectedValue;
                spanElement.style.color = "black";
                spanElement.style.fontWeight = "normal";
            }
        };

        // Agrega un event listener al `select` que se activa cada vez que se cambia el valor seleccionado.
        selectElement.addEventListener("change", function () {
            // Obtiene el nuevo valor seleccionado, así como los atributos `data-id` y `data-field` del `select`.
            const selectedValue = this.value;
            const userId = this.getAttribute("data-id");
            const field = this.getAttribute("data-field");

            // Verifica si el campo cambiado corresponde a uno de los días "1" a "6".
            if (["1", "2", "3", "4", "5", "6"].includes(field)) {
                // Si el usuario no confirma el cambio, restaura el valor anterior y sale de la función.
                if (!confirm("¿Estás seguro de que deseas hacer este cambio?")) {
                    this.value = this.dataset.oldValue;
                    return;
                }
            }

            // Actualiza el valor en la base de datos de Firebase para el usuario y campo específico.
            update(ref(database, `${collection}/${userId}`), {
                [field]: selectedValue,
            });

            // Si el valor seleccionado es "12.00" o "pagado", oculta el `select` añadiendo la clase `d-none`.
            if (selectedValue === "12.00" || selectedValue === "pagado") {
                this.classList.add('d-none');
            // Si no, asegura que el `select` esté visible eliminando la clase `d-none`.
            } else {
                this.classList.remove('d-none');
            }

            // Llama a la función `updateSelectElement` para aplicar los cambios visuales y de comportamiento al `select`.
            updateSelectElement();
        });

        // Llama a la función `updateSelectElement` inicialmente para aplicar los estilos y configuraciones correctas.
        updateSelectElement();
    });
}
