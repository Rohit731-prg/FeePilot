from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.DB.Batch_DB_Model import Batch
from app.DB.Batch_Subject_DB_Model import Batch_Subject
from app.DB.Course_DB_Model import Course

async def create_new_batch(db: Session, data: dict) -> dict:
    try:
        # is_exist = await db.query(Batch).filter(Batch)
        new_batch = Batch(
            course_id = data["course_id"],
            year = data["year"],
            batch_name = data["batch_name"],
            shedule = data["shedule"],
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
    

async def get_all_batches(db: Session):
    try:
        batches_quary = db.query(
            Batch, Course
        ).join(
            Course,
            Batch.course_id == Course.id
        ).all()
        response = []

        for batch, course in batches_quary:
            response.append({
                "id": batch.id,
                "batch_name": batch.batch_name,
                "year": batch.year,
                "shedule": batch.shedule,
                "course": {
                    "id": course.id,
                    "name": course.name
                }
            })

        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

async def add_subjects_batch(db: Session, data, id):    # data = [{"id": 1}, {"id": 2}]
    try:
        print(data)
        for i in data:
            new_data = Batch_Subject(
                batch_id = id,
                subject_id = i["id"]
            )   
            db.add(new_data)
        db.commit()

        return {
            "message": "subjects added"
        }

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))