from typing import Optional

from business.bto.user_bto import UserBTO
from business.bao.interfaces.user_bao_interface import UserBAOInterface
from business.mappers.user_mapper import UserMapper
from persistence.dao.repositories.user_repository import UserRepository

class UserBAOService(UserBAOInterface):
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def create_user(self, user_bto: UserBTO) -> UserBTO:
        # Mapper pentru conversia BTO -> DTO
        user_dto = UserMapper.bto_to_dto(user_bto)
        created_user_dto = self.user_repository.create_user(user_dto)
        return UserMapper.dto_to_bto(created_user_dto)

    def get_user_by_id(self, user_id: int) -> Optional[UserBTO]:
        user_dto = self.user_repository.get_user_by_id(user_id)
        return UserMapper.dto_to_bto(user_dto) if user_dto else None

    def get_user_by_email(self, email: str) -> bool:
        return self.user_repository.get_user_by_email(email) is not None
