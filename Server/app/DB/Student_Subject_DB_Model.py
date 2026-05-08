from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from app.Config.ConnectDB import engine
from sqlalchemy.ext.declarative import declarative_base

base = declarative_base()

class Student_Subject(base):
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    subject_id = Column(Integer, ForeignKey("subjects.id"))
    start_date = Column(String)
    end_date = Column(Boolean, default=False)
    fee_at_join_time = Column(Integer)

base.metadata.create_all(bind=engine)