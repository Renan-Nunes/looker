# app/main.py
from fastapi import FastAPI
from app.api.v1.routes import filmes
from app.api.v1.routes import reviews

app = FastAPI(title="Filmes Service")

app.include_router(filmes.router, prefix="/v1/filmes", tags=["filmes"])
app.include_router(reviews.router, prefix="/v1/reviews", tags=["reviews"])

@app.get("/")
def health_check():
    return {"status": "ok, filmes-service"}