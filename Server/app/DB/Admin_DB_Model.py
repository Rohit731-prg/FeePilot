from sqlalchemy import Column, Integer, String, Boolean
from app.Config.ConnectDB import base

class Admin(base):
    __tablename__ = "Admin"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    password = Column(String)
    auth = Column(Boolean, default=False)
    OTP = Column(String)