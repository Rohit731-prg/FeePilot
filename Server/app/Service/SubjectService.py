from sqlalchemy.orm.session import Session
from fastapi import HTTPException
from app.DB.Subject_DB_Model import Subject

async def create_new_subject(db: Session, data: dict) -> dict:
    try:
        new_subject = Subject(
            batch_id = data["batch_id"],
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