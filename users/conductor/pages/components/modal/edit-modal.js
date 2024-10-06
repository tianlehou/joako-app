function loadEditModal() {
    fetch('./components/modal/edit-modal.html')
        .then(response => response.text())
        .then(html => {
            const modalContainer = document.getElementById('edit-modal-container');
            modalContainer.innerHTML = html;
        })
}

loadEditModal();
