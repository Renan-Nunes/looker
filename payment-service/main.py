from fastapi import FastAPI
from app.routes.payment import router as payment_router 

app = FastAPI()

# Rotas
app.include_router(payment_router, prefix="/api/v1")
