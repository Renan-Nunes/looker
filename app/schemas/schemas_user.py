from pydantic import BaseModel, EmailStr
from datetime import date

class UsuarioCreate(BaseModel):
    nome: str
    cpf: str
    email: EmailStr
    senha: str
    telefone: str | None = None
    data_nascimento: date | None = None

class UsuarioOut(BaseModel):
    id: int
    nome: str
    cpf: str
    email: EmailStr
    telefone: str | None
    data_nascimento: date | None

    class Config:
        orm_mode = True
