from pydantic import BaseModel, Field

class Payment(BaseModel):
    student_id: int =  Field(...)
    subject_id: int =  Field(...)
    amount: float =  Field(...)
    payment_date: str =  Field(...)
    month_for: str =  Field(...)