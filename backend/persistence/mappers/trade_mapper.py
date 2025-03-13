from persistence.dto.trade_dto import TradeDTO
from persistence.entities.trade_entity import Trade

class TradeMapper:
    @staticmethod
    def entity_to_dto(trade: Trade) -> TradeDTO:
        return TradeDTO(
            id          = trade.id,
            account_id  = trade.account_id,
            open_date   = trade.open_date,
            type        = trade.type,
            symbol      = trade.symbol,
            volume      = trade.volume,
            open_price  = trade.open_price,

            sl_price    = trade.sl_price,
            tp_price    = trade.tp_price,
            close_price = trade.close_price,
            close_date  = trade.close_date,
            swap        = trade.swap,
            commission  = trade.commission,
            profit      = trade.profit,
            pips        = trade.pips,
        )

    @staticmethod
    def dto_to_entity(dto: TradeDTO) -> Trade:
        return Trade(
            id          = dto.id,
            account_id  = dto.account_id,
            open_date   = dto.open_date,
            type        = dto.type,
            symbol      = dto.symbol,
            volume      = dto.volume,
            open_price  = dto.open_price,

            sl_price    = dto.sl_price,
            tp_price    = dto.tp_price,
            close_price = dto.close_price,
            close_date  = dto.close_date,
            swap        = dto.swap,
            commission  = dto.commission,
            profit      = dto.profit,
            pips        = dto.pips,
        )
