# Frontend-Twif

## Visão Geral
O Frontend-Twif é uma aplicação web desenvolvida para promover a interação entre alunos e administradores do IFSP, permitindo o compartilhamento de posts, comentários, gerenciamento de perfis, relatórios estatísticos e suporte ao usuário. O projeto utiliza tecnologias modernas de frontend e backend, com foco em usabilidade, acessibilidade e integração com APIs REST.

## Funcionalidades Principais
- **Feed de Posts:** Visualização, curtidas e comentários em posts de usuários.
- **Cadastro e Login:** Validação de e-mail institucional, verificação de unicidade de usuário e autenticação.
- **Perfil do Usuário:** Visualização e edição de informações, foto de perfil, bio, curso e data de nascimento.
- **Relatórios Administrativos:** Estatísticas de uso, gráficos de distribuição de usuários, médias de curtidas e comentários.
- **Suporte:** Formulário para relato de problemas, com feedback visual.
- **Modo Escuro/Claro:** Alternância de tema com persistência da preferência do usuário.
- **Acessibilidade:** Navegação intuitiva, botões de voltar ao topo e feedbacks visuais.

## Estrutura do Projeto
```
public/
  assets/         # Imagens, ícones, fontes e fotos de perfil
  css/            # Estilos principais e utilitários (inclui responsividade)
  html/           # Páginas HTML (feed, perfil, suporte, relatórios, etc.)
  js/             # Scripts JavaScript organizados por módulos e funcionalidades
    modules/
      auth/       # Autenticação e registro
      feed/       # Feed, posts, comentários, modal hamburguer
      perfil/     # Perfil do usuário, posts do perfil
      relatorio/  # Funções de relatórios administrativos
      suporte/    # Suporte ao usuário
      ui/         # Utilidades de interface (dark mode, voltar ao topo, etc.)
      utils/      # Funções utilitárias
server.js         # Servidor Express para servir arquivos estáticos e rotas
package.json      # Dependências e scripts do projeto
README.md         # Documentação do projeto
```

## Tecnologias Utilizadas
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **APIs:** Integração com endpoints REST para autenticação, feed, perfil, relatórios, etc.
- **Bibliotecas:**
  - [Toastify](https://apvarun.github.io/toastify-js/) para notificações
  - [Chart.js](https://www.chartjs.org/) para gráficos estatísticos
  - [DOMPurify](https://github.com/cure53/DOMPurify) para sanitização de entradas
  - [FontAwesome](https://fontawesome.com/) para ícones

## Como Executar o Projeto
1. **Pré-requisitos:**
   - Node.js instalado
2. **Instalação:**
   - Clone o repositório
   - Instale as dependências com `npm install`
3. **Execução:**
   - Inicie o servidor com `node server.js`
   - Acesse `http://localhost:3000` (ou porta definida no `.env`)
4. **Estrutura de Rotas:**
   - `/` — Página inicial
   - `/register` — Cadastro de usuário
   - `/feed` — Feed de posts
   - `/perfil/:usernick` — Perfil do usuário
   - `/relatorios` — Relatórios administrativos (acesso restrito)
   - `/suporte` — Página de suporte
   - Outras páginas: `/sobrenos`, `/fix-problem`, `/editarperfil`, `/comments`, etc.

## Detalhes de Implementação
- **Validação de E-mail:** Apenas e-mails institucionais são aceitos no cadastro.
- **Autenticação:** Sessão via cookies, com rotas protegidas para administradores.
- **Posts e Comentários:** CRUD de posts, likes, comentários e ordenação por data.
- **Relatórios:** Estatísticas de posts, usuários, curtidas e comentários, com gráficos dinâmicos.
- **Modo Escuro/Claro:** Preferência salva no `localStorage`.
- **Responsividade:** Layout adaptado para dispositivos móveis e desktop.

---

**Autores:** André Luiz, Erick Castilho, Geovana Barbosa e Silda Pereira.