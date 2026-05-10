from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.API.CourseAPI import router as CourseRoute
from app.API.AdminAPI import router as AdminRoute
from app.API.BatchAPI import router as BatchRoute
from app.API.SubjectAPI import router as SubjectRoute
from app.API.StudentAPI import router as StudentRoute
from app.Config.ConnectDB import engine, base
from app.DB.Student_DB_Model import Student
from app.DB.Student_Teacher_Model import Student_Teacher
from app.DB.Student_Subject_DB_Model import Student_Subject
from app.DB.Admin_DB_Model import Admin
from app.DB.Batch_DB_Model import Batch
from app.DB.Course_DB_Model import Course
from app.DB.Subject_DB_Model import Subject
from app.DB.Payment_DB_Model import Payment

app = FastAPI()

base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(AdminRoute)
app.include_router(CourseRoute)
app.include_router(BatchRoute)
app.include_router(SubjectRoute)
app.include_router(StudentRoute)