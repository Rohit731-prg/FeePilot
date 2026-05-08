from pydantic import BaseModel, Field

class Student_Subject_Model(BaseModel):
    student_id: int = Field(..., description="ID of the student")
    subject_id: int = Field(..., description="ID of the subject")
    start_date: str = Field(..., description="Start date of the subject for the student")
    end_date: bool = Field(..., description="End date of the subject for the student")
    fee_at_join_time: int = Field(..., description="Fee at the time of joining the subject")