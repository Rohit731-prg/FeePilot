from fastapi import APIRouter, HTTPException, Response, Depends, Body
from app.Model.Batch_Model import Batch
from app.Middleware.verify import verify
from sqlalchemy.orm.session import Session
from app.Config.ConnectDB import get_db
from app.Service.BatchService import create_new_batch, get_all_batches, add_subjects_batch

router = APIRouter(
    prefix="/api/batch"
)

@router.post("/create-new-batch")
async def create_new_batch_route(
    data: Batch,
    res: Response,
    user_id: dict = Depends(verify),
    db: Session = Depends(get_db)
) -> dict:
    try:
        new_batch = {
            "course_id": data.course_id,
            "year": data.year,
            "batch_name": data.batch_name,
            "shedule": data.shedule,
        }
        response = await create_new_batch(db, new_batch)
        res.status_code = 201
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    

@router.get("/get-all-batches")
async def get_all_batches_route(
    res: Response,
    id = Depends(verify),
    db: Session = Depends(get_db)
):
    try:
        batches = await get_all_batches(db)
        res.status_code = 200
        return batches
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/add-batch-subject/{id}")
async def add_batch_subject_route(
    id: int,
    res: Response,
    data: list = Body(...),
    user = Depends(verify),
    db: Session = Depends(get_db)
):
    try:
        response = await add_subjects_batch(db, data, id)
        res.status_code = 201
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        