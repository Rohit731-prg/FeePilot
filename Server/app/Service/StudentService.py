from sqlalchemy.orm.session import Session
from fastapi import HTTPException
from app.DB.Student_DB_Model import Student
from app.Utils.PasswordEncoder import generatePassword, compairPassord
from app.Utils.JWT_token import generateToken
from app.DB.Batch_Subject_DB_Model import Batch_Subject
from app.DB.Subject_DB_Model import Subject
from app.DB.Student_Subject_DB_Model import Student_Subject
from datetime import datetime
from app.DB.Batch_DB_Model import Batch
from app.DB.Course_DB_Model import Course

async def create_new_student(db: Session, data: dict) -> dict:
    try:
        phone = f"+91 {data['phone']}"
        is_exist = db.query(Student).filter(Student.phone == phone).first()
        if is_exist:
            raise HTTPException(status_code=400, detail="Student already in DB")
        

        hashedPassword = await generatePassword(data["phone"])
        new_student = Student(
            name=data["name"],
            phone=f"+91 {data['phone']}",
            email="",
            batch_id=data["batch_id"],
            join_date=data["join_date"],
            password=hashedPassword
        )

        db.add(new_student)
        db.commit()
        db.refresh(new_student)

        subjects = db.query(Subject).join(
            Batch_Subject,
            Batch_Subject.subject_id == Subject.id
        ).filter(
            Batch_Subject.batch_id == data["batch_id"]
        ).all()

        for sub in subjects:
            new_sub = Student_Subject(
                student_id = new_student.id,
                subject_id = sub.id,
                start_date = datetime.now(),
                fee_at_join_time = sub.default_fee
            )
            db.add(new_sub)
        db.commit()
    
        return {
            "message": "New Student created"
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

async def fetch_all_students(db: Session) -> list:
    try:
        students = db.query(
            Student,
            Batch,
            Course
        ).join(
            Batch, Batch.id == Student.batch_id
        ).join(
            Course, Batch.course_id == Course.id
        ).order_by(Student.join_date.desc()).all()
        if not students or len(students) == 0:
            raise HTTPException(status_code=400, detail="No records found")
        response = []
        for student, batch, course in students:
            new_data = {
                "id": student.id,
                "name":student.name,
                "phone": student.phone,
                "email": student.email,
                "batch": {
                    "id": batch.id,
                    "batch_name": batch.batch_name,
                    "shedule": batch.shedule,
                    "year": batch.year
                },
                "course": {
                    "id": course.id,
                    "name": course.name
                },
                "join_date": student.join_date
            }
            response.append(new_data)

        return response
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

async def fetch_students_by_batch(db: Session, data: dict):
    try:
        students = db.query(
            Student
        ).filter(
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
        
        token = generateToken({ "id": student.id, "role": "student" })

        return {
            "user": student,
            "token": token
        }
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
    