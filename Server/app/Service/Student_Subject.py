from sqlalchemy.orm.session import Session
from fastapi import HTTPException
from app.DB.Student_Subject_DB_Model import Student_Subject
from app.DB.Subject_DB_Model import Subject
from datetime import datetime

async def create_new_student_subject(db: Session, data: dict) -> dict:
    try:
        if_student_enrolled = db.query(Student_Subject).filter(
            Student_Subject.student_id == data["student_id"],
            Student_Subject.subject_id == data["subject_id"],
            Student_Subject.end_date == False
        ).first()
        if if_student_enrolled:
            raise HTTPException(status_code=400, detail="Student already enrolled in one of the subjects")
        
        fee = db.query(Subject.default_fee).filter(
            Subject.id == data["subject_id"]
        ).scalar()
        new_student_subject = Student_Subject()
        new_student_subject.student_id = data["student_id"]
        new_student_subject.subject_id = data["subject_id"]
        new_student_subject.start_date = str(datetime.now()) # type: ignore
        new_student_subject.fee_at_join_time = int(fee) # type: ignore
        db.add(new_student_subject)
        db.commit()

        return {
            "message": "New Student Subject created"
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))