from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.aluguel import AluguelCreateSchema, AluguelSchema
from app.services.aluguel_service import AluguelService
from app.core.database import get_db

router = APIRouter()
aluguel_service = AluguelService()

@router.post("/", response_model=AluguelSchema, status_code=201)
def create_aluguel(aluguel: AluguelCreateSchema, db: Session = Depends(get_db)):
    try:
        db_aluguel = aluguel_service.create(db=db, aluguel=aluguel)
        return db_aluguel
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ConnectionError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ocorreu um erro inesperado: {e}")

@router.post("/{aluguel_id}/devolucao", response_model=AluguelSchema)
def processar_devolucao(aluguel_id: int, db: Session = Depends(get_db)):
    try:
        db_aluguel = aluguel_service.processar_devolucao(db=db, aluguel_id=aluguel_id)
        if db_aluguel is None:
            raise HTTPException(status_code=404, detail="Aluguer não encontrado.")
        return db_aluguel
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) # 400 Bad Request
    except ConnectionError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ocorreu um erro inesperado: {e}")


@router.get("/usuario/{usuario_id}", response_model=List[AluguelSchema])
def get_alugueis_por_usuario(usuario_id: int, db: Session = Depends(get_db)):
    alugueis = aluguel_service.get_by_usuario(db=db, usuario_id=usuario_id)
    return alugueis