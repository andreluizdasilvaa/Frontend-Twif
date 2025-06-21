import CONFIG from "../config.js";
import verifyErrorsApi from "../utils/verifyErrorsApi.js";
import { toastError, toastSuccess } from "../ui/Toast.js"; 

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
        container.innerHTML = "<p id='text_order-not-found'>Nenhum problema encontrado...</p>";
        return;
      }

      data.forEach(pedido => {
        const card = document.createElement('div');
        card.className = 'card-problema';

        card.innerHTML = `
          <div class="header-card">
            <div class="header-card-content">
              <strong>Nome: <span id="span-color-g">${pedido.nome}</span></strong>

              <div class="tooltip">
                <div class="icon">i</div>
                <div class="tooltiptext">O usuário que enviou esse report, ira saber quer vc visualizou clicando no botão abaixo.</div>
              </div>

            </div>
          </div>
          <blockquote class="mensagem">“${pedido.problema}”</blockquote>
          <footer class="data-report">
            Report enviado no dia ${formatarData(pedido.createdAt)}

            <div class="container-buttons-post">
              <button class="btn" id="btn-delete-report">
                <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
                  <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                </svg>
              </button>

              <button class="btn-responder" title="Responder" id="btn-mark-report">
                Marcar como visualizado
                <img src="../assets/img/replyemail.png" alt="Responder" />
              </button>
            </div>
            
          </footer> 
        `;

        // Adiciona eventListener para o botão de deletar
        card.querySelector('#btn-delete-report').addEventListener('click', async () => {
          try {
            const response = await fetch(`${CONFIG.URL_API}/suport/delete`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ orderId: pedido.id }),
              credentials: 'include',
            });
            if (response.ok) {
              card.remove();
              toastSuccess('Deletado com sucesso!');
            } else {
              toastError('Erro ao deletar o report.');
            }
          } catch (err) {
            toastError('Erro ao deletar o report.');
          }
        });

        // Adiciona eventListener para o botão de marcar como visualizado
        card.querySelector('#btn-mark-report').addEventListener('click', async () => {
          try {
            const response = await fetch(`${CONFIG.URL_API}/suport/mark/viewed`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ orderId: pedido.id }),
              credentials: 'include',
            });
            if (response.ok) {
              card.querySelector('#btn-mark-report').textContent = 'Visualizado';
              card.querySelector('#btn-mark-report').disabled = true;
              card.querySelector('#btn-delete-report').style.display = 'none'
              toastSuccess('Visualizado com sucesso!');
            } else {
              toastError('Erro ao marcar como visualizado.');
            }
          } catch (err) {
            toastError('Erro ao marcar como visualizado.');
          }
        });

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Erro ao exibir os problemas:', error);
      container.innerHTML = "<p>Erro ao carregar os problemas.</p>";
    });
}

