from sqlalchemy import Column, Integer, TIMESTAMP, JSON, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class StatisticEntity(Base):
    __tablename__ = 'statistics'

    id          = Column(Integer, primary_key=True)
    user_id     = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'))

    created_at  = Column(TIMESTAMP, default="NOW()")
    params      = Column(JSON, nullable=True)

    user        = relationship("UserEntity", back_populates="statistics")