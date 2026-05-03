from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey

base = declarative_base()

class Batch(base):
    __tablename__ = "Batch"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey="Course.id")
    year = Column(String)
    batch_name = Column(String)