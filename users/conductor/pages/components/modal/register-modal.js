function loadRegisterModal() {
  fetch('./components/modal/register-modal.html') // Ruta al archivo edit-modal.html
      .then(response => response.text())
      .then(html => {
          const modalContainer = document.getElementById('register-modal-container');
          modalContainer.innerHTML = html;
      })
}

loadRegisterModal();
