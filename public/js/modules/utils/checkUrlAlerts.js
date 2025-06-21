import { toastError, toastSuccess } from "../ui/Toast.js";

export default function checkUrlAlert() {
    // Obtém os parâmetros da query string da URL
    const urlParams = new URLSearchParams(window.location.search);
    // grada a URL com as queryes
    const success = urlParams.get('success');
    const error = urlParams.get('error');

    switch (true) {
        case success === 'true':
            toastSuccess('Cadastrado com SUCESSO!');
            window.location.href = '/';
            break;

        case error === '1':
            toastError('Email ou Senha Incorreto!');
            window.location.href = '/';
            break;

        case error === '2':
            toastError('Senha Incorreta');
            window.location.href = '/';
            break;

        case error === '3':
            toastError('Faça Login para acessar!');
            window.location.href = '/';
            break;

        case error === '4':
            toastError('Sessão invalida!');
            window.location.href = '/';
            break;

        default:
            break;
    }
}