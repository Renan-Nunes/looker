from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas.schemas_user import UserCreate, UserOut
from app.controllers import controller_user
from app.core.db_usuario import get_db

router = APIRouter()


@router.post("/", response_model=UserOut)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        return controller_user.create_user(db, user)
    except HTTPException as e:
        raise e


@router.get("/", response_model=List[UserOut])
def list_users(db: Session = Depends(get_db)):
    return controller_user.list_users(db)


@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = controller_user.obter_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user


@router.put("/{user_id}", response_model=UserOut)
def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    updated_user = controller_user.update_user(db, user_id, user)
    if not updated_user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado para atualização")
    return updated_user


@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    deleted_user = controller_user.delete_user(db, user_id)
    if not deleted_user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado para exclusão")
    return {"detail": "Usuário deletado com sucesso"}
