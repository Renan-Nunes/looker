from sqlalchemy import Column, Integer, String, Date
from core.db_usuario import Base

class User(Base):
    __tablename__ = "usuario"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    cpf = Column(String(11), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    senha = Column(String(255), nullable=False)
    telefone = Column(String(20))
    data_nascimento = Column(Date)
