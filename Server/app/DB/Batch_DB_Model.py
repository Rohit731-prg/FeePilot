from sqlalchemy import Column, Integer, String, ForeignKey
from app.Config.ConnectDB import base

class Batch(base):
    __tablename__ = "Batch"

    id = Column(Integer, primary_key=True, index=True)
    batch_name = Column(String)
    course_id = Column(Integer, ForeignKey("Course.id"))
    year = Column(String)
    shedule = Column(String)