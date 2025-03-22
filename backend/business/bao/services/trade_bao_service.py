from datetime import time, datetime
from typing import List, Optional
from business.bto.trade_bto import TradeBTO
from business.mappers.trade_mapper import TradeMapper
from persistence.dal.trade_dal import TradeDAL
from business.bao.interfaces.trade_bao_interface import TradeBAOInterface
from persistence.entities.utils_entity import SourceType, SessionType, TradeType


def get_session_from_open_time(trade_bto: TradeBTO) -> SessionType:
    open_time_raw = trade_bto.open_time

    if isinstance(open_time_raw, str):
        try:
            open_time = datetime.strptime(open_time_raw, "%H:%M").time()
        except ValueError:
            return SessionType.UNKNOWN
    else:
        open_time = open_time_raw

    if time(0, 0) <= open_time < time(10, 0):
        return SessionType.ASIA
    elif time(10, 0) <= open_time < time(14, 0):
        return SessionType.LONDON
    elif time(14, 0) <= open_time < time(21, 0):
        return SessionType.NEW_YORK
    else:
        return SessionType.UNKNOWN

def is_valid_time_and_date(trade_bto: TradeBTO) -> None:
    if trade_bto.close_date:
        if trade_bto.close_date < trade_bto.open_date:
            raise ValueError("Invalid trade: close_date must be after or equal to open_date.")

        if trade_bto.close_time:
            if trade_bto.close_date == trade_bto.open_date and trade_bto.close_time <= trade_bto.open_time:
                raise ValueError("Invalid trade: on the same date, close_time must be after open_time.")
    else:
        if trade_bto.close_time:
            if trade_bto.close_time <= trade_bto.open_time:
                raise ValueError("Invalid trade: if close_date is not set, close_time must be after open_time.")

def is_valid_price(trade_bto: TradeBTO) -> None:
    if trade_bto.type == "sell":
        if trade_bto.tp_price and trade_bto.tp_price >= trade_bto.open_price:
            raise ValueError("Invalid SELL trade: Take-Profit (TP) should be < open_price.")
        if trade_bto.sl_price and trade_bto.sl_price <= trade_bto.open_price:
            raise ValueError("Invalid SELL trade: Stop-Loss (SL) should be > open_price.")

    if trade_bto.type == "buy":
        if trade_bto.tp_price and trade_bto.tp_price <= trade_bto.open_price:
            raise ValueError("Invalid BUY trade: Take-Profit (TP) should be > open_price.")
        if trade_bto.sl_price and trade_bto.sl_price >= trade_bto.open_price:
            raise ValueError("Invalid BUY trade: Stop-Loss (SL) should be < open_price.")

def calculate_pips(trade_bto: TradeBTO) -> float:
    if trade_bto.open_price is None or trade_bto.close_price is None:
        return 0.0

    price_diff = abs(trade_bto.close_price - trade_bto.open_price)
    avg_price = (trade_bto.close_price + trade_bto.open_price) / 2

    if avg_price < 10:
        return price_diff * 10000
    elif 10 <= avg_price < 1000:
        return price_diff * 100
    elif 1000 <= avg_price < 10000:
        return price_diff / 10
    else:
        return price_diff


class TradeBAOService(TradeBAOInterface):
    def __init__(self, trade_dal: TradeDAL):
        self.dal = trade_dal

    def add_trade(self, trade_bto: TradeBTO) -> TradeBTO:
        is_valid_time_and_date(trade_bto)
        is_valid_price(trade_bto)
        trade_bto.pips = calculate_pips(trade_bto)


        trade_dto = TradeMapper.bto_to_dto(trade_bto)
        trade_dto.session = get_session_from_open_time(trade_bto)
        saved_trade_dto = self.dal.add_trade(trade_dto, trade_bto.user_id)
        return TradeMapper.dto_to_bto(saved_trade_dto)

    def get_trades_by_user(self, user_id: int) -> List[TradeBTO]:
        trade_dtos = self.dal.get_trades_by_source(user_id, source=SourceType.USER)
        return [TradeMapper.dto_to_bto(trade) for trade in trade_dtos]

    def get_trades_by_field(self, user_id: int, source: Optional[SourceType] = None, **filters) -> List[TradeBTO]:
        processed_filters = {}

        if filters.get("market"):
            processed_filters["market"] = filters["market"]

        if filters.get("type"):
            processed_filters["type"] = filters["type"]

        if filters.get("open_date"):
            processed_filters["open_date"] = filters["open_date"]

        if filters.get("close_date"):
            processed_filters["close_date"] = filters["close_date"]

        if filters.get("session"):
            processed_filters["session"] = filters["session"]

        if filters.get("profit_filter"):
            if filters["profit_filter"] == "win":
                processed_filters["profit__gte"] = 0

            elif filters["profit_filter"] == "lose":
                processed_filters["profit__lt"] = 0

        trade_dtos = self.dal.get_trades_by_field(user_id, source, **processed_filters)
        return [TradeMapper.dto_to_bto(trade) for trade in trade_dtos]

    def update_trade(self, trade_id: int, updated_trade_bto: TradeBTO) -> Optional[TradeBTO]:
        is_valid_time_and_date(updated_trade_bto)
        is_valid_price(updated_trade_bto)
        updated_trade_bto.pips = calculate_pips(updated_trade_bto)

        updated_trade_dto = TradeMapper.bto_to_dto(updated_trade_bto)
        updated_trade_dto.session = get_session_from_open_time(updated_trade_bto)
        result_dto = self.dal.update_trade(trade_id, updated_trade_dto)
        return TradeMapper.dto_to_bto(result_dto) if result_dto else None

    def delete_trade(self, trade_id: int) -> bool:
        return self.dal.delete_trade(trade_id)
