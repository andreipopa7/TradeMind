from enum import Enum as PyEnum


class TradeType(PyEnum):
    BUY      = "buy"
    SELL     = "sell"
    UNKNOWN = "unknown"

class SourceType(PyEnum):
    USER     = "user"
    BACKTEST = "backtest"
    UNKNOWN = "unknown"

class SessionType(PyEnum):
    ASIA     = "Asia"
    LONDON   = "London"
    NEW_YORK = "NewYork"
    UNKNOWN = "Unknown"



