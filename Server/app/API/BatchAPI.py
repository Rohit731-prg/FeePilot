from fastapi import APIRouter, HTTPException, Response, Depends
from app.Model.Batch_Model import Batch
from app.Middleware.verify import verify
from sqlalchemy.orm.session import Session
from app.Config.ConnectDB import get_db
from app.Service.BatchService import create_new_batch

router = APIRouter(
    prefix="/api/batch"
)

@router.post("/create-new-batch")
async def create_new_batch_route(
    data: Batch,
    res: Response,
    user_id: int = Depends(verify),
    db: Session = Depends(get_db)
) -> dict:
    try:
        new_batch = {
            "course_id": data.course_id,
            "teacher_id": user_id,
            "year": data.year,
            "batch_name": data.batch_name
        }
        response = await create_new_batch(db, new_batch)
        res.status_code = 201
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
