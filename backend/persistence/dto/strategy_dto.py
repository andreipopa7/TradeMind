from typing import Optional, Dict
from pydantic import BaseModel
from datetime import datetime


class StrategyDTO(BaseModel):
    id:           Optional[int]
    name:         str
    description:  Optional[str]
    type:         str
    parameters:   Optional[Dict]
    created_by:   Optional[int]
    is_public:    Optional[bool]
    created_at:   Optional[datetime]

    class Config:
        from_attributes = True
