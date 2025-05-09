import submitEditarPerfil from './modules/editarperfil/submitEditarPerfil.js';
import contadorBio from './modules/editarperfil/contadorBio.js';
import dragDropFoto from './modules/editarperfil/dragDropFoto.js';
import modalAvatar from './modules/editarperfil/modalAvatar.js';

document.addEventListener('DOMContentLoaded', () => {
    submitEditarPerfil();
    contadorBio();
    dragDropFoto();
    modalAvatar();
});
