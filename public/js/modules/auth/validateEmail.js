export default function validateEmailOnBlur() {
    const emailInput = document.getElementById('email');

    emailInput.addEventListener('blur', async () => {
        const email = emailInput.value.trim();
        if (!email) return;

        try {
            const response = await fetch('http://localhost:3000/auth/validar-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email }),
                credentials: 'include'
            });

            const data = await response.json();

            if (!data.valido) {
                showEmailWarning(data.msg);
            } else {
                removeEmailWarning();
            }
        } catch (error) {
            console.error('Erro ao validar email:', error);
            showEmailWarning('Erro ao verificar o email. Tente novamente.');
        }
    });

    function showEmailWarning(message) {
        let warning = document.getElementById('email-warning');
        if (!warning) {
            warning = document.createElement('p');
            warning.id = 'email-warning';
            warning.style.color = 'red';
            warning.style.marginTop = '5px';
            warning.style.fontSize = '0.9rem';
            emailInput.parentNode.appendChild(warning);
        }
        warning.textContent = message;
    }

    function removeEmailWarning() {
        const warning = document.getElementById('email-warning');
        if (warning) {
            warning.remove();
        }
    }
}
