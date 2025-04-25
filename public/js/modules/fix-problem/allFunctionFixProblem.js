// Função para buscar e definir o nome do usuário
async function buscarNomeUsuario() {
    try {
        const resposta = await fetch(`${CONFIG.URL_API}/user/me`, {
            method: 'GET',
            credentials: 'include'
            // headers: {
            //     'Authorization': `Bearer ${localStorage.getItem('token')}` // Inclua o token se necessário
            // }
        });
        const data = await resposta.json();

        if (data.nome) {
            localStorage.setItem('nomeUsuario', data.nome);
            document.getElementById('nome-usuario').textContent = data.nome;
            document.getElementById('link_pf_user_adm').href = `/perfil/${data.usernick}`;
        }
    } catch (error) {
        console.error('Erro ao buscar nome do usuário:', error);
    }
}

// Chama a função para buscar o nome do usuário ao carregar a página
buscarNomeUsuario();

// Função para buscar os problemas e criar os cards
async function listarProblemas() {
    try {
        const resposta = await fetch(`${CONFIG.URL_API}/suporte/supports`, {
            method: 'GET',
            credentials: 'include'
        });
        const problemas = await resposta.json();

        const container = document.getElementById('container-problemas');
        container.innerHTML = ''; // Limpa o container antes de adicionar

        problemas.forEach(problema => {
            // Criação do card
            const card = document.createElement('div');
            card.classList.add('card-problema');

            card.innerHTML = `
                <div class="topo-card">
                    <img src="../assets/img/${problema.categoria.toLowerCase() === 'bug' ? 'bug' : 'denuncia'}.png" width="25px">
                    <strong>${problema.nome}</strong> 
                    <span>ID: ${problema.email}</span>
                </div>
                <div class="detalhes-card">
                    <p><strong>Categoria:</strong> ${problema.categoria || 'Não especificada'}</p>
                    <blockquote>“${problema.problema}”</blockquote>
                    <small>Report enviado no dia ${new Date(problema.createdAt).toLocaleDateString('pt-BR')}</small>
                </div>
                <div class="icone-acoes">
                    <img src="../assets/img/mail-send.svg" width="30px">
                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error('Erro ao listar problemas:', error);
    }
}

// Chama também ao carregar a página
buscarNomeUsuario();
listarProblemas();
