// public/js/modules/utils/toast.js
export function toastSuccess(message, duration = 2000) {
    Toastify({
        text: message,
        duration: duration,
        gravity: "top",
        position: "right",
        backgroundColor: "#4BB543",
        stopOnFocus: true,
    }).showToast();
}

export function toastError(message, duration = 2000) {
    Toastify({
        text: message,
        duration: duration,
        gravity: "top",
        position: "right",
        backgroundColor: "#FF3333",
        stopOnFocus: true,
    }).showToast();
}

export function toastInfo(message, duration = 2000) {
    Toastify({
        text: message,
        duration: duration,
        gravity: "top",
        position: "right",
        backgroundColor: "#3498db",
        stopOnFocus: true,
    }).showToast();
}