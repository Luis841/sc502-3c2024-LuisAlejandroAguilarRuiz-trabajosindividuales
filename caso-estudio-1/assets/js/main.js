const btnRegistrar = document.getElementById("btnRegistrar");
const txtNota = document.getElementById("txtNota");
const txtNombre = document.getElementById("txtNombre");
const txtApellido = document.getElementById("txtApellido");
const formRegistro = document.getElementById("formRegistro");
const tbEstudiantesBody = document.getElementById("tbEstudiantesBody");
const txtNotaAlta = document.getElementById("txtNotaAlta");
const txtNotaBaja = document.getElementById("txtNotaBaja");
const txtPromedio = document.getElementById("txtPromedio");

document.addEventListener("DOMContentLoaded", () => {

    txtNota.addEventListener("input", validarNota);

    formRegistro.addEventListener("submit", registrarNota);

    cargarEstudiantes();
});

const validarNota = (event) => {

    const nota = parseInt(event.target.value);

    if (nota < 0) {

        // Alerta de SweetAlert2
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La nota no puede ser menor que 0',
            confirmButtonColor: '#3085d6'
        });

        btnRegistrar.setAttribute("disabled", "true");

    } else if (nota > 100) {

        // Alerta de SweetAlert2
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La nota no puede ser mayor que 100',
            confirmButtonColor: '#3085d6'
        });

        btnRegistrar.setAttribute("disabled", "true");

    } else {

        btnRegistrar.removeAttribute("disabled");

    }

}

const registrarNota = async (event) => {
    event.preventDefault();

    const nombre = String(txtNombre.value);
    const apellido = String(txtApellido.value);
    const nota = parseInt(txtNota.value);

    const key = `estudiante_${nombre.toLowerCase()}_${apellido.toLowerCase()}`;
    const estudianteExiste = localStorage.getItem(key);

    if (estudianteExiste) {
        const { isConfirmed } = await Swal.fire({
            icon: 'warning',
            title: 'Estudiante Existente',
            text: `¿Desea actualizar la nota de ${nombre} ${apellido}?`,
            showCancelButton: true,
            confirmButtonText: 'Sí, actualizar',
            cancelButtonText: 'No, cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        });

        if (!isConfirmed) return;
    }

    const estudiante = JSON.stringify({ nombre, apellido, nota });
    localStorage.setItem(key, estudiante);

    await Swal.fire({
        icon: estudianteExiste ? 'warning' : 'success',
        title: estudianteExiste ? 'Actualización Exitosa' : 'Registro Exitoso',
        text: estudianteExiste
            ? `La nota de ${nombre} ${apellido} ha sido actualizada`
            : 'La nota ha sido registrada correctamente',
        confirmButtonColor: '#3085d6'
    });

    cargarEstudiantes();
    formRegistro.reset();

};

const cargarEstudiantes = () => {

    tbEstudiantesBody.innerHTML = "";
    let notaAlta = 0;
    let notaBaja = 0;
    let sumaNotas = 0;
    let cantidadNotas = 0;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("estudiante_")) {
            const estudiante = JSON.parse(localStorage.getItem(key));
            agregarEstudianteATabla(estudiante);

            if (i === 0) {
                notaAlta = estudiante.nota;
                notaBaja = estudiante.nota;
            }

            if (estudiante.nota > notaAlta) {
                notaAlta = estudiante.nota;
            }

            if (estudiante.nota < notaBaja) { 
                notaBaja = estudiante.nota;
            }

            sumaNotas += estudiante.nota;
            cantidadNotas += 1;

        }
    }

    const promedio = cantidadNotas > 0 ? (sumaNotas / cantidadNotas).toFixed(2) : 0;

    txtNotaAlta.textContent = notaAlta;
    txtNotaBaja.textContent = notaBaja;
    txtPromedio.textContent = promedio;
}

const agregarEstudianteATabla = (estudiante) => {

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${estudiante.nombre}</td>
        <td>${estudiante.apellido}</td>
        <td>${estudiante.nota}</td>
        <td>
            <button class="btn-eliminar btn btn-danger btn-sm" data-key="estudiante_${estudiante.nombre.toLowerCase()}_${estudiante.apellido.toLowerCase()}">
                Eliminar
            </button>
        </td>
    `;

    const btnEliminar = row.querySelector('.btn-eliminar');
    btnEliminar.addEventListener('click', () => {
        const key = btnEliminar.dataset.key;
        eliminarEstudiante(key);
    });

    tbEstudiantesBody.appendChild(row);
}

const eliminarEstudiante = async (key) => {

    const estudiante = JSON.parse(localStorage.getItem(key));
    const { nombre, apellido } = estudiante;

    const { isConfirmed } = await Swal.fire({
        icon: 'warning',
        title: 'Eliminar Estudiante',
        text: `¿Está seguro de que desea eliminar a ${nombre} ${apellido}?`,
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
    });

    if (!isConfirmed) return;

    localStorage.removeItem(key);

    await Swal.fire({
        icon: 'success',
        title: 'Eliminación Exitosa',
        text: `El estudiante ${nombre} ${apellido} ha sido eliminado`,
        confirmButtonColor: '#3085d6'
    });

    cargarEstudiantes();
}