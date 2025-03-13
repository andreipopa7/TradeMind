from presentation.pao.interfaces.user_pao_interface import UserPAOInterface
from configurations.jwt_authentification import create_access_token, create_refresh_token ,decode_token


class UserPAL:
    def __init__(self, user_pao: UserPAOInterface):
        self.user_pao = user_pao

    def get_user_details(self, user_id: int) -> dict:
        return self.user_pao.get_user_details(user_id)

    def get_user_by_password(self, password: str) -> dict:
        return self.user_pao.get_user_by_password(password)


    # Get all users
    def get_all_users(self) -> list[dict]:
        return self.user_pao.get_all_users()



    # Create & Delete
    def register_user(self, user_data: dict) -> dict:
        return self.user_pao.register_user(user_data)

    def delete_user(self, email: str) -> None:
        return self.user_pao.delete_user(email)


    # Updates
    def update_user_details(self, user_id: int, updated_data: dict) -> dict:
        return self.user_pao.update_user_details(user_id, updated_data)

    def reset_password(self, email: str, current_password: str, new_password: str) -> None:
        return self.user_pao.reset_password(email, current_password, new_password)

    def login_user(self, user_data: dict) -> dict:
        return self.user_pao.login_user(user_data)


    def validate_token(self, token: str) -> dict:
        payload = decode_token(token)
        return {"email": payload["sub"]}

    def refresh_token(self, refresh_token: str) -> dict:
        payload = decode_token(refresh_token)
        if payload["type"] != "refresh":
            raise ValueError("Invalid token type")
        new_access_token = create_access_token(email=payload["sub"])
        return {"access_token": new_access_token}


