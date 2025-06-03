export default function dragDropFoto() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('profilePicture');

    if (!dropZone || !fileInput) return;

    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#3a86ff';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = '#ccc';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        fileInput.files = e.dataTransfer.files;
        // Aqui você pode adicionar pré-visualização da imagem se quiser
    });
}
