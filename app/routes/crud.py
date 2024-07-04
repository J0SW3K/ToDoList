from flask import Blueprint, render_template, redirect, url_for, request, jsonify
from app import db
from app.models import Task

crud = Blueprint('crud', __name__)

@crud.route('/agregar-task', methods=['GET', 'POST'])
def agregarTask():
    if request.method == 'POST':
        
        task = Task(
            nombre=request.form['nombre'],
            estado=1
        )

        db.session.add(task)
        db.session.commit()
    return redirect(url_for('main.index'))

@crud.route('/toggle-task/<int:id_task>', methods=['POST'])
def toggleTask(id_task):
    task = Task.query.get_or_404(id_task)

    # Cambia el estado de la tarea
    if task.estado == 1:
        task.estado = 0
    else:
        task.estado = 1

    db.session.commit()

    return redirect(url_for('main.index'))

@crud.route('/eliminar-task/<int:task_id>', methods=['POST'])
def eliminar_tarea(task_id):
    try:
        tarea = Task.query.get(task_id)
        if tarea:
            db.session.delete(tarea)
            db.session.commit()
            return jsonify({'message': 'Tarea eliminada correctamente'}), 200
        else:
            return jsonify({'error': 'No se encontró la tarea'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500