document.addEventListener("DOMContentLoaded", function () {

    const btnValidarEdad = document.getElementById("btnValidarEdad");
    btnValidarEdad.addEventListener("click", validarEdad);

});

const validarEdad = () => {

    var valor = document.getElementById('edadInput').value;
    var edad = parseInt(valor, 10);
    var salida = document.getElementById('resultado');

    if (isNaN(edad) || edad < 0) {
        salida.textContent = 'Por favor, ingresa una edad válida.';
        salida.className = 'text-danger';
        return;
    }

    if (edad > 18) {
        salida.textContent = 'Eres mayor de edad.';
        salida.className = 'text-success';
    } else {
        salida.textContent = 'Eres menor de edad.';
        salida.className = 'text-info';
    }
};