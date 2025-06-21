(function() {
    const darkModeKey = 'dark-mode';
    const isDarkMode = localStorage.getItem(darkModeKey) === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('logo').src = "../../assets/img/logo-white.svg";
        document.getElementById('relatar').style.border = '2px solid #7EC543'
    }
})();