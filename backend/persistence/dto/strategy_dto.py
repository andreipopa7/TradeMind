from typing import Optional
from pydantic import BaseModel
from typing import Dict


class StrategyDTO(BaseModel):
    id:         Optional[int]

    name:       str
    parameters: Optional[Dict]

    class Config:
        from_attributes = True
