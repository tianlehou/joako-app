// scripts.js

// Librería para generar Excel
const xlsxScript = document.createElement('script');
xlsxScript.src = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
document.body.appendChild(xlsxScript);

const xlsxStyleScript = document.createElement('script');
xlsxStyleScript.src = "https://cdn.jsdelivr.net/npm/xlsx-style@0.8.13/dist/xlsx-style.min.js";
document.body.appendChild(xlsxStyleScript);

// Bootstrap & Popper - Script
const popperScript = document.createElement('script');
popperScript.src = "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js";
popperScript.integrity = "sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r";
popperScript.crossOrigin = "anonymous";
document.body.appendChild(popperScript);

const bootstrapScript = document.createElement('script');
bootstrapScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js";
bootstrapScript.integrity = "sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy";
bootstrapScript.crossOrigin = "anonymous";
document.body.appendChild(bootstrapScript);

// Ionic Icons
const ioniconsModuleScript = document.createElement('script');
ioniconsModuleScript.type = "module";
ioniconsModuleScript.src = "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js";
document.body.appendChild(ioniconsModuleScript);

const ioniconsNoModuleScript = document.createElement('script');
ioniconsNoModuleScript.setAttribute('nomodule', '');
ioniconsNoModuleScript.src = "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js";
document.body.appendChild(ioniconsNoModuleScript);