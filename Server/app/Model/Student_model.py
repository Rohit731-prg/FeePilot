from pydantic import BaseModel, Field, field_validator, EmailStr
from datetime import date
import re

class Student(BaseModel):
    name: str = Field(...)
    phone: str = Field(...)
    @field_validator("phone")
    @classmethod
    def check_phone(cls, vle):
        pattern = r"^[6-9]\d{9}$"
        if not re.match(pattern, vle):
            raise ValueError("Enter a valid phone number")
        return vle
    batch_id: int = Field(...)
    course_id: int = Field(...)
    join_date: date = Field(...)

class Update_Student(BaseModel):
    id: int = Field(...)
    name: str = Field(...)
    phone: str = Field(...)
    @field_validator("phone")
    @classmethod
    def check_phone(cls, vle):
        pattern = r"^[6-9]\d{9}$"
        if not re.match(pattern, vle):
            raise ValueError("Enter a valid phone number")
        return vle
    email: EmailStr
    password: str