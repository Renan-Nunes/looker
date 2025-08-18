from sqlalchemy import Column, Integer, String, Float
from app.core.database import Base

class Filme(Base):
    __tablename__ = "filmes"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, index=True)
    genero = Column(String)
    ano = Column(Integer)
    preco_aluguel = Column(Float)
    total_copias = Column(Integer)
    copias_disponiveis = Column(Integer)