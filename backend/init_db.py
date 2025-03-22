import time
from sqlalchemy.exc import OperationalError
from database import engine, Base
from persistence.entities.user_entity import UserEntity
from persistence.entities.trading_account_entity import TradingAccountEntity
from persistence.entities.trade_entity import TradeEntity
from persistence.entities.backtest_entity import BacktestEntity
from persistence.entities.strategy_entity import StrategyEntity

# from persistence.entities.event_entity import EventEntity



def wait_for_db():
    retries = 5
    while retries > 0:
        try:
            with engine.connect() as conn:
                print("Database is ready.")
                return
        except OperationalError as e:
            print(f"Database not ready. Retrying... Error: {e}")
            time.sleep(5)
            retries -= 1
    print("Could not connect to the database.")

def init_db():
    wait_for_db()
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
