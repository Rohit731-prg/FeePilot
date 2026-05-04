from fastapi import APIRouter, Response, Depends, HTTPException
from app.Model.Admin_model import Admin
from app.Config.ConnectDB import get_db
from app.Service.AdminService import create_new_admin
from sqlalchemy.orm.session import Session

router = APIRouter(
    prefix="/api/admin"
)

@router.post("/create-new-admin")
async def create_new_admin_route(
    data: Admin,
    res: Response,
    db: Session = Depends(get_db)
) -> dict:
    try:
        response = await create_new_admin(db, dict(data))
        res.status_code = 201
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))