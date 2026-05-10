from pydantic import BaseModel, Field, field_validator

class Subject(BaseModel):
    batch_id: int = Field(...)
    name: str = Field(...)
    default_fee: float = Field(...)
    @field_validator("default_fee")
    @classmethod
    def check_default_fee(cls, vle):
        if vle < 0:
            raise ValueError("Default fess must be grater then 0")
        return vle