from datetime import datetime
from typing import List, Optional
from persistence.entities.trade_entity import Trade

class TradeDAOInterface:

    # Create & delete
    def create_trade(self, trade: Trade) -> Trade:
        pass

    def delete_trade(self, trade_id: int) -> None:
        pass

    # Getters
    def get_trade_by_id(self, trade_id: int) -> Optional[Trade]:
        pass

    def get_trades_by_account(self, account_id: int) -> List[Trade]:
        pass

    def get_trades_by_open_date(self, open_date: datetime) -> List[Trade]:
        pass

    def get_trades_by_type(self, type: str) -> List[Trade]:
        pass

    def get_trades_by_symbol(self, symbol: str) -> List[Trade]:
        pass