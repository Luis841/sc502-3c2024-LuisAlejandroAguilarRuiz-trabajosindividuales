document.addEventListener("DOMContentLoaded", function () {

    const estudiantes = [
        { nombre: 'Ana', apellido: 'García', nota: 85 },
        { nombre: 'Luis', apellido: 'Pérez', nota: 72 },
        { nombre: 'María', apellido: 'López', nota: 94 },
        { nombre: 'Carlos', apellido: 'Ramírez', nota: 68 },
        { nombre: 'Sofía', apellido: 'Torres', nota: 77 }
    ];

    const lista = document.getElementById('listaEstudiantes');
    const promedioEl = document.getElementById('promedio');

    if (!lista || !promedioEl) return;

    let sumaNotas = 0;

    if (estudiantes.length === 0) {
        lista.innerHTML = '<div class="list-group-item">No hay estudiantes disponibles.</div>';
        promedioEl.textContent = '';
        return;
    }

    estudiantes.forEach(function (est) {
        const item = document.createElement('div');
        item.className = 'list-group-item';

        const nombreDiv = document.createElement('div');
        nombreDiv.textContent = est.nombre + ' ' + est.apellido;
        nombreDiv.style.fontWeight = '600';

        const notaDiv = document.createElement('div');
        notaDiv.textContent = 'Nota: ' + est.nota;
        notaDiv.className = 'text-muted';

        item.appendChild(nombreDiv);
        item.appendChild(notaDiv);
        lista.appendChild(item);

        sumaNotas += Number(est.nota) || 0;
    });

    const promedio = sumaNotas / estudiantes.length;
    promedioEl.textContent = 'Promedio de notas: ' + promedio.toFixed(2);

});