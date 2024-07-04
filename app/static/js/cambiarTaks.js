document.addEventListener('DOMContentLoaded', function() {
    var checkboxes = document.querySelectorAll('.estado input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            var taskId = this.dataset.taskId;
            toggleTaskState(taskId);
        });

        var tarea = checkbox.closest('.tarea');
        var pTag = tarea.querySelector('.nombre-tarea p');
        if (!checkbox.checked && pTag.style.textDecoration === 'line-through') {
            pTag.style.textDecoration = 'line-through';
        }
    });

    function toggleTaskState(taskId) {
        fetch(`/toggle-task/${taskId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ taskId: taskId })
        })
        .then(response => {
            if (response.ok) {
                var checkbox = document.querySelector(`.estado input[type="checkbox"][data-task-id="${taskId}"]`);
                var tarea = checkbox.closest('.tarea');
                var pTag = tarea.querySelector('.nombre-tarea p');
                if (checkbox.checked) {
                    pTag.style.textDecoration = 'none';
                } else {
                    pTag.style.textDecoration = 'line-through';
                }
            } else {
                console.error('Error al cambiar el estado de la tarea');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud fetch:', error);
        });
    }
});
