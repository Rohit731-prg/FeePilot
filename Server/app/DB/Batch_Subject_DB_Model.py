from sqlalchemy import Column, Integer, ForeignKey
from app.Config.ConnectDB import base

class Batch_Subject(base):
    __tablename__ = "Batch_Subject"

    id = Column(Integer, primary_key=True, index=True)
    batch_id = Column(Integer, ForeignKey("Batch.id"))
    subject_id = Column(Integer, ForeignKey("Subject.id"))