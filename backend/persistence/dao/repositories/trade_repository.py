from typing import List, Optional
from datetime import datetime
from sqlalchemy.orm import Session
from persistence.entities.trade_entity import Trade
from persistence.dao.interfaces.trade_dao_interface import TradeDAOInterface

class TradeRepository(TradeDAOInterface):
    def __init__(self, db: Session):
        self.db = db

    # Create & delete
    def create_trade(self, trade: Trade) -> Trade:
        self.db.add(trade)
        self.db.commit()
        self.db.refresh(trade)
        return trade

    def delete_trade(self, trade_id: int) -> None:
        trade = self.get_trade_by_id(trade_id)
        if trade:
            self.db.delete(trade)
            self.db.commit()

    # Getters
    def get_trade_by_id(self, trade_id: int) -> Optional[Trade]:
        return self.db.query(Trade).filter(Trade.id == trade_id).first()

    def get_trades_by_account(self, account_id: int) -> List[Trade]:
        return self.db.query(Trade).filter(Trade.account_id == account_id).all()

    def get_trades_by_open_date(self, open_date: datetime) -> List[Trade]:
        return self.db.query(Trade).filter(Trade.open_date == open_date).all()

    def get_trades_by_type(self, type: str) -> List[Trade]:
        return self.db.query(Trade).filter(Trade.type == type).all()

    def get_trades_by_symbol(self, symbol: str) -> List[Trade]:
        return self.db.query(Trade).filter(Trade.symbol == symbol).all()
