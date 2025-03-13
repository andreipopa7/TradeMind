from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, ForeignKey
from database import Base


class Strategy(Base):
    __tablename__ = 'strategies'

    id          = Column(Integer, primary_key=True)
    name        = Column(String(100), nullable=False, unique=True)
    description = Column(Text)
    created_by  = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'))
    created_at  = Column(TIMESTAMP, default="NOW()")