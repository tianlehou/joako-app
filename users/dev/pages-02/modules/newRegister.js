import { push, ref } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { database } from "../../../../environment/firebaseConfig.js";
import { collection } from "../script-pages-02.js";

let isSubmitting = false;  // Definir la variable isSubmitting

const form = document.getElementById("registerForm");

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        console.log("Evento submit está funcionando");

        if (!isSubmitting) {
            isSubmitting = true;

            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                isSubmitting = false;
                return;
            }

            const nombreInput = document.getElementById("validationNombre").value;

            if (nombreInput.trim() !== "") {
                const nuevoRegistro = { nombre: nombreInput };
                const referenciaUnidades = ref(database, collection);

                push(referenciaUnidades, nuevoRegistro)
                    .then(() => {
                        console.log("Datos enviados exitosamente a la base de datos.");
                        form.reset();
                        form.classList.remove('was-validated');
                        // Cerrar el modal después de enviar los datos
                        const modalElement = document.getElementById("newRegisterModal");
                        const modalInstance = bootstrap.Modal.getInstance(modalElement); // Obtener instancia del modal
                        modalInstance.hide(); // Cerrar el modal
                        setTimeout(() => { isSubmitting = false; }, 1000);
                        // Opcional: location.reload();
                    })
                    .catch((error) => {
                        console.error("Error al enviar datos a la base de datos:", error);
                        isSubmitting = false;
                    });
            } else {
                alert("Por favor completa todos los campos.");
                isSubmitting = false;
            }
        } else {
            alert("Ya se está enviando un formulario. Por favor espera unos momentos antes de intentar de nuevo.");
        }
    });
} else {
    console.error("El formulario no fue encontrado.");
}
