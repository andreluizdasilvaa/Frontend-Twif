document.getElementById('formPerfil').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const dados = {
        usernick: document.getElementById('usernick').value,
        nome: document.getElementById('nome').value,
        nascimento: document.getElementById('nascimento').value,
        course: document.getElementById('course').value,
        profilePicture: document.getElementById('profilePicture').value,
        bio: document.getElementById('bio').value
    };

    try {
        const resposta = await fetch('http://localhost:3000/editar/usuario/editar', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(dados)
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.message || 'Erro ao atualizar');
        }

        const resultado = await resposta.json();
        alert('Perfil atualizado com sucesso!');
        // window.location.href = '/perfil.html'; // Redireciona se quiser
    } catch (err) {
        console.error("Erro:", err);
        alert(err.message);
    }
});

// Contador de caracteres da biografia
document.getElementById('bio').addEventListener('input', function() {
    const count = this.value.length;
    document.getElementById('char-count').textContent = count;
});

// Drag & Drop para fotos
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('profilePicture');

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
    // Aqui você pode adicionar pré-visualização da imagem
});

// Seletor dos elementos 
const trocaPerfilBtn = document.getElementById('troca_perfil');
const avatarModal = document.getElementById('avatarModal');
const closeModal = document.querySelector('.close');
const avatarButtons = document.querySelectorAll('.avatar-button');
const avatarEscolhidoInput = document.getElementById('avatar-escolhido');
const salvarAvatarBtn = document.getElementById('salvar-avatar');

// Exibir o modal ao clicar no ícone de troca de perfil
trocaPerfilBtn.addEventListener('click', () => {
    avatarModal.style.display = 'block';
});

// Fechar o modal ao clicar no "X"
closeModal.addEventListener('click', () => {
    avatarModal.style.display = 'none';
});

// Alterar o avatar ao clicar em uma opção
avatarButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const avatarSrc = event.currentTarget.querySelector('img').src;


        // Atualiza o campo com a URL da imagem
        avatarEscolhidoInput.value = avatarSrc;

        // Atualizar a imagem do perfil na página
        document.querySelector('.foto-perfil-usuario img').src = avatarSrc;

        // ❗ Novo: remover 'selecionado' de todos
        avatarButtons.forEach(btn => btn.classList.remove('selecionado'));

        // ❗ Novo: adicionar 'selecionado' no clicado
        button.classList.add('selecionado');
    });
});

// Salvar e ir para login (aqui você pode adicionar o código de salvamento no servidor)
salvarAvatarBtn.addEventListener('click', (event) => {
    alert('Avatar salvo e você será redirecionado!');
    avatarModal.style.display = 'none';
});

// Fechar modal ao clicar fora da área do conteúdo
window.addEventListener('click', (event) => {
    if (event.target === avatarModal) {
        avatarModal.style.display = 'none';
    }
});
