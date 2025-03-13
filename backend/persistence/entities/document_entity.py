from sqlalchemy import Column, Integer, String, ForeignKey, Text, TIMESTAMP
from database import Base


class Document(Base):
    __tablename__ = 'documents'

    id          = Column(Integer, primary_key=True)
    trade_id    = Column(Integer, ForeignKey('trades.id', ondelete='CASCADE'))
    file_path   = Column(Text, nullable=False)
    file_type   = Column(String(10), nullable=False)
    uploaded_at = Column(TIMESTAMP, default="NOW()")