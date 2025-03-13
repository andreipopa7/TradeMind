import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from persistence.entities.trading_account_entity import TradingAccountEntity, Base
from persistence.dao.repositories.trading_account_repository import TradingAccountRepository

@pytest.fixture
def test_db():
    engine = create_engine("sqlite:///:memory:", echo=True)
    Base.metadata.create_all(engine)  # Creează toate tabelele
    TestingSessionLocal = sessionmaker(bind=engine)
    return TestingSessionLocal()

def test_get_user_accounts(test_db):
    session = test_db
    repo = TradingAccountRepository(session)

    test_accounts = [
        TradingAccountEntity(user_email="testuser@gmail.com", broker_name="Broker1", account_id=12345, server="Server1", password="pass1"),
        TradingAccountEntity(user_email="testuser@gmail.com", broker_name="Broker2", account_id=67890, server="Server2", password="pass2"),
        TradingAccountEntity(user_email="anotheruser@gmail.com", broker_name="Broker3", account_id=99999, server="Server3", password="pass3"),
    ]

    session.add_all(test_accounts)
    session.commit()

    # 🔍 Execută metoda testată
    result = repo.get_user_accounts("testuser@gmail.com")

    # ✅ Verifică dacă sunt returnate corect cele 2 conturi ale user-ului "testuser@gmail.com"
    assert len(result) == 2
    assert result[0].user_email == "testuser@gmail.com"
    assert result[1].user_email == "testuser@gmail.com"

    # 🛠️ Verifică și un utilizator fără conturi
    empty_result = repo.get_user_accounts("nouuser@gmail.com")
    assert empty_result == []

    print("✔️ Testul a trecut cu succes!")

