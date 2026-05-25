from sqlalchemy.orm.session import Session
from fastapi import HTTPException
from app.DB.Subject_DB_Model import Subject
from app.DB.Student_Subject_DB_Model import Student_Subject
from app.DB.Batch_Subject_DB_Model import Batch_Subject

async def create_new_subject(db: Session, data: dict) -> dict:
    try:
        print(data)
        new_subject = Subject(
            name = data["name"],
            default_fee = data["default_fee"]
        )
        db.add(new_subject)
        db.commit()
        db.refresh(new_subject)
        return {
            "message": "New subject added"
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def get_all_subjects_by_student(db: Session, data):
    try:
        subjects = db.query(
            Student_Subject,
            Subject
        ).join(
            Subject,
            Student_Subject.subject_id == Subject.id
        ).filter(
            Student_Subject.student_id == data,
            Student_Subject.end_date == False
        ).all()

        if not subjects:
            raise HTTPException(
                status_code=400,
                detail="No records found"
            )

        response = []
        for student_subject, subject in subjects:
            response.append({
                "id": student_subject.id,
                "student_id": student_subject.student_id,
                "subject_id": student_subject.subject_id,
                "fee_at_join_time": student_subject.fee_at_join_time,
                "start_date": student_subject.start_date,
                "end_date": student_subject.end_date,
                "subject_details": {
                    "id": subject.id,
                    "name": subject.name,
                    "default_fee": subject.default_fee
                }
            })
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

async def get_subjects_all(db: Session): # id is student id
    try:
        all_subjects = db.query(Subject).all()
        
        if not all_subjects:
            raise HTTPException(status_code=400, detail="No records found")
        return all_subjects
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

async def get_all_subjects_by_batch(db: Session, id):
    try:
        subjects = db.query(Subject).join(
            Batch_Subject, Batch_Subject.subject_id == Subject.id
        ).filter(
            Batch_Subject.batch_id == id
        ).all()
        return subjects
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))