from fastapi import APIRouter, Response, Depends, HTTPException
from app.Model.Subject_model import Subject
from app.Config.ConnectDB import get_db
from app.Service.SubjectService import create_new_subject
from sqlalchemy.orm.session import Session
from app.Middleware.verify import verify

router = APIRouter(
    prefix="/api/subject"
)

@router.post("/create-new-subject")
async def create_new_subject_route(
    data: Subject,
    res: Response,
    db: Session = Depends(get_db),
    user_id: dict = Depends(verify),
) -> dict:
    try:
        new_data = {
            "batch_id": data.batch_id,
            "name": data.name,
            "default_fee": data.default_fee
        }
        response = await create_new_subject(db, new_data)
        res.status_code = 201
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
