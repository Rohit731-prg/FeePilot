from jose import jwt
from fastapi import Request, HTTPException, Header
from app.Config.Config import setting
from sqlalchemy.orm.session import Session
from app.DB.Admin_DB_Model import Admin

async def verify(db: Session, req: Request, authorization: str = Header(None)):
    try:
        if not authorization:
            raise HTTPException(status_code=400, detail="Unautherized")
        
        token = authorization.split(" ")[1]
        key = setting.JWT_SCERET_KEY
        data = jwt.decode(token, key)
        return data
    
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))