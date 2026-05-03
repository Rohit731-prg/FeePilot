from pydantic import BaseModel, Field, EmailStr

class Admin(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=8)