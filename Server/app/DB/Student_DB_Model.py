from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey
from app.Config.ConnectDB import engine

base = declarative_base()

class Student(base):
    __tablename__ = "Student"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    phone = Column(String)
    professor_id = Column(Integer, ForeignKey="Admin.id")
    batch_id = Column(Integer, ForeignKey="Batch.id")
    join_date  = Column(String)

base.metadata.create_all(bind=engine)