import CONFIG from '../config.js';
import { toastError } from '../ui/Toast.js'

export default function loginForm() {
    const form = document.getElementById('formLogin');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const mail = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (
            !mail.toLowerCase().endsWith('@aluno.ifsp.edu.br') &&
            !mail.toLowerCase().endsWith('@ifsp.edu.br')
        ) {
            toastError('Use seu email institucional ...@aluno.ifsp.edu.br')
            return;
        }

        fetch(`${CONFIG.URL_API}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: mail, senha: password }),
            credentials: 'include'
        })
        .then(response => {
            if (response.statusText === 'Unauthorized') toastError('Credenciais inválidas');
            if (!response.ok) throw new Error('Erro no login');
            return response.json();
        })
        .then((data) => {
            data.redirect ? window.location.href = data.redirect : null
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
    });
}