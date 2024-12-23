from typing import Dict
from business.bto.user_bto import UserBTO
from presentation.pao.interfaces.user_pao_interface import UserPAOInterface

class UserPAOService(UserPAOInterface):
    def validate_and_convert_to_bto(self, user_data: Dict) -> UserBTO:
        # Validare simpla a datelor
        if "email" not in user_data or "first_name" not in user_data:
            raise ValueError("Missing required fields: email or first_name")

        # Creaza un obiect BTO
        return UserBTO(
            id=None,
            first_name=user_data["first_name"],
            last_name=user_data.get("last_name", ""),
            email=user_data["email"],
            phone=user_data["phone"],
            gender=user_data["gender"],
            country=user_data["country"]
        )

    def convert_bto_to_response(self, user_bto: UserBTO) -> Dict:
        # Transforma un BTO intr-un raspuns JSON
        return {
            "id": user_bto.id,
            "first_name": user_bto.first_name,
            "last_name": user_bto.last_name,
            "email": user_bto.email,
            "phone": user_bto.phone,
            "gender": user_bto.gender,
            "country": user_bto.country
        }
