import { toastSuccess } from "../ui/Toast";

export default function modalAvatar() {
    const trocaPerfilBtn = document.getElementById('troca_perfil');
    const avatarModal = document.getElementById('avatarModal');
    const closeModal = document.querySelector('.close');
    const avatarButtons = document.querySelectorAll('.avatar-button');
    const avatarEscolhidoInput = document.getElementById('avatar-escolhido');
    const salvarAvatarBtn = document.getElementById('salvar-avatar');

    if (!trocaPerfilBtn || !avatarModal || !closeModal || !avatarEscolhidoInput || !salvarAvatarBtn) return;

    // Abrir modal
    trocaPerfilBtn.addEventListener('click', () => {
        avatarModal.style.display = 'block';
    });

    // Fechar modal ao clicar no X
    closeModal.addEventListener('click', () => {
        avatarModal.style.display = 'none';
    });

    // Selecionar avatar
    avatarButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const avatarSrc = event.currentTarget.querySelector('img').src;

            avatarEscolhidoInput.value = avatarSrc;
            document.querySelector('.foto-perfil-usuario img').src = avatarSrc;

            avatarButtons.forEach(btn => btn.classList.remove('selecionado'));
            button.classList.add('selecionado');
        });
    });

    // Salvar avatar
    salvarAvatarBtn.addEventListener('click', () => {
        toastSuccess('Avatar salvo e você será redirecionado!');
        avatarModal.style.display = 'none';
    });

    // Fechar ao clicar fora do modal
    window.addEventListener('click', (event) => {
        if (event.target === avatarModal) {
            avatarModal.style.display = 'none';
        }
    });
}
