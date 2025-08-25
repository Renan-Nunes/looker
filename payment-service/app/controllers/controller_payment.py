from sqlalchemy.orm import Session
from app.models.models_payment import Payment

def create_payment(db: Session, user_id: int, rent_id: int, amount: float, method: str):
    transaction_id = f"TXN{user_id}{rent_id}"
    status = "COMPLETED" if method in ["credit_card", "debit_card"] else "PENDING"

    new_payment = Payment(
        user_id=user_id,
        rent_id=rent_id,
        amount=amount,
        method=method,
        transaction_id=transaction_id,
        status=status
    )
    
    db.add(new_payment)
    db.commit()
    db.refresh(new_payment)
    return new_payment