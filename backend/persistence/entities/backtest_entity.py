from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from database import Base


class Backtest(Base):
    __tablename__ = 'backtests'

    id          = Column(Integer, primary_key=True)
    user_id     = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'))
    strategy_id = Column(Integer, ForeignKey('strategies.id', ondelete='SET NULL'))
    time_frame  = Column(String(20), nullable=False)
    start_date  = Column(TIMESTAMP)
    end_date    = Column(TIMESTAMP)
    created_at  = Column(TIMESTAMP, default="NOW()")

    user = relationship("UserEntity", back_populates="backtests")