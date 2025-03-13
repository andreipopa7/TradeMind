from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from decimal import Decimal

class TradeDTO(BaseModel):
    id:             Optional[int]
    account_id:     int
    open_date:      datetime
    type:           str
    symbol:         str
    volume:         Decimal
    open_price:     Decimal

    sl_price:       Optional[Decimal] = None
    tp_price:       Optional[Decimal] = None
    close_price:    Optional[Decimal] = None
    close_date:     Optional[datetime] = None
    swap:           Optional[Decimal] = None
    commission:     Optional[Decimal] = None
    profit:         Optional[Decimal] = None
    pips:           Optional[Decimal] = None
