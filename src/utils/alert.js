import Swal from "sweetalert2";

export const alert = () => {
  Swal.fire({
    title: "Credenciales inválidas",
    text: "Introduzca credenciales válidas",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#FF452B",
    width: "500px",
    timer: 20000,
    timerProgressBar: true,
    toast: true,
  });
};
