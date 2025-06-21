import CONFIG from '../config.js';
import { toastError, toastSuccess } from '../ui/Toast.js';

export default function registerForm() {
    var modal = document.getElementById("avatarModal");

    // Adiciona feedback visual ao corrigir erro nos inputs
    const camposComErro = ['nome', 'email', 'user', 'senha', 'nascimento'];
    camposComErro.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', function() {
                input.style.border = '0.15em solid #000000';
            });
        }
    });

    // Verificar se os campos estão preenchidos antes de abrir o modal
    document.getElementById('botao-cadastrar').addEventListener('click', async function(event) {
        event.preventDefault();

        var nome = document.getElementById('nome').value;
        var email = document.getElementById('email').value;
        var usernick = document.getElementById('user').value;
        var senha = document.getElementById('senha').value;
        var nascimento = document.getElementById('nascimento').value;
        var curso = document.getElementById('curso').value;

        if (!nome || !email || !usernick || !senha) {
            toastError('Por favor, preencha todos os campos obrigatórios antes de prosseguir.');
            return;
        }

        if (
            !email.toLowerCase().endsWith('@aluno.ifsp.edu.br') &&
            !email.toLowerCase().endsWith('@ifsp.edu.br')
        ) {
            toastError('Use seu email institucional ...@aluno.ifsp.edu.br')
            return;
        }
        
        const resEmail = await fetch(`${CONFIG.URL_API}/auth/validate-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        if (!resEmail.ok) {
            toastError('Email já cadastrado');
            document.getElementById('email').style.border = '0.15em solid red';
            return;
        }
        document.getElementById('email').style.border = '0.15em solid #000000';

        const resUsernick = await fetch(`${CONFIG.URL_API}/auth/validate-usernick`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usernick })
        });
        
        if (!resUsernick.ok) {
            toastError('Usernick não disponível');
            document.getElementById('user').style.border = '0.15em solid red';
            return; // Agora sim, para toda a função!
        }
        document.getElementById('user').style.border = '0.15em solid #000000';
        

        if (nascimento) {
            const hoje = new Date();
            const nascimentoDate = new Date(nascimento);
            hoje.setHours(0,0,0,0);
            nascimentoDate.setHours(0,0,0,0);
            if (nascimentoDate > hoje) {
                toastError('A data de nascimento não pode ser maior que hoje.');
                document.getElementById('nascimento').style.border = '0.15em solid red';
                return;
            }
            document.getElementById('nascimento').style.border = '0.15em solid #000000';
        }
        
        
        modal.style.display = 'block';
        document.getElementById('salvar-avatar').addEventListener('click', (event) => {
            event.preventDefault();
            const profilePicture = document.getElementById('avatar-escolhido').value;

            fetch(`${CONFIG.URL_API}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    senha: senha,
                    usernick: usernick,
                    nome: nome,
                    profilePicture: profilePicture,
                    nascimento: nascimento,
                    curso: curso
                }),
                credentials: 'include'
            })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.msg || 'Erro ao registrar');
                    });
                };
                return response.json();
            })
            .then(data => {
                // fazer um melhor tratamento!
                toastSuccess('Cadastro realizado com sucesso! Bem-vindo(a), ' + nome + '!');
                window.location.href = '/feed';
            })
            .catch(error => {
                console.error('Erro:', error);
                toastError('Erro ao enviar formulário: ' + error.message);
            });
        });
    });
};