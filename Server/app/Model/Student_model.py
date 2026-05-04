from pydantic import BaseModel, Field, field_validator
from datetime import date
import re

class Student(BaseModel):
    name: str = Field(..., min_length=1)
    phone: str = Field(...)
    @field_validator("phone")
    @classmethod
    def check_phone(cls, vle):
        pattern = r"^[6-9]\d{9}$"
        if not re.match(pattern, vle):
            raise ValueError("Enter a valid phone number")
        return vle
    batch_id: int = Field(..., min_length=1)
    join_date: date = Field(...)