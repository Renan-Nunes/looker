from sqlalchemy.orm import Session
from models.models_user import User
from schemas.schemas_user import userCreate

def create_user(db: Session, data: userCreate):
    new_user = User(**data.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def list_users(db: Session):
    return db.query(User).all()

def obter_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def update_user(db: Session, user_id: int, data: userCreate):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        for campo, valor in data.dict().items():
            setattr(user, campo, valor)
        db.commit()
        db.refresh(user)
    return user

def deletar_usuario(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
    return user