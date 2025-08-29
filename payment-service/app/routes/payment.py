from fastapi import APIRouter, HTTPException, Header
from app.schemas.schemas_payment import Payment_Request
import requests

router = APIRouter()

@router.post("/payment")
def process_payment(
    payment: Payment_Request,
    x_user_id: str = Header(alias="X-User-Id"),
    x_user_role: str = Header(alias="X-User-Role")
):
    if not payment.card_number or payment.amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid payment details")

    response = {
        "status": 200,
        "aluguel_id": payment.aluguel_id,
        "user_id": payment.user_id,
        "amount": payment.amount,
        "message": "Payment processed successfully"
    }

    aluguel_api_url = f"http://localhost:8001/v1/alugueis/{payment.aluguel_id}/devolucao"

    try:
        aluguel_response = requests.post(
            aluguel_api_url,
            headers={
                "X-User-Id": x_user_id,
                "X-User-Role": x_user_role
            }
        )
        if aluguel_response.status_code != 200:
            response["warning"] = f"Não foi possível atualizar devolução do aluguel {payment.aluguel_id}"
    except Exception as e:
        response["warning"] = f"Erro ao comunicar com API de aluguel: {str(e)}"

    return response
