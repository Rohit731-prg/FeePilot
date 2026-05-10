from sqlalchemy import Column, Integer, ForeignKey
from app.Config.ConnectDB import base


class Student_Teacher(base):
    __tablename__ = "Student_Teacher"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("Student.id"))
    professor_id = Column(Integer, ForeignKey("Admin.id"))