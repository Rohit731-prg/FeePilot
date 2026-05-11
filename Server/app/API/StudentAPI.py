from sqlalchemy.orm.session import Session
from fastapi import APIRouter, Depends, HTTPException, Response
from app.Middleware.verify import verify
from app.Config.ConnectDB import get_db
from app.Model.Student_model import Student
from app.Service.StudentService import create_new_student, fetch_all_students, fetch_students_by_batch, student_login, update_student_details
from app.Model.Student_model import Update_Student

router = APIRouter(
    prefix="/api/student"
)

@router.post("/create-new-student")
async def create_new_student_route(
    data: Student,
    res: Response,
    db: Session = Depends(get_db),
    user_id: dict = Depends(verify),
) -> dict:
    try:
        new_student = {
            "name": data.name,
            "phone": data.phone,
            "professor_id": user_id["id"],
            "batch_id": data.batch_id,
            "course_id": data.course_id,
            "join_date": data.join_date
        }
        response = await create_new_student(db, new_student)
        res.status_code = 201
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/get-all-students")
async def fetch_all_students_route(
    res: Response,
    db: Session = Depends(get_db),
    user_id: int = Depends(verify),
):
    try:
        data = {
            "professor_id": user_id
        }
        response = await fetch_all_students(db, data)
        res.status_code = 200
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/get-students-by-batch/{batch_id}")
async def fetch_students_by_batch_route(
    batch_id: int,
    res: Response,
    db: Session = Depends(get_db),
    user_id: int = Depends(verify),
):
    try:
        data = {
            "professor_id": user_id,
            "batch_id": batch_id
        }
        response = await fetch_students_by_batch(db, data)
        res.status_code = 200
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post("/student-login")
async def student_login_route(
    res: Response,
    data: dict,
    db: Session = Depends(get_db),
):
    try:
        Response = await student_login(db, data)
        res.status_code = 200
        return Response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.put("/update-student-details")
async def update_student_details_route(
    res: Response,
    data: Update_Student,
    db: Session = Depends(get_db),
):
    try:
        response = await update_student_details(db, dict(data))
        res.status_code = 200
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/get-teacher")
async def fetch_all_teachers_by_student_route(
    res: Response,
    id: str,
    db: Session = Depends(get_db)
):
    try:
        # # response =  await fetch_Teachers_by_Student(db, id)
        # res.status_code = 200
        # return response
        pass
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
