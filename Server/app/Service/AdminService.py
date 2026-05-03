from sqlalchemy.orm.session import Session
from fastapi import HTTPException
from app.DB.Admin_DB_Model import Admin
from app.Utils.PasswordEncoder import generatePassword, compairPassord
from app.Utils.Otp import generateOTP
from app.Utils.JWT_token import generateToken
from app.Utils.SendMail import send_mail

async def create_new_admin(db: Session, data) -> dict:
    try:
        is_exist = db.query(Admin).filter(Admin.email == data.email).first()
        if is_exist:
            raise HTTPException(status_code=400, detail="Email is already in DB")
        
        hashPassword = generatePassword(data.password)
        otp = generateOTP()

        new_admin = Admin(
            name = data.name,
            email = data.email,
            password = hashPassword,
            OTP = otp,
            auth = False
        )
        db.add(new_admin)
        db.commit()
        db.refresh(new_admin)

        send_mail(data.email, otp)
        return {
            "message": "New Admin create",
        }
    except HTTPException as e:
        raise e  # re-raise properly
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

async def autherrized(db: Session, data) -> dict:
    try:
        admin = db.query(Admin).filter(Admin.email == data.email).first()
        if not admin:
            raise HTTPException(status_code=400, detail="Email not found")
        
        if data.otp != admin.OTP:
            raise HTTPException(status_code=400, detail="OTP does not match")
        
        admin.auth = True # type: ignore
        db.commit()
        db.refresh(admin)
        return {
            "message": "Admin authenticated successfully"
        }
    except HTTPException as e:
        raise e  # re-raise properly
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def login(db: Session, data) -> dict:
    try:
        admin = db.query(Admin).filter(Admin.email == data.email).first()
        if not admin:
            raise HTTPException(status_code=400, detail="No User found")
        
        varify_password = compairPassord(data.password, str(admin.password))
        if not varify_password:
            raise HTTPException(status_code=400, detail="Password does not match")
        
        token = generateToken({ "id": admin.id })
        return {
            "user": admin,
            "token": token
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

