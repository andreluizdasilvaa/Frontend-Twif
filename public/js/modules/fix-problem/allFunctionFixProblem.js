import CONFIG from "../config.js";
import verifyErrorsApi from "../utils/verifyErrorsApi.js";

// Função para formatar a data
function formatarData(dataISO) {
  if (!dataISO) return 'Data indisponível';
  const data = new Date(dataISO);
  if (isNaN(data.getTime())) return 'Data inválida';
  return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function exibirProblemas() {
  const container = document.getElementById('problemas-container');
  container.innerHTML = ''; // Limpa o container antes

  fetch(`${CONFIG.URL_API}/suport/`, {
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
            <div>
              <strong>Nome: <span id="span-color-g">${pedido.nome}</span></strong>
            </div>
          </div>
          <blockquote class="mensagem">“${pedido.problema}”</blockquote>
          <footer class="data-report">
            Report enviado no dia ${formatarData(pedido.createdAt)}
            <button class="btn-responder" title="Responder">
              Marcar como visualizado
              <img src="../assets/img/replyemail.png" alt="Responder" />
            </button>
          </footer> 
        `;

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Erro ao exibir os problemas:', error);
      container.innerHTML = "<p>Erro ao carregar os problemas.</p>";
    });
}

