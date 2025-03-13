from persistence.entities.backtest_entity import Backtest

class BacktestMapper:
    @staticmethod
    def entity_to_dto(user_entity: Backtest) -> BacktestDTO:
        return BacktestDTO(

        )