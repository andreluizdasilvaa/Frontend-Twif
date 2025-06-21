export function applyFilesPostButtonStyle() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const interactionPost = document.querySelectorAll('button.filesPost');
    interactionPost.forEach(btn => {
        btn.style.color = isDarkMode ? '#d1d1d1' : '';
    });
}

export default function darkModeFeed() {
    const body = document.body;
    const logoHeader = document.getElementById('logo_header');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeKey = 'dark-mode';
    const lampIcon = document.getElementById('lampIcon'); // Referência ao ícone da lâmpada
    const toggleText = darkModeToggle.querySelector('span'); // Referência ao texto do toggle
    const botãoSubmitPost = document.getElementById('botao');
    const interactionPost = document.querySelectorAll('button.filesPost');

    // Função para alternar entre o modo claro e escuro
    function toggleDarkMode() {
        const isDarkMode = body.classList.toggle('dark-mode');
        
        // Atualiza a logo com base no modo
        logoHeader.src = isDarkMode ? '../assets/img/logo-white.svg' : '../assets/img/logo-dark.svg'; // Muda a logo
        
        // Armazena a preferência
        localStorage.setItem(darkModeKey, isDarkMode); 

        // Atualiza a cor do ícone da lâmpada
        lampIcon.setAttribute("fill", isDarkMode ? "#011214" : "#7ec543"); // Lâmpada apagada no modo escuro e acesa no modo claro

        // Atualiza o texto do toggle
        toggleText.textContent = isDarkMode ? "Modo Claro" : "Modo Escuro"; // Troca o texto

        applyFilesPostButtonStyle();
    }

    // Função para aplicar o tema ao carregar a página
    function applyStoredTheme() {
        const isDarkMode = localStorage.getItem(darkModeKey) === 'true';
        
        // Aplica o tema armazenado
        if (isDarkMode) {
            botãoSubmitPost.style.border = '1px solid #7EC543';
            interactionPost.forEach(btn => {
                btn.style.color = '#ffffff'
            })
            body.classList.add('dark-mode');
            logoHeader.src = '../assets/img/logo-white.svg'; // Logo branca
            lampIcon.setAttribute("fill", "#011214"); // Lâmpada apagada no modo escuro
            toggleText.textContent = "Modo Claro"; // Texto inicial para modo escuro
        } else {
            logoHeader.src = '../assets/img/logo-dark.svg'; // Logo colorida como padrão
            lampIcon.setAttribute("fill", "#7ec543"); // Lâmpada acesa no modo claro
            toggleText.textContent = "Modo Escuro"; // Texto inicial para modo claro
        }

        applyFilesPostButtonStyle();
    }

    // Chama a função para aplicar o tema ao carregar a página
    applyStoredTheme();

    // Adiciona um event listener para alternar o modo ao clicar na lâmpada
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
}