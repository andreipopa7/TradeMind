from sqlalchemy import Column, Integer, String, TIMESTAMP
from database import Base

class EconomicEvent(Base):
    __tablename__ = 'economic_events'

    id          = Column(Integer, primary_key=True)
    event_name  = Column(String(255), nullable=False)
    event_date  = Column(TIMESTAMP, nullable=False)
    country     = Column(String(100))
    event_type  = Column(String(100))
    importance  = Column(String(50))
    created_at  = Column(TIMESTAMP, default="NOW()")