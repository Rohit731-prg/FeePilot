from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.DB.Course_DB_Model import Course

async def create_new_Course(db: Session, data) -> dict:
    try:
        is_exist = db.query(Course).filter(Course.name == data["name"]).first()
        if is_exist:
            raise HTTPException(status_code=400, detail="Course is already in DB")
        
        new_couse = Course(
            name = data["name"],
            professor_id = data["professor_id"]
        )
        db.add(new_couse)
        db.commit()
        db.refresh(new_couse)
        return {
            "message": "New course added"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

async def get_all_course(db: Session, data):
    try:
        courses = db.query(Course).filter(Course.professor_id == data["professor_id"]).all()
        if not courses or len(courses) == 0:
            raise HTTPException(status_code=400, detail="No records found")
        return courses
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))