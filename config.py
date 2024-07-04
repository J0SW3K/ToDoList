class Config:
    usuario = 'root'
    password = 'contra123'
    bd = 'to_do_list'
    SECRET_KEY = '5791628bb0b13ce0c676dfde280ba245'
    SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{usuario}:{password}@localhost/{bd}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False