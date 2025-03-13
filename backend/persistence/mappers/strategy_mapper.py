from persistence.entities.strategy_entity import Strategy

class StrategyMapper:
    @staticmethod
    def entity_to_dto(strategy: Strategy) -> dict:
        return {
            "id": strategy.id,
            "name": strategy.name,
            "description": strategy.description,
            "created_by": strategy.created_by,
            "created_at": strategy.created_at,
        }

    @staticmethod
    def dto_to_entity(dto: dict) -> Strategy:
        return Strategy(
            id=dto.get("id"),
            name=dto.get("name"),
            description=dto.get("description"),
            created_by=dto.get("created_by"),
            created_at=dto.get("created_at"),
        )
