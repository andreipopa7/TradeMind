from business.bto.backtest_bto import BacktestBTO
from persistence.dto.backtest_dto import BacktestDTO

class BacktestMapper:
    @staticmethod
    def dto_to_bto(dto: BacktestDTO) -> BacktestBTO:
        return BacktestBTO(
            id            = dto.id,
            user_id       = dto.user_id,
            strategy_id   = dto.strategy_id,

            symbol        = dto.symbol,
            source        = dto.source,
            time_frame    = dto.time_frame,
            start_date    = dto.start_date,
            end_date      = dto.end_date,

            total_profit  = dto.total_profit,
            trades_json   = dto.trades_json,
            candles_json  = dto.candles_json,

            created_at    = dto.created_at
        )

    @staticmethod
    def bto_to_dto(bto: BacktestBTO) -> BacktestDTO:
        return BacktestDTO(
            id            = bto.id,
            user_id       = bto.user_id,
            strategy_id   = bto.strategy_id,

            symbol        = bto.symbol,
            source        = bto.source,
            time_frame    = bto.time_frame,
            start_date    = bto.start_date,
            end_date      = bto.end_date,

            total_profit  = bto.total_profit,
            trades_json   = bto.trades_json,
            candles_json  = bto.candles_json,

            created_at    = bto.created_at
        )
