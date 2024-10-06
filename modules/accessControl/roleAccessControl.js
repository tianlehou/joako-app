// roleAccessControl.js
import { getUserRole } from './getUserRole.js'; // Importa la función para obtener el rol del usuario

// Detecta si la aplicación está corriendo localmente o en GitHub Pages
const baseUrl = window.location.origin.includes('github.io') ? '/joako' : '';

// Función para verificar el acceso basado en el rol del usuario
export function checkUserAccess() {
    getUserRole()
        .then((role) => {
            const currentUrl = window.location.pathname; // Obtiene la URL actual

            // Verifica las restricciones de acuerdo al rol del usuario
            if (role === 'Administrador' && !currentUrl.startsWith(`${baseUrl}/users/admin`)) {
                window.location.href = `${baseUrl}/access-denied.html`; // Redirige a página de acceso denegado
            } else if (role === 'Cobrador' && !currentUrl.startsWith(`${baseUrl}/users/cobrador`)) {
                window.location.href = `${baseUrl}/access-denied.html`; // Redirige a página de acceso denegado
            } else if (role === 'Propietario' && !currentUrl.startsWith(`${baseUrl}/users/owner`)) {
                window.location.href = `${baseUrl}/access-denied.html`; // Redirige a página de acceso denegado
            } else if (role === 'Conductor' && !currentUrl.startsWith(`${baseUrl}/users/conductor`)) {
                window.location.href = `${baseUrl}/access-denied.html`; // Redirige a página de acceso denegado
            }
        })
        .catch((error) => {
            console.error("Error al verificar el acceso del usuario:", error);
            window.location.href = `${baseUrl}/login.html`; // Redirige al login si hay algún error o no está autenticado
        });
}
