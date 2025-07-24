from typing import List, Dict
import math


class BacktestExecutor:
    def __init__(self, initial_balance: float = 100000.0, risk_per_trade: float = 1.0):
        self.initial_balance = initial_balance
        self.risk_per_trade = risk_per_trade

        self.equity = initial_balance
        self.equity_curve = [initial_balance]

        self.total_profit = 0.0
        self.wins = 0
        self.losses = 0
        self.profit_sum = 0.0
        self.loss_sum = 0.0
        self.total_return = 0.0
        self.nr_trades = 0

    def simulate_trades(self, trades: List[Dict]) -> Dict:
        position = None
        entry_price = None
        entry_index = None

        for i, trade in enumerate(trades):
            action = trade["action"]
            price = trade["price"]

            if position is None:
                # Intrare în poziție
                position = action
                entry_price = price
                entry_index = i
            else:
                # Ieșire din poziție → calcul profit
                exit_price = price
                direction = position

                if direction == "BUY":
                    profit = exit_price - entry_price
                else:  # SELL
                    profit = entry_price - exit_price

                # Atribuie profit trade-ului de închidere
                trades[i]["profit"] = round(profit, 2)

                # (Opțional) și trade-ului de intrare, pentru frontend sincronizat
                trades[entry_index]["profit"] = round(profit, 2)

                self.nr_trades += 1
                self.equity += profit
                self.equity_curve.append(self.equity)
                self.total_profit += profit

                if profit > 0:
                    self.wins += 1
                    self.profit_sum += profit
                elif profit < 0:
                    self.losses += 1
                    self.loss_sum += abs(profit)

                # Reset poziția
                position = None
                entry_price = None
                entry_index = None

        winrate = (self.wins / self.nr_trades * 100) if self.nr_trades else 0
        profit_factor = (self.profit_sum / self.loss_sum) if self.loss_sum else math.inf
        expectancy = (self.total_profit / self.nr_trades) if self.nr_trades else 0
        max_dd = self._calculate_max_drawdown()

        return {
            "total_profit": round(self.total_profit, 2),
            "drawdown_max": round(max_dd, 2),
            "winrate": round(winrate, 2),
            "nr_trades": self.nr_trades,
            "profit_factor": round(profit_factor, 2) if profit_factor != math.inf else None,
            "expectancy": round(expectancy, 2),
        }

    def _calculate_max_drawdown(self) -> float:
        peak = self.equity_curve[0]
        max_dd = 0.0
        for balance in self.equity_curve:
            if balance > peak:
                peak = balance
            drawdown = peak - balance
            max_dd = max(max_dd, drawdown)
        return max_dd
