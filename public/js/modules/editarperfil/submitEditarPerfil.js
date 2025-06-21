import { toastError, toastSuccess } from "../ui/Toast";

export default function submitEditarPerfil() {
    const form = document.getElementById('formPerfil');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
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
            toastSuccess('Perfil atualizado com sucesso!');
            
            // Redireciona para o perfil do usuário usando o usernick retornado
            if (resultado.user && resultado.user.usernick) {
                window.location.href = `/perfil/${resultado.user.usernick}`;
            } else {
                // Fallback caso não tenha usernick na resposta
                window.location.href = '/feed';
            }
        } catch (err) {
            console.error("Erro:", err);
            toastError(err.message);
        }
    });
}