from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey
from app.Config.ConnectDB import engine

base = declarative_base()

class Subject(base):
    id = Column(Integer, primary_key=True, index=True)
    batch_id = Column(Integer, ForeignKey="Batch.id")
    name = Column(String)
    default_fee = Column(Integer)

base.metadata.create_all(bind=engine)