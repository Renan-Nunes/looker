from fastapi import FastAPI
from app.routes import routes
from app.models.init import criar_tabelas

app = FastAPI()

criar_tabelas()

app.include_router(routes.api_router, prefix="/api/v1")
