function loadDownloadToExcel() {
    fetch('../../../components/downloadToExcelButton/downloadToExcelButton.html')
        .then(response => response.text())
        .then(html => {
            const modalContainer = document.getElementById('download-to-excel-container');
            modalContainer.innerHTML = html;
        })
}

loadDownloadToExcel();
