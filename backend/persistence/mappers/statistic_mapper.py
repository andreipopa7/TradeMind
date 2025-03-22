from persistence.dto.statistic_dto import StatisticDTO
from persistence.entities.statistic_entity import StatisticEntity


class StatisticMapper:
    @staticmethod
    def entity_to_dto(statistic: StatisticEntity) -> StatisticDTO:
        return StatisticDTO(
            id          = statistic.id,
            user_id     = statistic.user_id,
            created_at  = statistic.created_at,
            params      = statistic.params
        )

    @staticmethod
    def dto_to_entity(dto: StatisticDTO) -> StatisticEntity:
        return StatisticEntity(
            id          = dto.id,
            user_id     = dto.user_id,
            created_at  = dto.created_at,
            params      = dto.params
        )
