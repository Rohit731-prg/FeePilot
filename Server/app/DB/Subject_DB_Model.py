from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey
from app.Config.ConnectDB import base


class Subject(base):
    __tablename__ = "Subject"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    default_fee = Column(Integer)