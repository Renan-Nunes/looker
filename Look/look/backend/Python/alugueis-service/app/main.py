from fastapi import FastAPI
from app.api.v1.routes import alugueis

app = FastAPI(title="Aluguéis Service")

app.include_router(alugueis.router, prefix="/v1/alugueis", tags=["alugueis"])

@app.get("/")
def health_check():
    return {"status": "ok, alugueis-service"}