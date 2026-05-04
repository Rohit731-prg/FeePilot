from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey
from app.Config.ConnectDB import engine

base = declarative_base()

class Payment():
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey="Student.id")
    subject_id = Column(Integer, ForeignKey="Subject.id")
    amount = Column(Integer)
    payment_date = Column(String)
    month_for = Column(String)

base.metadata.create_all(bind=engine)