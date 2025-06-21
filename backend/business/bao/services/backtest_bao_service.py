# import random
# from datetime import datetime
# import pandas as pd
# from business.bto.backtest_bto import BacktestRequestBTO, BacktestResultBTO, TradeBTO, CandleBTO
# from business.utils.backtest_data_loader import UniversalDataLoader
#
#
# class BacktestService:
#
#     @staticmethod
#     def run_backtest(request: BacktestRequestBTO) -> BacktestResultBTO:
#         loader, mapped_symbol = UniversalDataLoader.get_loader_and_symbol(request.symbol)
#         df, candles = loader.get_historical_data(
#             symbol=mapped_symbol,
#             interval=request.timeframe,
#             start=request.start_date,
#             end=request.end_date
#         )
#
#         df["SMA_10"] = df["close"].rolling(window=10).mean()
#
#         position = None  # None, 'BUY', 'SELL'
#         entry_price = 0
#         trades = []
#         total_profit = 0
#         trade_id = 0
#
#         for index, row in df.iterrows():
#             price = row["close"].item() if isinstance(row["close"], pd.Series) else float(row["close"])
#
#
#             sma_value = row.get("SMA_10", None)
#             if isinstance(sma_value, pd.Series):
#                 sma_value = sma_value.iloc[0]
#             sma = float(sma_value) if pd.notna(sma_value) else None
#
#             if sma is None:
#                 continue
#
#             if price > sma and position != 'BUY':
#                 if position == 'SELL':
#                     profit = entry_price - price
#                     total_profit += profit
#                     trades.append(TradeBTO(
#                         trade_id=trade_id,
#                         action="CLOSE_SELL",
#                         timestamp=index,
#                         price=price,
#                         profit=profit
#                     ))
#                     trade_id += 1
#
#                 position = 'BUY'
#                 entry_price = price
#                 trades.append(TradeBTO(
#                     trade_id=trade_id,
#                     action="BUY",
#                     timestamp=index,
#                     price=price,
#                     profit=0
#                 ))
#                 trade_id += 1
#
#             elif price < sma and position != 'SELL':
#                 if position == 'BUY':
#                     profit = price - entry_price
#                     total_profit += profit
#                     trades.append(TradeBTO(
#                         trade_id=trade_id,
#                         action="CLOSE_BUY",
#                         timestamp=index,
#                         price=price,
#                         profit=profit
#                     ))
#                     trade_id += 1
#
#                 position = 'SELL'
#                 entry_price = price
#                 trades.append(TradeBTO(
#                     trade_id=trade_id,
#                     action="SELL",
#                     timestamp=index,
#                     price=price,
#                     profit=0
#                 ))
#                 trade_id += 1
#
#         return BacktestResultBTO(
#             trades=trades,
#             total_profit=total_profit,
#             candles=[CandleBTO(**c) for c in candles]
#         )

from typing import List, Optional
from sqlalchemy.orm import Session
from business.bao.interfaces.backtest_bao_interface import BacktestBAOInterface
from business.bto.backtest_bto import BacktestBTO
from business.mappers.backtest_mapper import BacktestMapper
from business.utils.backtest_data_loader import UniversalDataLoader
from persistence.dal.backtest_dal import BacktestDAL
from datetime import datetime
import pandas as pd

class BacktestBAOService(BacktestBAOInterface):
    def __init__(self, db: Session, backtest_dal: BacktestDAL):
        self.dal = backtest_dal

    def create_backtest(self, bto: BacktestBTO) -> BacktestBTO:
        loader, mapped_symbol = UniversalDataLoader.get_loader_and_symbol(bto.symbol)
        start_date = datetime.strptime(bto.start_date, "%Y-%m-%d") \
            if isinstance(bto.start_date, str) else bto.start_date
        end_date = datetime.strptime(bto.end_date, "%Y-%m-%d") \
            if isinstance(bto.end_date, str) else bto.end_date

        df, candles = loader.get_historical_data(
            symbol=mapped_symbol,
            interval=bto.time_frame,
            start=start_date.strftime("%Y-%m-%d"),
            end=end_date.strftime("%Y-%m-%d")
        )

        df["SMA_10"] = df["close"].rolling(window=10).mean()

        position = None
        entry_price = 0
        trades = []
        total_profit = 0
        trade_id = 0

        for index, row in df.iterrows():
            price = row["close"].item() if isinstance(row["close"], pd.Series) else float(row["close"])
            sma_value = row.get("SMA_10", None)
            if isinstance(sma_value, pd.Series):
                sma_value = sma_value.iloc[0]
            sma = float(sma_value) if pd.notna(sma_value) else None
            if sma is None:
                continue

            if price > sma and position != 'BUY':
                if position == 'SELL':
                    total_profit += entry_price - price
                    trades.append({"trade_id": trade_id, "action": "CLOSE_SELL", "timestamp": index.isoformat(), "price": price, "profit": entry_price - price})
                    trade_id += 1
                position = 'BUY'
                entry_price = price
                trades.append({"trade_id": trade_id, "action": "BUY", "timestamp": index.isoformat(), "price": price, "profit": 0})
                trade_id += 1

            elif price < sma and position != 'SELL':
                if position == 'BUY':
                    total_profit += price - entry_price
                    trades.append({"trade_id": trade_id, "action": "CLOSE_BUY", "timestamp": index.isoformat(), "price": price, "profit": price - entry_price})
                    trade_id += 1
                position = 'SELL'
                entry_price = price
                trades.append({"trade_id": trade_id, "action": "SELL", "timestamp": index.isoformat(), "price": price, "profit": 0})
                trade_id += 1

        bto.total_profit = total_profit
        bto.trades_json = trades
        bto.candles_json = candles
        bto.created_at = datetime.utcnow()

        dto = BacktestMapper.bto_to_dto(bto)
        saved_dto = self.dal.add_backtest(dto, user_id=bto.user_id)
        return BacktestMapper.dto_to_bto(saved_dto)

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

    def update_backtest(self, backtest_id: int, updated_bto: BacktestBTO) -> Optional[BacktestBTO]:
        updated_dto = BacktestMapper.bto_to_dto(updated_bto)
        result_dto = self.dal.update_backtest(backtest_id, updated_dto)
        return BacktestMapper.dto_to_bto(result_dto) if result_dto else None
