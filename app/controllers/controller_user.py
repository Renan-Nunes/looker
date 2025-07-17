from sqlalchemy.orm import Session
from models.usuario_model import Usuario
from schemas.usuario_schema import UsuarioCreate

def criar_usuario(db: Session, dados: UsuarioCreate):
    novo_usuario = Usuario(**dados.dict())
    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)
    return novo_usuario

def listar_usuarios(db: Session):
    return db.query(Usuario).all()

def obter_usuario(db: Session, usuario_id: int):
    return db.query(Usuario).filter(Usuario.id == usuario_id).first()

def atualizar_usuario(db: Session, usuario_id: int, dados: UsuarioCreate):
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if usuario:
        for campo, valor in dados.dict().items():
            setattr(usuario, campo, valor)
        db.commit()
        db.refresh(usuario)
    return usuario

def deletar_usuario(db: Session, usuario_id: int):
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if usuario:
        db.delete(usuario)
        db.commit()
    return usuario