from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from app.Config.ConnectDB import engine
from sqlalchemy.ext.declarative import declarative_base

base = declarative_base()

class Student_Subject(base):
    __tablename__ = "Student_Subject"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("Student.id"))
    subject_id = Column(Integer, ForeignKey("Subject.id"))
    start_date = Column(String)
    end_date = Column(Boolean, default=False)
    fee_at_join_time = Column(Integer)