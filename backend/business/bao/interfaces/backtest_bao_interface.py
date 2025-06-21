from typing import List, Optional
from business.bto.backtest_bto import BacktestBTO

class BacktestBAOInterface:
    def create_backtest(self, bto: BacktestBTO) -> BacktestBTO:
        pass

    def delete_backtest(self, backtest_id: int) -> bool:
        pass

    def get_backtest_by_id(self, backtest_id: int) -> Optional[BacktestBTO]:
        pass

    def get_backtests_by_user(self, user_id: int) -> List[BacktestBTO]:
        pass

    def get_backtests_by_strategy(self, strategy_id: int) -> List[BacktestBTO]:
        pass

    def update_backtest(self, backtest_id: int, updated_bto: BacktestBTO) -> Optional[BacktestBTO]:
        pass
