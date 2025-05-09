export default function contadorBio() {
    const bioInput = document.getElementById('bio');
    const charCount = document.getElementById('char-count');

    if (!bioInput || !charCount) return;

    bioInput.addEventListener('input', () => {
        charCount.textContent = bioInput.value.length;
    });
}
