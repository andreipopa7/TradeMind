from sqlalchemy import Column, Integer, String
from ..dal.database import Base

class UserEntity(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    gender = Column(String, nullable=True)
    country = Column(String, nullable=True)
