from pydantic import BaseModel, EmailStr
from datetime import date
from sqlalchemy import Enum


class RoleEnum(str, Enum):
    admin = "admin"
    user = "user"


class UserCreate(BaseModel):
    nome: str
    cpf: str
    email: EmailStr
    senha: str
    telefone: str | None = None
    data_nascimento: date | None = None
    role: RoleEnum = RoleEnum.user


class UserOut(BaseModel):
    id: int
    nome: str
    cpf: str
    email: EmailStr
    telefone: str | None
    data_nascimento: date | None
    role: RoleEnum

    class Config:
        orm_mode = True
