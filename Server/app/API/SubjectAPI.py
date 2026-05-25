from fastapi import APIRouter, Response, Depends, HTTPException
from app.Model.Subject_model import Subject
from app.Config.ConnectDB import get_db
from app.Service.SubjectService import create_new_subject, get_all_subjects_by_student, get_subjects_all, get_all_subjects_by_batch
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
    


@router.get("/get-subjects-by-student/{id}")
async def get_subjects_by_Students(
    id: int,
    res: Response,
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    try:
        response = await get_all_subjects_by_student(db, id)
        res.status_code = 200
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/get-all-subjects")
async def get_all_subjects(
    res: Response,
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    try:
        response = await get_subjects_all(db)
        res.status_code = 200
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/get-all-subjects-by-batch/{id}")
async def get_all_subjects_by_batch_route(
    res: Response,
    id: int,
    db: Session = Depends(get_db),
    user = Depends(verify)
):
    try:
        response = await get_all_subjects_by_batch(db, id)
        res.status_code = 200
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
