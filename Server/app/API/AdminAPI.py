from fastapi import APIRouter, Response, Depends, HTTPException
from app.Model.Admin_model import Admin, Login
from app.Config.ConnectDB import get_db
from app.Service.AdminService import create_new_admin, autherrized, login, get_teacher_details
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
    
@router.put("/authenticate")
async def autherrized_route(
    data: dict,
    res: Response,
    db: Session = Depends(get_db)
) -> dict:
    try:
        response = await autherrized(db, dict(data))
        res.status_code = 200
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post("/login-Teacher")
async def login_teacher_route(
    data: Login,
    res: Response,
    db: Session = Depends(get_db)
):
    try:
        response = await login(db, dict(data))
        res.status_code = 200
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/teacher-details/{id}")
async def teacher_details_route(
    id: int,
    res: Response,
    db: Session = Depends(get_db)
):
    try:
        response = await get_teacher_details(db, id)
        res.status_code = 200
        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))