from jose import jwt
from app.Config.Config import setting

def generateToken(data: dict):
    serect_key = setting.JWT_SCERET_KEY
    token = jwt.encode(data, serect_key, algorithm="HS256")
    return token