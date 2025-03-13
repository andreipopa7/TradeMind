from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP, Numeric
from sqlalchemy.orm import relationship
from database import Base

class Trade(Base):
    __tablename__ = 'trades'

    id          = Column(Integer, primary_key=True)
    account_id  = Column(Integer, ForeignKey('trading_accounts.id', ondelete='CASCADE'))
    open_date   = Column(TIMESTAMP, nullable=False)
    type        = Column(String(10), nullable=False)
    symbol      = Column(String(20), nullable=False)
    volume      = Column(Numeric(10, 2), nullable=False)
    open_price  = Column(Numeric(14, 5), nullable=False)

    sl_price    = Column(Numeric(14, 5))
    tp_price    = Column(Numeric(14, 5))
    close_price = Column(Numeric(14, 5))
    close_date  = Column(TIMESTAMP)
    swap        = Column(Numeric(12, 2))
    commission  = Column(Numeric(12, 2))
    profit      = Column(Numeric(12, 2))
    pips        = Column(Numeric(12, 2))

    account     = relationship("TradingAccountEntity", back_populates="trades")