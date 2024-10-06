// signupForm.js

// Importa la función 'createUserWithEmailAndPassword' de la biblioteca de autenticación de Firebase
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
// Importa las funciones 'ref' y 'push' de la biblioteca de base de datos en tiempo real de Firebase
import { ref, push } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
// Importa los objetos 'auth' y 'database' desde el archivo de configuración de Firebase
import { auth, database } from "../environment/firebaseConfig.js";

// Selecciona el formulario con el ID 'modalForm' del DOM
const signupForm = document.querySelector("#modalForm");

// Verifica si el formulario existe en el DOM
if (signupForm) {
  
  // Resetea el formulario cuando el modal se abre
  const myModalEl = document.getElementById("myModal");
  myModalEl.addEventListener('shown.bs.modal', () => {
    signupForm.reset(); // Limpia todos los campos del formulario
  });

  // Añade un listener para el evento 'submit' al formulario
  signupForm.addEventListener("submit", async (e) => {
    // Previene la acción predeterminada del formulario (envío de la página)
    e.preventDefault();

    // Obtiene los valores de los campos del formulario por su ID
    const unidadInput = document.getElementById("validationCustomUnidad").value;
    const placaInput = document.getElementById("validationCustomPlaca").value;
    const nombreInput = document.getElementById("validationCustomNombre").value;
    const cedulaInput = document.getElementById("validationCustomCedula").value;
    const whatsappInput = document.getElementById("validationCustomWhatsapp").value;
    const emailInput = document.getElementById("validationCustomEmail").value;
    const passwordInput = document.getElementById("validationCustomPassword").value;

    try {
      // Intenta crear un nuevo usuario con el correo electrónico y la contraseña proporcionados
      const userCredential = await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
      const user = userCredential.user;

      // Prepara un nuevo registro para almacenar en la base de datos
      const nuevoRegistro = {
        unidad: unidadInput,
        placa: placaInput,
        nombre: nombreInput,
        cedula: cedulaInput,
        whatsapp: whatsappInput,
        email: emailInput,
        userId: user.uid // Guarda el UID del usuario registrado
      };

      // Referencia a la colección en la base de datos en tiempo real donde se guardarán los datos
      const referenciaUnidades = ref(database, collection);

      // Inserta el nuevo registro en la base de datos
      await push(referenciaUnidades, nuevoRegistro);

      // Resetea el formulario después de un registro exitoso
      signupForm.reset();

      // Oculta el modal
      const myModal = bootstrap.Modal.getInstance(myModalEl);
      myModal.hide();

      // Muestra un mensaje de éxito al usuario
      alert("¡Registro exitoso!");

      // Recarga la página después de 100 milisegundos
      setTimeout(() => {
        location.reload();
      }, 100);

    } catch (error) {
      // Maneja diferentes tipos de errores de Firebase y muestra un mensaje de alerta correspondiente
      if (error.code === "auth/email-already-in-use") {
        alert("¡Este correo ya está en uso!, intente iniciar sesión o crear otro distinto a este.", "error");
      } else if (error.code === "auth/invalid-email") {
        alert("¡Correo inválido!, verifique que esté bien escrito e intente nuevamente.", "error");
      } else if (error.code === "auth/weak-password") {
        alert("¡Esta contraseña es corta y/o insegura!, se recomienda tener 8 caracteres o más, de lo posible combíne letras minúscula con mayúscula y número.", "error");
      } else if (error.code) {
        alert("¡Algo ha salido mal!, no logro detectar el error.", "error");
      }
      // Imprime el error en la consola para facilitar la depuración
      console.error("Error al registrar al usuario:", error);
    }
  });
} else {
  // Imprime un mensaje en la consola si el formulario no se encuentra en el DOM
  console.log("El formulario con ID 'modalForm' no se encontró, 'signup_Form.js' no se ejecutará.");
}
