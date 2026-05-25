from sqlalchemy import Column, Integer, String, ForeignKey
from app.Config.ConnectDB import base

class Course(base):
    __tablename__ = "Course"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
