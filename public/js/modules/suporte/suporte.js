import CONFIG from "../config.js";
import { toastInfo, toastError, toastSuccess } from "../ui/Toast.js";

(async function validateSession() {
    // verifica se o usuario que entrou na pagina está logado para conseguir enviar sua msg no suporte
    const response = await fetch(`${CONFIG.URL_API}/auth/validate`, {
        credentials: 'include'
    })
    const result = await response.json();
    if(!result.isAuthenticated) {
        toastInfo('Você precisa está logado para enviar um suport');
        window.location.href = "/";
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('button');
    btn.addEventListener('click', async (event) => {
        event.preventDefault();  // Evita o comportamento padrão de envio de formulário
        btn.disabled = true;
        btn.style.opacity = '0.6';
        const description = document.getElementById('input-texto').value;

        // Verifique se todos os campos foram preenchidos
        if (!description) {
            toastInfo('Escreva alguma coisa antes de enviar!');
            btn.disabled = false;
            btn.style.opacity = '';
            return;
        } else if(description.length > 190) {
            toastInfo('Maximo de 190 caracteres!');
            btn.disabled = false;
            btn.style.opacity = '';
            return;
        }

        try {
            const response = await fetch(`${CONFIG.URL_API}/suport/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description }),
                credentials: 'include'
            });

            const result = await response.json();
            if (response.ok) {
                toastSuccess(result.msg);
                setTimeout(() => {
                    window.location.href = "/feed";
                }, 3000);
            } else {
                toastError(result.msg || 'Ocorreu um erro, tente novamente mais tarde.');
                btn.disabled = false;
                btn.style.opacity = '';
            }
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            toastError('Erro ao enviar os dados. Tente novamente mais tarde.');
            btn.disabled = false;
            btn.style.opacity = '';
        }
    });
});