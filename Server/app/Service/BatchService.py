from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.DB.Batch_DB_Model import Batch

async def create_new_batch(db: Session, data) -> dict:
    try:
        # is_exist = await db.query(Batch).filter(Batch)
        new_batch = Batch(
            course_id = data.course_id,
            year = data.year,
            batch_name = data.batch_name
        )
        db.add(new_batch)
        db.commit()
        db.refresh(new_batch)
        return {
            "message": "New Batch created"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))