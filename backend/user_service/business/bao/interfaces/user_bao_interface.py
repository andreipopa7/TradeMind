from typing import Optional
from business.bto.user_bto import UserBTO

class UserBAOInterface:
    def create_user(self, user_bto: UserBTO) -> UserBTO:
        pass

    def get_user_by_id(self, user_id: int) -> Optional[UserBTO]:
        pass

    def check_user_exists(self, email: str) -> bool:
        pass
