from sqlalchemy import Column, String, TIMESTAMP, ForeignKey, Integer, Float, JSON
from sqlalchemy.orm import relationship
from database import Base

from persistence.entities.strategy_entity import StrategyEntity

class BacktestEntity(Base):
    __tablename__ = 'backtests'

    id           = Column(Integer, primary_key=True)
    user_id      = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'))
    strategy_id  = Column(Integer, ForeignKey('strategies.id', ondelete='SET NULL'))

    symbol       = Column(String(20), nullable=False)
    source       = Column(String(20), nullable=False)
    time_frame   = Column(String(20), nullable=False)
    start_date   = Column(TIMESTAMP)
    end_date     = Column(TIMESTAMP)

    total_profit = Column(Float)
    trades_json  = Column(JSON)
    candles_json = Column(JSON)

    created_at   = Column(TIMESTAMP, default="NOW()")

    user         = relationship("UserEntity",       back_populates="backtests")
    strategy     = relationship("StrategyEntity",   back_populates="backtests")
