from typing import List, Optional
from sqlalchemy.orm import Session
from datetime import datetime
import pandas as pd

from business.bao.interfaces.backtest_bao_interface import BacktestBAOInterface
from business.bto.backtest_bto import BacktestBTO
from business.mappers.backtest_mapper import BacktestMapper
from business.utils.chart_data_loader import UniversalDataLoader
from persistence.dal.backtest_dal import BacktestDAL
from business.utils.backtest.backtest_executor import BacktestExecutor
from business.utils.strategies.strategy_registry import StrategyRegistry
from business.bao.services.chart_data_bao_service import ChartDataBAOService
from business.bao.services.strategy_bao_service import StrategyBAOService
from persistence.dal.strategy_dal import StrategyDAL


class BacktestBAOService(BacktestBAOInterface):
    def __init__(self, db: Session, backtest_dal: BacktestDAL):
        self.db = db
        self.dal = backtest_dal

    def create_backtest(self, bto: BacktestBTO) -> BacktestBTO:
        # Step 1: Load candle data via ChartDataBAO
        chart_bao = ChartDataBAOService()
        chart_data = chart_bao.get_chart_data({
            "symbol": bto.symbol,
            "time_frame": bto.time_frame,
            "start_date": bto.start_date.strftime("%Y-%m-%d")
                    if isinstance(bto.start_date, datetime) else bto.start_date,
            "end_date": bto.end_date.strftime("%Y-%m-%d")
                    if isinstance(bto.end_date, datetime) else bto.end_date
        })
        candles = chart_data.get("candles", [])

        # Step 2: Load strategy logic
        strategy_dal = StrategyDAL(self.db)
        strategy_bao = StrategyBAOService(self.db, strategy_dal)
        strategy_bto = strategy_bao.get_strategy_by_id(bto.strategy_id)
        strategy = StrategyRegistry.get_strategy(strategy_bto.type)

        # Step 3: Apply strategy
        trades = strategy.generate_trades(candles, strategy_bto.parameters or {})

        # Step 4: Calculate metrics
        executor = BacktestExecutor(
            initial_balance=bto.initial_balance,
            risk_per_trade=bto.risk_per_trade
        )
        metrics = executor.simulate_trades(trades)

        # Step 5: Save in DB
        bto.total_profit = metrics["total_profit"]
        bto.drawdown_max = metrics["drawdown_max"]
        bto.winrate = metrics["winrate"]
        bto.nr_trades = metrics["nr_trades"]
        bto.profit_factor = metrics["profit_factor"]
        bto.expectancy = metrics["expectancy"]
        bto.created_at = datetime.utcnow()

        dto = BacktestMapper.bto_to_dto(bto)
        saved_dto = self.dal.add_backtest(dto, user_id=bto.user_id)

        return BacktestMapper.dto_to_bto(saved_dto)

    def run_backtest_preview(self, bto: BacktestBTO) -> dict:
        # Step 1: Load candle data
        chart_bao = ChartDataBAOService()
        chart_data = chart_bao.get_chart_data({
            "symbol": bto.symbol,
            "time_frame": bto.time_frame,
            "start_date": bto.start_date.strftime("%Y-%m-%d") if isinstance(bto.start_date,
                                                                            datetime) else bto.start_date,
            "end_date": bto.end_date.strftime("%Y-%m-%d") if isinstance(bto.end_date, datetime) else bto.end_date
        })
        candles = chart_data.get("candles", [])

        # Step 2: Load strategy
        strategy_dal = StrategyDAL(self.db)
        strategy_bao = StrategyBAOService(self.db, strategy_dal)
        strategy_bto = strategy_bao.get_strategy_by_id(bto.strategy_id)
        strategy = StrategyRegistry.get_strategy(strategy_bto.type)

        # Step 3: Apply strategy
        trades = strategy.generate_trades(candles, strategy_bto.parameters or {})

        # Step 4: Run metrics
        executor = BacktestExecutor(
            initial_balance=bto.initial_balance,
            risk_per_trade=bto.risk_per_trade
        )
        metrics = executor.simulate_trades(trades)

        return {
            "trades": trades,
            "metrics": metrics
        }


    def delete_backtest(self, backtest_id: int) -> bool:
        return self.dal.delete_backtest(backtest_id)

    def get_backtest_by_id(self, backtest_id: int) -> Optional[BacktestBTO]:
        dto = self.dal.get_backtest_by_id(backtest_id)
        return BacktestMapper.dto_to_bto(dto) if dto else None

    def get_backtests_by_user(self, user_id: int) -> List[BacktestBTO]:
        dtos = self.dal.get_backtests_by_user(user_id)
        return [BacktestMapper.dto_to_bto(dto) for dto in dtos]

    def get_backtests_by_strategy(self, strategy_id: int) -> List[BacktestBTO]:
        dtos = self.dal.get_backtests_by_strategy(strategy_id)
        return [BacktestMapper.dto_to_bto(dto) for dto in dtos]

    def get_backtest_metrics(self, backtest_id: int) -> Optional[dict]:
        return self.dal.get_backtest_metrics(backtest_id)

    def update_backtest(self, backtest_id: int, updated_bto: BacktestBTO) -> Optional[BacktestBTO]:
        updated_dto = BacktestMapper.bto_to_dto(updated_bto)
        result_dto = self.dal.update_backtest(backtest_id, updated_dto)
        return BacktestMapper.dto_to_bto(result_dto) if result_dto else None

    def update_backtest_metrics(self, backtest_id: int, metrics: dict) -> bool:
        return self.dal.update_backtest_metrics(backtest_id, metrics)
