import requests
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.schemas.payment import PaymentCreate, PaymentOut
from app.controllers.payment_controller import create_payment
from app.models.payment import Payment

router = APIRouter(prefix="/api/v1/payments", tags=["Payments"])

USER_API_URL = "http://user-service:8000/api/v1/users"
RENT_API_URL = "http://rent-service:8000/api/v1/alugueis"

import requests
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.schemas.payment import PaymentCreate, PaymentOut
from app.controllers.payment_controller import create_payment
from app.models.payment import Payment

router = APIRouter(prefix="/api/v1/payments", tags=["Payments"])

USER_API_URL = "http://user-service:8000/api/v1/users"
RENT_API_URL = "http://rent-service:8000/api/v1/alugueis"

@router.post("/", response_model=PaymentOut)
def make_payment(payment: PaymentCreate, db: Session = Depends(get_db)):
    user_resp = requests.get(f"{USER_API_URL}/{payment.user_id}")
    if user_resp.status_code != 200:
        raise HTTPException(status_code=404, detail="User not found")
    user_data = user_resp.json()

    rent_resp = requests.get(f"{RENT_API_URL}/{payment.rent_id}")
    if rent_resp.status_code != 200:
        raise HTTPException(status_code=404, detail="Rent not found")
    rent_data = rent_resp.json()

    if float(rent_data["valor_aluguel"]) != float(payment.amount):
        raise HTTPException(status_code=400, detail="Payment amount does not match rent amount")
    if rent_data["status"].upper() != "ATIVO":
        raise HTTPException(status_code=400, detail="Rent is not active")
    
    if payment.method not in ["credit_card", "debit_card"]:
        raise HTTPException(status_code=400, detail="Only card payments are allowed in this mock")

    return create_payment(
        db,
        user_id=user_data["id"],
        rent_id=rent_data["id"],
        amount=payment.rent_data["valor_aluguel"],
        method=payment.method
    )


@router.get("/{payment_id}", response_model=PaymentOut)
def get_payment(payment_id: int, db: Session = Depends(get_db)):
    payment = db.query(Payment).filter(Payment.id == payment_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment
