import Swal from "sweetalert2";
export function alertaConfirmacion() {
    Swal.fire({
        title: "Bievenido",
        text: "Ha iniciado seción de forma correcta!",
        icon: "success"
    });
}
export function alertaError(titulo, mensaje, icono) {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono
    });
}
export function alertaRedireccion(redireccion, titulo, mensaje, icono, url) {
    let timerInterval;
    Swal.fire({
        title: titulo,
        html: mensaje,
        timer: 2000,
        icon: icono,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
            redireccion(url)
        }
    })
}
export function generarToken() {
    return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10)
}