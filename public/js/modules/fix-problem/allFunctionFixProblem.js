import CONFIG from "../config.js";
import verifyErrorsApi from "../utils/verifyErrorsApi.js";

// Função para formatar a data
function formatarData(dataISO) {
  if (!dataISO) return 'Data indisponível';
  const data = new Date(dataISO);
  if (isNaN(data.getTime())) return 'Data inválida';
  return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Função para retornar ícone SVG conforme a categoria
function iconeCategoria(categoria) {
  if (!categoria) return '';
  if (categoria.toLowerCase() === 'bug') {
    // SVG bug
    return `<svg width="24" height="24" fill="none" stroke="#011214" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M19 7l-2 2M5 7l2 2M19 17l-2-2M5 17l2-2M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>`;
  }
  // SVG flag
  return `<svg width="24" height="24" fill="none" stroke="#011214" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22V4a2 2 0 0 1 2-2h14l-2 5 2 5H6"/></svg>`;
}

export default function exibirProblemas() {
  const container = document.getElementById('problemas-container');
  container.innerHTML = ''; // Limpa o container antes

  fetch(`${CONFIG.URL_API}/api/support`, {
    credentials: 'include'
  })
    .then(response => {
      if (!response.ok) {
        verifyErrorsApi(response);
        throw new Error('Erro ao buscar os problemas');
      }
      return response.json();
    })
    .then(data => {
      if (!data.length) {
        container.innerHTML = "<p>Nenhum problema encontrado.</p>";
        return;
      }

      data.forEach(pedido => {
        const card = document.createElement('div');
        card.className = 'card-problema';

        card.innerHTML = `
          <div class="header-card">
            <span class="icone-categoria">${iconeCategoria(pedido.categoria)}</span>
            <div>
              <strong>${pedido.nome}</strong>
              <span class="id-email">ID: ${pedido.id} ${pedido.email}</span>
              <div class="categoria">Categoria: ${pedido.categoria || 'Não informada'}</div>
            </div>
          </div>
          <blockquote class="mensagem">“${pedido.problema}”</blockquote>
          <footer class="data-report">Report enviado no dia ${formatarData(pedido.createdAt)}</footer>
          <button class="btn-responder" title="Responder">
            <img src="../assets/img/replyemail.png" alt="Responder" />
          </button>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Erro ao exibir os problemas:', error);
      container.innerHTML = "<p>Erro ao carregar os problemas.</p>";
    });
}

