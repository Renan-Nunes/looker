from sqlalchemy import Column, BigInteger, String, DECIMAL, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.config.database import Base

class Payment(Base):
    __tablename__ = "payment"

    id = Column(BigInteger, primary_key=True, autoincrement=True, index=True)
    user_id = Column(BigInteger, ForeignKey("user.id"), nullable=False)
    rent_id = Column(BigInteger, ForeignKey("rent.id"), nullable=False)
    amount = Column(DECIMAL(10, 2), nullable=False)
    status = Column(String(20), nullable=False, default="PENDING")
    method = Column(String(20), nullable=False)
    transaction_id = Column(String(100), nullable=True)
    user = relationship("User", back_populates="payments")
    rent = relationship("Rent", back_populates="payments")
