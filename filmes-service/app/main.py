# app/main.py
from fastapi import FastAPI
from app.api.v1.routes import filmes

app = FastAPI(title="Filmes Service")

app.include_router(filmes.router, prefix="/v1/filmes", tags=["filmes"])

@app.get("/")
def health_check():
    return {"status": "ok"}