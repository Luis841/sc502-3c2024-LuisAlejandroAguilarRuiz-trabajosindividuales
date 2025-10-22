document.addEventListener("DOMContentLoaded", function () {

    const btnModificarParrafo = document.getElementById("btnCambiarParrafo");
    btnModificarParrafo.addEventListener("click", cambiarTextoParrafo);

});

const cambiarTextoParrafo = () => {
    
    document.getElementById('btnCambiarParrafo').addEventListener('click', function () {
        document.getElementById('txtParrafo').textContent = 'El contenido ha sido cambiado.';
    })
};