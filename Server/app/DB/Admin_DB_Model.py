from sqlalchemy.ext.declarative import declarative_base
from app.Config.ConnectDB import engine
from sqlalchemy import Column, Integer, String, Boolean

base = declarative_base()

class Admin(base):
    __tablename__ = "Admin"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    password = Column(String)
    auth = Column(Boolean, default=False)
    OTP = Column(String)

base.metadata.create_all(bind=engine)