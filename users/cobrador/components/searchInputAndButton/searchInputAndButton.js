function loadSearchInput() {
    fetch('../components/searchInputAndButton/searchInputAndButton.html')
        .then(response => response.text())
        .then(html => {
            const modalContainer = document.getElementById('search-container');
            modalContainer.innerHTML = html;
        })
}

loadSearchInput();
