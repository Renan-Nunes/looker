from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal

class PaymentCreate(BaseModel):
    user_id: int
    rent_id: int
    amount: Decimal
    method: str

class PaymentOut(BaseModel):
    id: int
    user_id: int
    rent_id: int
    amount: Decimal
    status: str
    method: str
    transaction_id: str | None
    created_at: datetime | None = None
    updated_at: datetime | None = None

    class Config:
        from_attributes = True
