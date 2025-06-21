from persistence.entities.backtest_entity import BacktestEntity
from persistence.dto.backtest_dto import BacktestDTO

class BacktestMapper:
    @staticmethod
    def entity_to_dto(backtest: BacktestEntity) -> BacktestDTO:
        return BacktestDTO(
            id            = backtest.id,
            user_id       = backtest.user_id,
            strategy_id   = backtest.strategy_id,
            symbol        = backtest.symbol,
            source        = backtest.source,
            time_frame    = backtest.time_frame,
            start_date    = backtest.start_date,
            end_date      = backtest.end_date,
            total_profit  = backtest.total_profit,
            trades_json   = backtest.trades_json,
            candles_json  = backtest.candles_json,
            created_at    = backtest.created_at
        )

    @staticmethod
    def dto_to_entity(dto: BacktestDTO) -> BacktestEntity:
        return BacktestEntity(
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
