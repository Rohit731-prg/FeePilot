from sqlalchemy.orm.session import Session
from fastapi import HTTPException
from app.DB.Student_Teacher_Model import Student_Teacher
from app.DB.Admin_DB_Model import Admin

async def create_new_student_teacher(db: Session, data: dict) -> bool:
    try:
        new_student_teacher = Student_Teacher()
        new_student_teacher.professor_id = data["professor_id"]
        new_student_teacher.student_id = data["student_id"]

        db.add(new_student_teacher)
        db.commit()
        db.refresh(new_student_teacher)
        return True
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

async def fetch_Teachers_by_Student(db: Session, data: int):
    try:
        teachers = db.query(
            Admin.id,
            Admin.name,
            Admin.email,
        ).join(
            Student_Teacher,
            Admin.id == Student_Teacher.professor_id
        ).filter(
            Student_Teacher.student_id == data
        ).all()


        if len(teachers) is 0:
            raise HTTPException(status_code=400, detail="No records found")

        response = []

        for teacher in teachers:
            response.append({
                "id": teacher.id,
                "name": teacher.name,
                "email": teacher.email
            })

        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
