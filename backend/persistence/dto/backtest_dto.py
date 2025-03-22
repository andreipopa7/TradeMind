from typing import Optional
from pydantic import BaseModel
from datetime import datetime


class BacktestDTO(BaseModel):
    id:             Optional[int]
    user_id:        int

    strategy_id:    Optional[int]
    time_frame:     str
    start_date:     Optional[datetime]
    end_date:       Optional[datetime]
    created_at:     Optional[datetime]

    class Config:
        from_attributes = True
