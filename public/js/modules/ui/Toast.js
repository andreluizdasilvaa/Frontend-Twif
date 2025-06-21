// public/js/modules/utils/toast.js
export function toastSuccess(message, duration = 2000) {
    Toastify({
        text: message,
        duration: duration,
        gravity: "top",
        position: "right",
        backgroundColor: "#7EC543",
        stopOnFocus: true,
        style: {
            fontFamily: "'Lexend Deca', Arial, sans-serif"
        }
    }).showToast();
}

export function toastError(message, duration = 2000) {
    Toastify({
        text: message,
        duration: duration,
        gravity: "top",
        position: "right",
        backgroundColor: "#6B0000",
        stopOnFocus: true,
        style: {
            fontFamily: "'Lexend Deca', Arial, sans-serif"
        }
    }).showToast();
}

export function toastInfo(message, duration = 2000) {
    Toastify({
        text: message,
        duration: duration,
        gravity: "top",
        position: "right",
        backgroundColor: "#025648",
        stopOnFocus: true,
        style: {
            fontFamily: "'Lexend Deca', Arial, sans-serif"
        }
    }).showToast();
}