from pydantic import BaseModel

class UserDTO(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    phone: str
    gender: str
    country: str

    class Config:
        from_attributes = True
