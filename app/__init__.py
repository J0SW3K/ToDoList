from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    
    db.init_app(app)
    
    from .routes.main import main
    from .routes.crud import crud
    app.register_blueprint(main)
    app.register_blueprint(crud)
    
    return app