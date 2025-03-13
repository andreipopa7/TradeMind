from typing import Optional, List
from pydantic import BaseModel
# from persistence.dto.trading_account_dto import TradingAccountDTO
# from persistence.dto.backtest_response_dto import BacktestResponseDTO
# from persistence.dto.event_response_dto import EventResponseDTO

class UserDTO(BaseModel):
    id:         Optional[int]
    first_name: str
    last_name:  str
    email:      str
    password:   Optional[str]
    phone:      str
    gender:     str
    country:    str

    # trading_accounts:   Optional[List[TradingAccountDTO]]
    # backtests:          List[BacktestResponseDTO] = []
    # events:             List[EventResponseDTO] = []

    class Config:
        from_attributes = True