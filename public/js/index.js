import validateSession from "./modules/utils/checkSession.js";
import loginForm from "./modules/auth/loginHandler.js";
import acordionFeed from "./modules/ui/acordionFeed.js";
import textAnimationPulse from "./modules/ui/textAnimationPulse.js";
import checkUrlAlert from "./modules/utils/checkUrlAlerts.js";

document.addEventListener('DOMContentLoaded', () => {
    validateSession();
    loginForm();
    acordionFeed();
    textAnimationPulse();
    checkUrlAlert();
})