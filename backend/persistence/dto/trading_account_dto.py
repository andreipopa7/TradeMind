from pydantic import BaseModel
from typing import Optional


class TradingAccountDTO(BaseModel):
    id:             Optional[int]
    user_email:     str
    broker_name:    str
    account_id:     int
    server:         Optional[str]
    password:       str

