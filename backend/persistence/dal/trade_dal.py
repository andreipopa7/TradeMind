from sqlalchemy.orm import Session
from persistence.dao.repositories.trade_repository import TradeRepository
from persistence.entities.trade_entity import Trade
from typing import List, Optional
from datetime import datetime


class TradeDAL:
    def __init__(self, db: Session):
        self.repo = TradeRepository(db)

    # Create & delete
    def create_trade(self, trade: Trade) -> Trade:
        return self.repo.create_trade(trade)

    def delete_trade(self, trade_id: int) -> None:
        self.repo.delete_trade(trade_id)

    # Getters
    def get_trade_by_id(self, trade_id: int) -> Optional[Trade]:
        return self.repo.get_trade_by_id(trade_id)

    def get_trades_by_account(self, account_id: int) -> List[Trade]:
        return self.repo.get_trades_by_account(account_id)

    def get_trades_by_open_date(self, open_date: datetime) -> List[Trade]:
        return self.repo.get_trades_by_open_date(open_date)

    def get_trades_by_type(self, type: str) -> List[Trade]:
        return self.repo.get_trades_by_type(type)

    def get_trades_by_symbol(self, symbol: str) -> List[Trade]:
        return self.repo.get_trades_by_symbol(symbol)