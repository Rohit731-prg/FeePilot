from jose import jwt
from fastapi import HTTPException, Header
from app.Config.Config import setting
from sqlalchemy.orm.session import Session
from app.DB.Admin_DB_Model import Admin
from fastapi import Depends
from app.Config.ConnectDB import get_db

async def verify(
        db: Session = Depends(get_db),
        authorization: str = Header(None)
    ):
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