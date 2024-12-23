from business.bal.user_bal import UserBAL
from presentation.pao.interfaces.user_pao_interface import UserPAOInterface

class UserPAL:
    def __init__(self, user_bal: UserBAL, user_pao: UserPAOInterface):
        self.user_bal = user_bal
        self.user_pao = user_pao

    def register_user(self, user_data: dict) -> dict:
        # Transformă datele primite într-un format BTO
        user_bto = self.user_pao.validate_and_convert_to_bto(user_data)
        created_user = self.user_bal.register_user(user_bto)
        return self.user_pao.convert_bto_to_response(created_user)

    def get_user_details(self, user_id: int) -> dict:
        user_bto = self.user_bal.get_user_details(user_id)
        return self.user_pao.convert_bto_to_response(user_bto)
