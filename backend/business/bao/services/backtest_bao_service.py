import random
from datetime import datetime
import pandas as pd
from business.bto.backtest_bto import BacktestRequestBTO, BacktestResultBTO, TradeBTO, CandleBTO
from business.utils.data_loader import BinanceLoader

class BacktestService:

    @staticmethod
    def run_backtest(request: BacktestRequestBTO) -> BacktestResultBTO:
        loader = BinanceLoader()
        df, candles = loader.get_historical_data(
            symbol=request.symbol,
            interval=request.timeframe,
            start=request.start_date,
            end=request.end_date
        )

        df["SMA_10"] = df["close"].rolling(window=10).mean()

        position = None  # None, 'BUY', 'SELL'
        entry_price = 0
        trades = []
        total_profit = 0
        trade_id = 0

        for index, row in df.iterrows():
            price = float(row["close"])
            sma = float(row["SMA_10"]) if not pd.isna(row["SMA_10"]) else None

            if sma is None:
                continue

            if price > sma and position != 'BUY':
                if position == 'SELL':
                    profit = entry_price - price
                    total_profit += profit
                    trades.append(TradeBTO(
                        trade_id=trade_id,
                        action="CLOSE_SELL",
                        timestamp=index,
                        price=price,
                        profit=profit
                    ))
                    trade_id += 1

                position = 'BUY'
                entry_price = price
                trades.append(TradeBTO(
                    trade_id=trade_id,
                    action="BUY",
                    timestamp=index,
                    price=price,
                    profit=0
                ))
                trade_id += 1

            elif price < sma and position != 'SELL':
                if position == 'BUY':
                    profit = price - entry_price
                    total_profit += profit
                    trades.append(TradeBTO(
                        trade_id=trade_id,
                        action="CLOSE_BUY",
                        timestamp=index,
                        price=price,
                        profit=profit
                    ))
                    trade_id += 1

                position = 'SELL'
                entry_price = price
                trades.append(TradeBTO(
                    trade_id=trade_id,
                    action="SELL",
                    timestamp=index,
                    price=price,
                    profit=0
                ))
                trade_id += 1

        return BacktestResultBTO(
            trades=trades,
            total_profit=total_profit,
            candles=[
                CandleBTO(**c) for c in candles
            ]
        )
