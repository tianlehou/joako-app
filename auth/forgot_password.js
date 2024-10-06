import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { auth } from '../environment/firebaseConfig.js';

document.getElementById("forgotPasswordForm").addEventListener("submit", (e) => {
  e.preventDefault();
  
//   const auth = getAuth();
  const email = document.getElementById("forgotPasswordEmail").value;
  
  sendPasswordResetEmail(auth, email)
    .then(() => {
      document.getElementById("forgotPasswordSuccess").textContent =
        "Correo enviado correctamente. Verifica tu bandeja de entrada.";
    })
    .catch((error) => {
      document.getElementById("forgotPasswordError").textContent =
        "Error al enviar el correo. Inténtalo de nuevo.";
    });
});
