import CONFIG from "../config.js";

const validateSession = async (URL) => {
    const response = await fetch(`${CONFIG.URL_API}/auth/validate`, {
        credentials: 'include'
    })
    const result = await response.json();
    if(result.isAuthenticated) {
        if(URL) {
            window.location.href = String(URL);
            return;
        }
        window.location.href = "/feed";
    } 
};

export default validateSession;