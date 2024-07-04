document.addEventListener('DOMContentLoaded', function() {
    let btnAgregar = document.getElementById('btnAgregar');
    let formularioAgregar = document.getElementById('formularioAgregar');

    btnAgregar.addEventListener('click', function() {
        formularioAgregar.style.display = 'block';
    });

    let tareas = document.querySelectorAll('.tarea');
    tareas.forEach(function(tarea) {
        let btnEliminar = tarea.querySelector('.btn-eliminar');

        tarea.addEventListener('mouseover', function() {
            btnEliminar.style.display = 'inline-block';
        });

        tarea.addEventListener('mouseleave', function() {
            btnEliminar.style.display = 'none';
        });

        btnEliminar.addEventListener('click', function() {
            let taskId = btnEliminar.dataset.taskId;
            eliminarTarea(taskId);
        });
    });

    function eliminarTarea(taskId) {
        fetch(`/eliminar-task/${taskId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ taskId: taskId })
        })
        .then(response => {
            if (response.ok) {
                let tarea = document.querySelector(`.tarea .nombre-tarea p[data-task-id="${taskId}"]`).closest('.tarea');
                tarea.remove();
            } else {
                console.error('Error al eliminar la tarea');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud fetch:', error);
        });
    }
});
