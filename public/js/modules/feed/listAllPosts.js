import CONFIG from '../config.js';
import likedPost from './likedPostOrNot.js';
import commentPost from './commentPost.js';
import verifyErrorsApi from "../utils/verifyErrorsApi.js";

let currentPage = 1;
const limit = 5; // 5 posts por página (ajuste conforme necessário)

export default function listAllPost() {
    loadPosts(currentPage);
    setupLoadMoreButton();
}

function loadPosts(page) {
    fetch(`${CONFIG.URL_API}/feed/posts?page=${page}&limit=${limit}`, {
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            verifyErrorsApi(response);
            throw new Error('Erro ao carregar posts');
        }
        return response.json();
    })
    .then(data => {
        const postsList = document.getElementById('posts');
        
        // Limpa apenas na primeira página
        if (page === 1) {
            postsList.innerHTML = '';
        }

        if (data.posts && data.posts.length > 0) {
            data.posts.forEach(post => {
                const postElement = createPostElement(post);
                postsList.appendChild(postElement);
                
                // Mantém as funções originais de like e comentário
                likedPost(post, postElement);
                commentPost(postElement);
            });
            
            currentPage = page;
            updateLoadMoreButton(data.totalPages);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

// Função que mantém SEU LAYOUT ORIGINAL
function createPostElement(post) {
    const postElement = document.createElement('li');
    postElement.dataset.postId = post.id;
    postElement.classList.add('post');

    postElement.innerHTML = `
        <div class="infoUserPost">
            <div class="imgUserPost">
                <img src="../assets/profile-pictures/${post.user.profilePicture}" alt="">
            </div>
            <div class="nameAndHour">
                <strong>
                    <a href="/perfil/${post.user.usernick}" class="user-profile-link">
                        ${post.user.nome} <span id="userNick">@${post.user.usernick}</span>
                    </a>
                </strong>
                <p>${new Date(post.createdAt).toLocaleTimeString()}</p>
            </div>
        </div>
        <p>${post.content}</p>
        <div class="actionBtnPost">
            <div class="content_metric">
                <p class="number_like">${post.likes.length}</p>
                <button type="button" class="filesPost like" data-post-id="${post.id}">
                    <i class="ph-bold ph-heart likeFalse"></i>
                    <i style="display: none;" class="ph-fill ph-heart likeTrue"></i>
                </button>
            </div>
            <div class="content_metric">
                <p class="number_coments">${post.comments.length}</p>
                <button type="button" class="filesPost comment">
                    <i class="ph-bold ph-chat-circle"></i>
                </button>
            </div>
        </div>
    `;

    // Remove as animações de loading (mantém igual ao seu código original)
    const nameAndHour = postElement.querySelector('.nameAndHour');
    const imgUserPost = postElement.querySelector('.imgUserPost');
    const contentPostLoading = postElement.querySelector('.content_post_loading');
    
    if (nameAndHour) nameAndHour.style.animation = 'none';
    if (imgUserPost) imgUserPost.style.animation = 'none';
    if (contentPostLoading) contentPostLoading.style.animation = 'none';

    return postElement;
}

// Configura o botão "Carregar Mais"
function setupLoadMoreButton() {
    const existingBtn = document.getElementById('loadMoreBtn');
    if (!existingBtn) {
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.id = 'loadMoreBtn';
        loadMoreBtn.textContent = 'Carregar Mais Posts';
        loadMoreBtn.className = 'load-more-btn';
        loadMoreBtn.addEventListener('click', () => {
            loadMoreBtn.disabled = true;
            loadMoreBtn.textContent = 'Carregando...';
            loadPosts(currentPage + 1);
        });
        
        // Adiciona o botão após a lista de posts
        document.querySelector('main').appendChild(loadMoreBtn);
    }
}

// Atualiza o botão conforme a paginação
function updateLoadMoreButton(totalPages) {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        if (currentPage < totalPages) {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.disabled = false;
            loadMoreBtn.textContent = 'Carregar Mais Posts';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
}