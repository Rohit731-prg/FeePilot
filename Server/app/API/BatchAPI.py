from fastapi import APIRouter, HTTPException, Response, Depends
from app.Model.Batch_Model import Batch
from app.Middleware.verify import verify
from sqlalchemy.orm.session import Session
from app.Config.ConnectDB import get_db
from app.Service.BatchService import create_new_batch, get_all_batches

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
    

@router.get("/get-all-batches/{course_id}")
async def get_all_batches_route(
    course_id: int,
    res: Response,
    professor_id: int = Depends(verify),
    db: Session = Depends(get_db)
):
    try:
        data = {
            "course_id": course_id,
            "professor_id": professor_id
        }
        batches = await get_all_batches(db, data)
        res.status_code = 200
        return batches
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


