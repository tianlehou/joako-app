import { getUserRole } from "../../accessControl/getUserRole.js";

// Función para filtrar los datos según el rol del usuario
export async function filterDataByRole(data) {
    const userRole = await getUserRole();

    // Filtrar los datos según el rol
    const filteredData = data.filter(user => {
        if (userRole === "Desarrollador") {
            return true; // Desarrollador puede ver todos los roles
        } else if (userRole === "Administrador" || userRole === "Cobrador") {
            return user.role !== "Desarrollador"; // Excluir datos de Desarrollador
        } else if (userRole === "Conductor" || userRole === "Secretario") {
            return ["Conductor", "Secretario"].includes(user.role); // Solo Conductor y Secretario
        } else if (userRole === "Propietario") {
            return user.role === "Conductor"; // Solo Conductor
        } else {
            return false; // Si no tiene rol asignado o no cumple las condiciones, no ver datos
        }
    });

    return filteredData; // Devuelve los datos filtrados
}
