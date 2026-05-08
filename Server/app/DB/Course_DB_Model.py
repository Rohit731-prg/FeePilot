from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer, ForeignKey
from app.Config.ConnectDB import engine

base = declarative_base()

class Course(base):
    __tablename__ = "Course"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    professor_id = Column(Integer, ForeignKey("Admin.id"))

base.metadata.create_all(bind=engine)