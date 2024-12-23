from business.bao.services.user_bao_service import UserBAOService
from business.bto.user_bto import UserBTO

class UserBAL:
    def __init__(self, bao_service: UserBAOService):
        self.bao_service = bao_service

    def register_user(self, user_bto: UserBTO) -> UserBTO:
        if self.bao_service.get_user_by_email(user_bto.email):
            raise ValueError("User with this email already exists.")
        return self.bao_service.create_user(user_bto)

    def get_user_details(self, user_id: int) -> UserBTO:
        return self.bao_service.get_user_by_id(user_id)
