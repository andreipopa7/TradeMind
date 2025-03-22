from persistence.entities.strategy_entity import StrategyEntity
from persistence.dto.strategy_dto import StrategyDTO


class StrategyMapper:
    @staticmethod
    def entity_to_dto(strategy: StrategyEntity) -> StrategyDTO:
        return StrategyDTO(
            id          = strategy.id,
            name        = strategy.name,
            parameters  = strategy.parameters
        )

    @staticmethod
    def dto_to_entity(dto: StrategyDTO) -> StrategyEntity:
        return StrategyEntity(
            id          = dto.id,
            name        = dto.name,
            parameters  = dto.parameters
        )
