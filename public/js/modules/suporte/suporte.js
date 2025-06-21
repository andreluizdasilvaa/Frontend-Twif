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
    document.querySelector('button').addEventListener('click', async (event) => {
        event.preventDefault();  // Evita o comportamento padrão de envio de formulário
        const description = document.getElementById('input-texto').value;

        // Verifique se todos os campos foram preenchidos
        if (!description) {
            toastInfo('Escreva alguma coisa antes de enviar!');
            return;
        } else if(description.length > 190) {
            toastInfo('Maximo de 190 caracteres!');
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
                window.location.href = "/";
            } else {
                toastError(result.msg || 'Ocorreu um erro, tente novamente mais tarde.');
            }
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            toastError('Erro ao enviar os dados. Tente novamente mais tarde.');
        }
    });
});