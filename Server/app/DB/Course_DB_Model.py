from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer

base = declarative_base()

class Course(base):
    __tablename__ = "Course"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)