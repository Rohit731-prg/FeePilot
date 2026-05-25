from sqlalchemy import Column, Integer, String, ForeignKey
from app.Config.ConnectDB import base

class Student(base):
    __tablename__ = "Student"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    phone = Column(String)
    email = Column(String)
    batch_id = Column(Integer, ForeignKey("Batch.id"))
    join_date  = Column(String)
    password = Column(String)