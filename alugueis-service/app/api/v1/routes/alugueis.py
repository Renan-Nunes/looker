from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.aluguel import AluguelCreateSchema, AluguelSchema
from app.services.aluguel_service import AluguelService
from app.core.database import get_db
from app.core.security import User, get_current_user

router = APIRouter()
aluguel_service = AluguelService()

@router.post("/", response_model=AluguelSchema, status_code=201)
def create_aluguel(
    aluguel: AluguelCreateSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        db_aluguel = aluguel_service.create(db=db, aluguel=aluguel, usuario_id=current_user.id)
        return db_aluguel
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ConnectionError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ocorreu um erro inesperado: {e}")

@router.post("/{aluguel_id}/devolucao", response_model=AluguelSchema)
def processar_devolucao(
        aluguel_id: int,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    try:
        db_aluguel = aluguel_service.get_by_id(db=db, aluguel_id=aluguel_id)
        if db_aluguel is None:
            raise HTTPException(status_code=404, detail="Aluguel não encontrado.")

        is_admin = current_user.role == "ADMIN"
        is_owner = db_aluguel.usuario_id == current_user.id

        if not is_admin and not is_owner:
            raise HTTPException(status_code=403, detail="Permissão negada.")

        aluguel_devolvido = aluguel_service.processar_devolucao(db=db, aluguel_id=aluguel_id)
        return aluguel_devolvido
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except ConnectionError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ocorreu um erro inesperado: {e}")


@router.get("/", response_model=List[AluguelSchema])
def get_alugueis_por_usuario(usuario_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    alugueis = aluguel_service.get_by_usuario(db=db, usuario_id=current_user.id)
    return alugueis