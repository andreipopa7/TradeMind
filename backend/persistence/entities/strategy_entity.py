from sqlalchemy import Column, Integer, String, JSON
from sqlalchemy.orm import relationship

from database import Base


class StrategyEntity(Base):
    __tablename__ = 'strategies'

    id          = Column(Integer, primary_key=True)

    name        = Column(String(50), nullable=False, unique=True)
    parameters  = Column(JSON, nullable=True)

    # backtests   = relationship("BacktestEntity", back_populates="user", cascade="all, delete-orphan")
