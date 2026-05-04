from fastapi import APIRouter, Response, Depends, HTTPException
from app.Model.Course_Model import Course
from app.Config.ConnectDB import get_db
from app.Service.CourseService import create_new_Course, get_all_course
from sqlalchemy.orm.session import Session

router = APIRouter(
    prefix="/api/course"
)

@router.post("/create_new_course")
async def create_new_course_route(
    data: Course,
    response: Response,
    db: Session = Depends(get_db)
) -> dict:
    try:
        res = await create_new_Course(db, data)
        response.status_code = 201
        return res
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/get-course")
async def get_all_course_route(
    response: Response,
    db = Depends(get_db)
):
    try:
        data = await get_all_course(db)
        response.status_code = 200
        return data
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

