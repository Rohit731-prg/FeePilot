from sqlalchemy import Column, Integer, String, ForeignKey
from app.Config.ConnectDB import base

class Batch(base):
    __tablename__ = "Batch"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("Course.id"))
    teacher_id = Column(Integer, ForeignKey("Admin.id"))
    year = Column(String)
    batch_name = Column(String)