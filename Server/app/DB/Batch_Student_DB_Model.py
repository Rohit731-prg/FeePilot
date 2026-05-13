from app.Config.ConnectDB import base
from sqlalchemy import Integer, ForeignKey, Column

class Batch_Student(base):
    __tablename__ = "Batch_Student"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey('Student.id'))
    batch_id = Column(Integer, ForeignKey('Batch.id'))