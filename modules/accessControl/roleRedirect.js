// roleRedirect.js

// Importa funciones necesarias desde Firebase SDK para manejar la autenticación y base de datos
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
  ref,
  query,
  equalTo,
  orderByChild,
  get
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { auth, database } from "../../environment/firebaseConfig.js";

// Base URL para gestionar rutas dependiendo del entorno (local o GitHub Pages)
const baseUrl = window.location.origin.includes("github.io") ? "/joako" : "";

// Mapeo de roles de usuario a sus respectivas páginas para redirección
const rolePages = {
  Desarrollador: `${baseUrl}/users/dev/pages/biblioteca.html`,
  Administrador: `${baseUrl}/users/admin/pages/biblioteca.html`,
  Cobrador: `${baseUrl}/users/cobrador/pages/biblioteca.html`,
  Propietario: `${baseUrl}/users/owner/pages/biblioteca.html`,
  Conductor: `${baseUrl}/users/conductor/pages/biblioteca.html`,
};

// Función para detectar el rol del usuario y redirigirlo a la página correspondiente
export function detectRoleAndRedirect() {
  // Observa el estado de autenticación, si hay un usuario autenticado ejecuta la lógica
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid; // Obtiene el UID del usuario autenticado

      // Consulta la colección "biblioteca" para encontrar los datos del usuario por su "userId"
      const userRef = query(
        ref(database, "biblioteca"),
        orderByChild("userId"),
        equalTo(uid)
      );

      // Ejecuta la consulta a Firebase para obtener los datos del usuario
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            // Itera sobre los resultados obtenidos (en caso de múltiples entradas)
            snapshot.forEach((childSnapshot) => {
              const data = childSnapshot.val(); // Obtiene los datos de cada entrada
              const role = data.role; // Obtiene el rol del usuario
              const redirectPage = rolePages[role]; // Busca la página correspondiente según el rol

              if (redirectPage) {
                // Si hay una página asociada al rol, redirige al usuario a esa página
                window.location.href = redirectPage;
              } else {
                // Si el rol no es válido o no existe en el mapeo, se muestra un error en consola
                console.error("Rol no válido o no encontrado.");
              }
            });
          } else {
            // Si no se encuentra un usuario con el UID dado, muestra un error en consola
            console.error(
              "No se encontró usuario con este UID en la colección."
            );
          }
        })
        .catch((error) => {
          console.error("Error al verificar el acceso del usuario:", error);
          window.location.href = `${baseUrl}/login.html`; // Redirige al login si hay algún error o no está autenticado
      });
    }
  });
}
