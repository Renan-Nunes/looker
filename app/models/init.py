from app.core.db_usuario import Base, engine
from app.models.models_user import User

def criar_tabelas():
    Base.metadata.create_all(bind=engine)
