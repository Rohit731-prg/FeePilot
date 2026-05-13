from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.DB.Batch_DB_Model import Batch
from app.DB.Batch_Student_DB_Model import Batch_Student

async def create_new_batch(db: Session, data: dict) -> dict:
    try:
        # is_exist = await db.query(Batch).filter(Batch)
        new_batch = Batch(
            course_id = data["course_id"],
            teacher_id = data["teacher_id"],
            year = data["year"],
            batch_name = data["batch_name"],
            time = data["time"],
            day = data["day"]
        )
        db.add(new_batch)
        db.commit()
        db.refresh(new_batch)
        return {
            "message": "New Batch created"
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

async def add_student_batch(db: Session, data: list):
    try:
        for i in data:
            is_exist = db.query(Batch_Student).filter(
                Batch_Student.batch_id == i["batch_id"],
                Batch_Student.student_id == i["student_id"]
            ).first()
            if not is_exist:
                new_batch_student = Batch_Student()
                new_batch_student.batch_id = i["batch_id"]
                new_batch_student.student_id = i["student_id"]
                db.add(Batch_Student)
                db.commit()
                db.refresh(new_batch_student)

        return {
            "message": "All student has been enrolled in batch"
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

async def get_all_batches(db: Session, data: dict):
    try:
        batches_quary = db.query(Batch).filter(
            Batch.course_id == data["course_id"],
            Batch.professor_id == data["professor_id"]
        ).all()
        return batches_quary
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
async def get_all_batches_by_Student(db: Session, id: int):
    try:
        batches = db.query(Batch).join(
            Batch_Student,
            Batch.id == Batch_Student.batch_id
        ).filter(
            Batch_Student.student_id == id
        ).all()

        if not batches:
            raise HTTPException(status_code=400, detail="No records found")
        
        return batches
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))