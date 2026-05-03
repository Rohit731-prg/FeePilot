from pydantic import BaseModel, Field, field_validator

class Batch(BaseModel):
    course_id: int = Field(...)
    year: str = Field(...)
    
    @field_validator("year")
    @classmethod
    def checkYear(cls, value):
        if value not in ["1st", "2nd", "3rd", "4th"]:
            raise ValueError("year must be correct")
        return value
    
    batch_name: str = Field(...)