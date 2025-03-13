from sqlalchemy.orm import Session
import hashlib
from typing import List, Optional

from persistence.dao.interfaces.trading_account_dao_interface import TradingAccountDAOInterface
from persistence.dto.trading_account_dto import TradingAccountDTO
from persistence.entities.trading_account_entity import TradingAccountEntity
from persistence.mappers.trading_account_mapper import TradingAccountMapper

import logging

logger = logging.getLogger(__name__)
class TradingAccountRepository(TradingAccountDAOInterface):
    def __init__(self, db: Session):
        self.session = db

    # Create & Delete
    def register_trading_account(self, account_dto: TradingAccountDTO) -> TradingAccountDTO:
        # hashed_password = hashlib.md5(data.password.encode('utf-8')).hexdigest()

        # new_account = TradingAccountEntity(
        #     user_email=account_dto.user_email,
        #     broker_name=account_dto.broker_name,
        #     account_id=account_dto.account_id,
        #     server=account_dto.server,
        #     password=account_dto.password, #hashed_password,
        # )
        new_account = TradingAccountMapper.dto_to_entity(account_dto)

        self.session.add(new_account)
        self.session.commit()
        self.session.refresh(new_account)

        return TradingAccountMapper.entity_to_dto(new_account)

    def delete_trading_account(self, account_id: int) -> None:
        account = self.get_account_by_id(account_id)
        if account:
            self.session.delete(account)
            self.session.commit()


    # Get all accounts
    def get_user_accounts(self, user_email: str) -> List[TradingAccountDTO]:
        accounts = self.session.query(TradingAccountEntity).filter_by(user_email=user_email).all()
        return [TradingAccountMapper.entity_to_dto(acc) for acc in accounts]

    # Getters
    def get_account_by_id(self, account_id: int) -> Optional[TradingAccountEntity]:
        return self.session.query(TradingAccountEntity).filter_by(account_id=account_id).first()

    def get_credentials_by_id(self, account_id: int) -> Optional[TradingAccountDTO]:
        account = self.get_account_by_id(account_id)
        return TradingAccountMapper.entity_to_dto(account) if account else None

    def get_accounts_by_broker(self, broker_name: str) -> List[TradingAccountDTO]:
        accounts = self.session.query(TradingAccountEntity).filter_by(broker_name=broker_name).all()
        return [TradingAccountMapper.entity_to_dto(acc) for acc in accounts]