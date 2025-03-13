from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base


class UserEntity(Base):
    __tablename__ = "users"

    id         = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String, nullable=False)
    last_name  = Column(String, nullable=False)
    email      = Column(String, unique=True, index=True, nullable=False)
    password   = Column(String, nullable=False)
    phone      = Column(String, nullable=False)
    gender     = Column(String, nullable=True)
    country    = Column(String, nullable=False)

    trading_accounts    = relationship("TradingAccountEntity", back_populates="user", cascade="all, delete-orphan")


    # backtests           = relationship("BacktestEntity", back_populates="user", cascade="all, delete-orphan")
    # events              = relationship("EventEntity", back_populates="user", cascade="all, delete-orphan")