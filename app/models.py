from app import db

class Task(db.Model):
    __tablename__ = 'task'
    id_task = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(80), nullable=False)
    estado = db.Column(db.SMALLINT, nullable=False)

    def __repr__(self):
        return f'<Tarea {self.nombre}>'