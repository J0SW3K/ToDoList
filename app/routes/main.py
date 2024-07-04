from flask import Blueprint, render_template
from app.models import Task

main = Blueprint('main', __name__)

@main.route('/')
def index():
    tasks = Task.query.order_by(Task.estado.desc()).all()
    return render_template('index.html', tasks=tasks)
