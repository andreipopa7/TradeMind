from typing import Dict

from business.bal.user_bal import UserBAL
from business.bto.user_bto import UserBTO
from presentation.pao.interfaces.user_pao_interface import UserPAOInterface
from configurations.jwt_authentification import create_access_token, create_refresh_token ,decode_token

class UserPAOService(UserPAOInterface):
    def __init__(self, user_bal: UserBAL):
        self.user_bal = user_bal

    def request_to_bto(self, user_data: Dict) -> UserBTO:
        if "email" not in user_data or "first_name" not in user_data:
            raise ValueError("Missing required fields: email or first_name")

        return UserBTO(
            id=None,
            first_name=user_data["first_name"],
            last_name=user_data.get("last_name", ""),
            email=user_data["email"],
            password=user_data["password"],
            phone=user_data["phone"],
            gender=user_data["gender"],
            country=user_data["country"]
        )

    def bto_to_response(self, user_bto: UserBTO) -> Dict:
        return {
            "id": user_bto.id,
            "first_name": user_bto.first_name,
            "last_name": user_bto.last_name,
            "email": user_bto.email,
            "password": user_bto.password,
            "phone": user_bto.phone,
            "gender": user_bto.gender,
            "country": user_bto.country
        }


    # Getters
    def get_user_details(self, user_id: int) -> dict:
        user_bto = self.user_bal.get_user_by_id(user_id)
        return self.bto_to_response(user_bto)

    def get_user_by_password(self, password: str) -> dict:
        user_bto = self.user_bal.get_user_by_password(password)
        return self.bto_to_response(user_bto)


    # Get all users
    def get_all_users(self) -> list[dict]:
        users_bto = self.user_bal.get_all_users()
        return [self.bto_to_response(user) for user in users_bto]


    # Create & Delete
    def register_user(self, user_data: dict) -> dict:
        user_bto = self.request_to_bto(user_data)
        created_user = self.user_bal.register_user(user_bto)
        return self.bto_to_response(created_user)

    def delete_user(self, email: str) -> None:
        self.user_bal.delete_user(email)


    # Updates
    def update_user_details(self, user_id: int, updated_data: dict) -> dict:
        user_bto = self.request_to_bto(updated_data)
        updated_user = self.user_bal.update_user(user_id, user_bto)
        return self.bto_to_response(updated_user)

    def reset_password(self, email: str, current_password: str, new_password: str) -> None:
        self.user_bal.update_user_password(email, current_password, new_password)

    def login_user(self, user_data: dict) -> dict:
        email = user_data.get("email")
        password = user_data.get("password")
        if not email or not password:
            raise ValueError("Email and password are required")

        authenticated_user = self.user_bal.get_user_by_email_and_password(email, password)
        access_token = create_access_token(email=str(authenticated_user.email))
        refresh_token = create_refresh_token(email=str(authenticated_user.email))

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": self.bto_to_response(authenticated_user)
        }

