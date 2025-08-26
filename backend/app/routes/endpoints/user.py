from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.db_usuario import SessionLocal
from schemas.schemas_user import userCreate, userOut
from controllers import controller_user

router = APIRouter(prefix="/users", tags=["Usuários"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=userOut)
def create_user(data: userCreate, db: Session = Depends(get_db)):
    return controller_user.create_user(db, data)


@router.get("/", response_model=list[userOut])
def list_users(db: Session = Depends(get_db)):
    return controller_user.list_users(db)


@router.get("/{user_id}", response_model=userOut)
def obter_user(user_id: int, db: Session = Depends(get_db)):
    user = controller_user.obter_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user


@router.put("/update/{user_id}", response_model=userOut)
def update_user(user_id: int, data: userCreate, db: Session = Depends(get_db)):
    user = controller_user.update_user(db, user_id, data)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user


@router.delete("/delete/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = controller_user.delete_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return {"message": "Usuário deletado com sucesso"}