from pydantic import BaseModel

class FilmeUpdateSchema(BaseModel):
    titulo: str
    genero: str
    ano: int
    preco_aluguel: float
    total_copias: int
    copias_disponiveis: int

class FilmeCreateSchema(BaseModel):
    titulo: str
    genero: str
    ano: int
    preco_aluguel: float
    total_copias: int

class FilmeSchema(FilmeCreateSchema):
    id: int
    copias_disponiveis: int

    class Config:
        from_attributes = True

class InventarioUpdateSchema(BaseModel):
    acao: str  # "alugar" ou "devolver"
    quantidade: int = 1