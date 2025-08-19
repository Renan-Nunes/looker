from datetime import date
from pydantic import BaseModel, EmailStr, validator
from app.models.models_user import RoleEnum


class UserDTO(BaseModel):
    nome: str
    cpf: str
    email: EmailStr
    senha: str
    telefone: str | None = None
    data_nascimento: date | None = None
    role: RoleEnum = RoleEnum.user
    

    @validator("cpf")
    def validate_cpf(cls, value):
        if not value.isdigit() or len(value) != 11:
            raise ValueError("CPF inválido. Deve conter 11 dígitos.")
        return value
