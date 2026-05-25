from sqlalchemy.orm.session import Session
from fastapi import APIRouter, Depends, HTTPException, Response
from app.Middleware.verify import verify
from app.Config.ConnectDB import get_db
from app.Service.PaymentService import create_new_payment, fetch_payment_by_student, create_all_payment, fetch_all_payment

router = APIRouter(
    prefix="/api/payment"
)

@router.post("/create-new-payment")
async def create_new_payment_route(
    data: dict,
    res: Response,
    db: Session = Depends(get_db),
    user_id: int = Depends(verify),
):
    try:
        new_payment = {
            "student_id": data["student_id"],
            "subject_id": data["subject_id"],
            "amount": data["amount"],
            "payment_date": data["payment_date"],
            "month_for": data["month_for"]
        }
        response = await create_new_payment(db, new_payment)
        res.status_code = 201
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post("/create-all-payment")
async def create_all_payment_route(
    res: Response,
    data: dict,
    db: Session = Depends(get_db),
    user: dict = Depends(verify)
):
    try:
        response = await create_all_payment(db, data)
        res.status_code = 201
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/get-all-payment")
async def get_all_payments(
    res: Response,
    db: Session = Depends(get_db),
    user: dict = Depends(verify)
):
    try:
        response = await fetch_all_payment(db)
        res.status_code = 200
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/get-payment-history-by-student/{id}")
async def get_payments_by_students_route(
    id: int,
    res: Response,
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    try:
        response = await fetch_payment_by_student(db, id)
        res.status_code = 200
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))