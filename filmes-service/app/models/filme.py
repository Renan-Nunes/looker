from sqlalchemy import Column, Integer, String, Float, Text, Date
from app.core.database import Base

class Filme(Base):
    __tablename__ = "filmes"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, index=True)
    genero = Column(String)
    ano = Column(Integer)
    sinopse = Column(Text, nullable=True)
    imagem_url = Column(String(255), nullable=True)
    duracao_minutos = Column(Integer, nullable=True)
    elenco = Column(String(255), nullable=True)
    diretor = Column(String(100), nullable=True)
    classificacao_indicativa = Column(String(20), nullable=True)
    data_lancamento = Column(Date, nullable=True)
    preco_aluguel = Column(Float)
    total_copias = Column(Integer)
    copias_disponiveis = Column(Integer)