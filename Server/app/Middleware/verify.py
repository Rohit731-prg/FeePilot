from jose import jwt
from fastapi import HTTPException, Request
from app.Config.Config import setting
from sqlalchemy.orm.session import Session
from app.DB.Admin_DB_Model import Admin
from app.DB.Student_DB_Model import Student
from fastapi import Depends
from app.Config.ConnectDB import get_db

async def verify(
        req: Request,
        db: Session = Depends(get_db),
    ):
    try:
        auth_header = req.headers.get("Authorization")
        if not auth_header:
            raise HTTPException(status_code=400, detail="Unautherized")
        
        schema, token = auth_header.split(" ")
        if schema.lower() != "bearer":
            raise HTTPException( status_code=400, detail="Invalid authentication scheme")
    
        payload = jwt.decode(token, setting.JWT_SCERET_KEY, algorithms=["HS256"])
        role = payload.get("role")
        id = payload.get("id")
        if role == "admin":
            user = db.query(Admin).filter(Admin.id == id).first()
        elif role == "student":
            user = db.query(Student).filter(Student.id == id).first()
        else:
            raise HTTPException(status_code=400, detail="Invalid token User")

        if not user:
            raise HTTPException(status_code=400, detail="Unautherized")
        
        return user

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))