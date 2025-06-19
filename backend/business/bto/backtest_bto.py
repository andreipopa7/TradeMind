from pydantic import BaseModel
from typing import List
from datetime import datetime

class BacktestRequestBTO(BaseModel):
    symbol: str
    start_date: str
    end_date: str
    timeframe: str

class TradeBTO(BaseModel):
    trade_id: int
    action: str
    timestamp: datetime
    price: float
    profit: float

class CandleBTO(BaseModel):
    time: int
    open: float
    high: float
    low: float
    close: float

class BacktestResultBTO(BaseModel):
    trades: List[TradeBTO]
    total_profit: float
    candles: List[CandleBTO]


