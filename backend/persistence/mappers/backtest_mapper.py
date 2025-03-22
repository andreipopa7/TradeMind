from persistence.entities.backtest_entity import BacktestEntity
from persistence.dto.backtest_dto import BacktestDTO


class BacktestMapper:
    @staticmethod
    def entity_to_dto(backtest: BacktestEntity) -> BacktestDTO:
        return BacktestDTO(
            id          = backtest.id,
            user_id     = backtest.user_id,
            strategy_id = backtest.strategy_id,
            time_frame  = backtest.time_frame,
            start_date  = backtest.start_date,
            end_date    = backtest.end_date,
            created_at  = backtest.created_at
        )

    @staticmethod
    def dto_to_entity(dto: BacktestDTO) -> BacktestEntity:
        return BacktestEntity(
            id          = dto.id,
            user_id     = dto.user_id,
            strategy_id = dto.strategy_id,
            time_frame  = dto.time_frame,
            start_date  = dto.start_date,
            end_date    = dto.end_date,
            created_at  = dto.created_at
        )
