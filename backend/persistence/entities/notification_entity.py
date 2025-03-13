from sqlalchemy import Column, Integer, String, ForeignKey, Text, Boolean, TIMESTAMP
from database import Base


class Notification(Base):
    __tablename__ = 'notifications'

    id                  = Column(Integer, primary_key=True)
    user_id             = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'))
    notification_type   = Column(String(50))
    message             = Column(Text, nullable=False)
    read_status         = Column(Boolean, default=False)
    created_at          = Column(TIMESTAMP, default="NOW()")