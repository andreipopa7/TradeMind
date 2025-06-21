from sqlalchemy.orm import Session
from typing import List, Optional
from persistence.dao.interfaces.backtest_dao_interface import BacktestDAOInterface
from persistence.entities.backtest_entity import BacktestEntity
from persistence.dto.backtest_dto import BacktestDTO
from persistence.mappers.backtest_mapper import BacktestMapper

class BacktestRepository(BacktestDAOInterface):
    def __init__(self, db: Session):
        self.db = db

    def add_backtest(self, dto: BacktestDTO, user_id: int) -> BacktestDTO:
        entity = BacktestMapper.dto_to_entity(dto)
        entity.user_id = user_id
        self.db.add(entity)
        self.db.commit()
        self.db.refresh(entity)
        return BacktestMapper.entity_to_dto(entity)

    def delete_backtest(self, backtest_id: int) -> bool:
        entity = self.db.query(BacktestEntity).filter(BacktestEntity.id == backtest_id).first()
        if not entity:
            return False
        self.db.delete(entity)
        self.db.commit()
        return True

    def get_backtest_by_id(self, backtest_id: int) -> Optional[BacktestDTO]:
        entity = self.db.query(BacktestEntity).filter(BacktestEntity.id == backtest_id).first()
        return BacktestMapper.entity_to_dto(entity) if entity else None

    def get_backtests_by_user(self, user_id: int) -> List[BacktestDTO]:
        entities = self.db.query(BacktestEntity).filter(BacktestEntity.user_id == user_id).all()
        return [BacktestMapper.entity_to_dto(e) for e in entities]

    def get_backtests_by_strategy(self, strategy_id: int) -> List[BacktestDTO]:
        entities = self.db.query(BacktestEntity).filter(BacktestEntity.strategy_id == strategy_id).all()
        return [BacktestMapper.entity_to_dto(e) for e in entities]

    def update_backtest(self, backtest_id: int, updated_dto: BacktestDTO) -> Optional[BacktestDTO]:
        backtest = self.db.query(BacktestEntity).filter(BacktestEntity.id == backtest_id).first()
        if not backtest:
            return None

        update_fields = {
            k: v for k, v in updated_dto.dict().items()
            if k not in ["id", "user_id"] and v is not None
        }

        for key, value in update_fields.items():
            setattr(backtest, key, value)

        self.db.commit()
        self.db.refresh(backtest)
        return BacktestMapper.entity_to_dto(backtest)
