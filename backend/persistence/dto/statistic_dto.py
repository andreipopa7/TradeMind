from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from typing import Dict


class StatisticDTO(BaseModel):
    id:         Optional[int]
    user_id:    int

    created_at: Optional[datetime]
    params:     Optional[Dict]

    class Config:
        from_attributes = True
