from sqlalchemy import Column, Integer, String, Float
from database import Base


class Broker(Base):
    __tablename__ = 'brokers'

    id      = Column(Integer, primary_key=True)
    name    = Column(String(100), nullable=False, unique=True)
    server_name = Column(String(100), nullable=False)