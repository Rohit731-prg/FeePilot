from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey
from app.Config.ConnectDB import engine

base = declarative_base()

class Payment(base):
    __tablename__ = "Payment"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("Student.id"))
    subject_id = Column(Integer, ForeignKey("Subject.id"))
    amount = Column(Integer)
    payment_date = Column(String)
    month_for = Column(String)
    expected_payment_amount = Column(Integer)