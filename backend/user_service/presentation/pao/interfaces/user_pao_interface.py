from typing import Dict
from business.bto.user_bto import UserBTO

class UserPAOInterface:
    def validate_and_convert_to_bto(self, user_data: Dict) -> UserBTO:
        pass

    def convert_bto_to_response(self, user_bto: UserBTO) -> Dict:
        pass
