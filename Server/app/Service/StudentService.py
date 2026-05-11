from sqlalchemy.orm.session import Session
from fastapi import HTTPException
from app.DB.Student_DB_Model import Student
from app.Utils.PasswordEncoder import generatePassword, compairPassord

async def create_new_student(db: Session, data: dict) -> dict:
    try:
        phone = f"+91 {data['phone']}"
        is_exist = db.query(Student).filter(Student.phone == phone and Student.professor_id == data["professor_id"]).first()
        if is_exist:
            raise HTTPException(status_code=400, detail="Student already in DB")
        
        hashedPassword = await generatePassword(data["phone"])
        new_student = Student(
            name=data["name"],
            phone=f"+91 {data['phone']}",
            email="",
            professor_id=data["professor_id"],
            batch_id=data["batch_id"],
            course_id=data["course_id"],
            join_date=data["join_date"],
            password=hashedPassword
        )

        db.add(new_student)
        db.commit()
        db.refresh(new_student)
    
        return {
            "message": "New Student created"
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

async def fetch_all_students(db: Session, data) -> list:
    try:
        students = db.query(
            Student
        ).filter(
            Student.professor_id == data["professor_id"]
        ).order_by(Student.join_date.desc()).all()
        if not students or len(students) == 0:
            raise HTTPException(status_code=400, detail="No records found")
        
        return students
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

async def fetch_students_by_batch(db: Session, data: dict):
    try:
        students = db.query(
            Student
        ).filter(
            Student.professor_id == data["professor_id"],
            Student.batch_id == data["batch_id"]
        ).all()
        if not students or len(students) == 0:
            raise HTTPException(status_code=400, detail="No records found")
        
        return students
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

async def student_login(db: Session, data: dict):
    try:
        student = db.query(Student).filter(
            Student.phone == f"+91 {data['phone']}",
        ).first()
        
        if not student:
            raise HTTPException(status_code=400, detail="No records found")
        
        is_password_valid = compairPassord(data["password"], str(student.password))
        if not is_password_valid:
            raise HTTPException(status_code=400, detail="Password does not match")
        
        return student
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

async def delete_student(db: Session, data: int):
    try:
        student = db.query(Student).filter(Student.id == data).first()
        if not student:
            raise HTTPException(status_code=400, detail="No records found")
        
        db.delete(student)
        db.commit()
        return {"message": "Student deleted successfully"}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
   
    
async def update_student(db: Session, data: dict):
    try:
        student = db.query(Student).filter(
            Student.id == data["id"]
        ).first()
        if not student:
            raise HTTPException(status_code=400, detail="No records found")
        
        student.name = data["name"]
        student.phone = f"+91 {data['phone']}" # type: ignore
        student.batch_id = data["batch_id"]
        db.commit()
        db.refresh(student)
        return {"message": "Student updated successfully"}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def update_student_details (db: Session, data) -> dict:
    try:
        student = db.query(Student).filter(
            Student.id == data["id"]
        ).first()
        if not student:
            raise HTTPException(status_code=400, detail="No records found")
        
        student.name = data["name"]
        student.phone = f"+91 {data['phone']}" # type: ignore
        student.email = data["email"]
        if data.get("password"):
            hasdedPassword = await generatePassword(data["password"])
            student.password = await hasdedPassword # type: ignore
        
        db.commit()
        db.refresh(student)
        return {
            "message": "details Update successfully",
            "user": student
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    