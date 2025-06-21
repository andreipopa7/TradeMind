from typing import Optional, Dict, List
from pydantic import BaseModel, validator
from datetime import datetime


class BacktestDTO(BaseModel):
    id: Optional[int]
    user_id: int
    strategy_id: Optional[int]

    symbol: str
    source: str
    time_frame: str
    start_date: Optional[datetime]
    end_date: Optional[datetime]

    total_profit: Optional[float]
    trades_json: Optional[List[Dict]]
    candles_json: Optional[List[Dict]]

    created_at: Optional[datetime]

    class Config:
        from_attributes = True

    @validator("start_date", "end_date", pre=True)
    def parse_datetime(cls, value):
        if isinstance(value, str):
            try:
                return datetime.fromisoformat(value)
            except ValueError:
                return datetime.strptime(value, "%Y-%m-%d")
        return value