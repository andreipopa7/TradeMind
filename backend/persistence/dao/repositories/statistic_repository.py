from sqlalchemy.orm import Session
from typing import List, Optional
from persistence.entities.statistic_entity import StatisticEntity
from persistence.dto.statistic_dto import StatisticDTO
from persistence.mappers.statistic_mapper import StatisticMapper


class StatisticRepository:
    def __init__(self, db: Session):
        self.db = db

    # 🔹Create & Delete
    def add_statistic(self, statistic_dto: StatisticDTO, user_id: int) -> StatisticDTO:
        statistic_entity = StatisticMapper.dto_to_entity(statistic_dto)
        statistic_entity.user_id = user_id

        self.db.add(statistic_entity)
        self.db.commit()
        self.db.refresh(statistic_entity)
        return StatisticMapper.entity_to_dto(statistic_entity)

    def delete_statistic(self, statistic_id: int) -> bool:
        statistic = self.db.query(StatisticEntity).filter(StatisticEntity.id == statistic_id).first()
        if not statistic:
            return False
        self.db.delete(statistic)
        self.db.commit()
        return True


    # Getters
    def get_statistic_by_id(self, statistic_id: int) -> Optional[StatisticDTO]:
        statistic = self.db.query(StatisticEntity).filter(StatisticEntity.id == statistic_id).first()
        return StatisticMapper.entity_to_dto(statistic) if statistic else None

    def get_statistics_by_user(self, user_id: int) -> List[StatisticDTO]:
        statistics = self.db.query(StatisticEntity).filter(StatisticEntity.user_id == user_id).all()
        return [StatisticMapper.entity_to_dto(stat) for stat in statistics]


    # Setters
    def update_statistic(self, statistic_id: int, updated_statistic_dto: StatisticDTO) -> Optional[StatisticDTO]:
        statistic = self.db.query(StatisticEntity).filter(StatisticEntity.id == statistic_id).first()

        if not statistic:
            return None

        # Excludem `id` și `user_id` de la actualizare
        update_fields = {k: v for k, v in updated_statistic_dto.dict().items() if k not in ["id", "user_id"] and v is not None}

        for key, value in update_fields.items():
            setattr(statistic, key, value)

        self.db.commit()
        self.db.refresh(statistic)
        return StatisticMapper.entity_to_dto(statistic)
