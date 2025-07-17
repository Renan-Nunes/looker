from fastapi import FastAPI
from app.routes import routes

app = FastAPI()
app.include_router(routes.api_router, prefix="/api/v1")
