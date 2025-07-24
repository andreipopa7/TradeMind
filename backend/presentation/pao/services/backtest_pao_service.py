from typing import List, Optional, Dict
from business.bal.backtest_bal import BacktestBAL
from business.bto.backtest_bto import BacktestBTO
from presentation.pao.interfaces.backtest_pao_interface import BacktestPAOInterface

class BacktestPAOService(BacktestPAOInterface):
    def __init__(self, backtest_bal: BacktestBAL):
        self.bal = backtest_bal

    def request_to_bto(self, data: Dict) -> BacktestBTO:
        required = ["user_id", "strategy_id", "symbol", "time_frame", "start_date", "end_date"]
        for key in required:
            if key not in data:
                raise ValueError(f"Missing field: {key}")

        return BacktestBTO(
            id=None,
            user_id=data["user_id"],
            strategy_id=data["strategy_id"],

            symbol=data["symbol"],
            time_frame=data["time_frame"],
            start_date=data["start_date"],
            end_date=data["end_date"],

            initial_balance=data.get("initial_balance"),
            risk_per_trade=data.get("risk_per_trade"),

            total_profit=None,
            drawdown_max=None,
            winrate=None,
            nr_trades=None,
            profit_factor=None,
            expectancy=None,

            created_at=None
        )

    def bto_to_response(self, bto: BacktestBTO) -> Dict:
        return {
            "id": bto.id,
            "user_id": bto.user_id,
            "strategy_id": bto.strategy_id,

            "symbol": bto.symbol,
            "time_frame": bto.time_frame,
            "start_date": bto.start_date,
            "end_date": bto.end_date,

            "initial_balance": bto.initial_balance,
            "risk_per_trade": bto.risk_per_trade,

            "total_profit": bto.total_profit,
            "drawdown_max": bto.drawdown_max,
            "winrate": bto.winrate,
            "nr_trades": bto.nr_trades,
            "profit_factor": bto.profit_factor,
            "expectancy": bto.expectancy,

            "created_at": bto.created_at
        }

    def create_backtest(self, data: Dict) -> Dict:
        bto = self.request_to_bto(data)
        created = self.bal.create_backtest(bto)
        return self.bto_to_response(created)

    def run_backtest_preview(self, data: Dict) -> dict:
        bto = self.request_to_bto(data)
        return self.bal.run_backtest_preview(bto)


    def get_backtest_by_id(self, backtest_id: int) -> Optional[Dict]:
        bto = self.bal.get_backtest_by_id(backtest_id)
        return self.bto_to_response(bto) if bto else None

    def get_backtests_by_user(self, user_id: int) -> List[Dict]:
        backtests = self.bal.get_backtests_by_user(user_id)
        return [self.bto_to_response(b) for b in backtests]

    def get_backtests_by_strategy(self, strategy_id: int) -> List[Dict]:
        backtests = self.bal.get_backtests_by_strategy(strategy_id)
        return [self.bto_to_response(b) for b in backtests]

    def delete_backtest(self, backtest_id: int) -> bool:
        return self.bal.delete_backtest(backtest_id)
