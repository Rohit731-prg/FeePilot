from fastapi import APIRouter, Response, Depends, HTTPException
from sqlalchemy.orm.session import Session
from app.Config.ConnectDB import get_db
from app.Service.Student_Subject import create_new_student_subject

router = APIRouter(
    prefix="/api/student-subject"
)

@router.post("/create-new-stu_sub")
async def create_new_student_Subject_route(
    data: dict,
    res: Response,
    db: Session = Depends(get_db),
):
    try:
        respose = await create_new_student_subject(db, data)
        res.status_code = 201
        return respose
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))