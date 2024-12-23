from typing import List
from persistence.dto.user_dto import UserDTO

class UserDAOInterface:
    # Getters
    def get_user_by_id(self, user_id: int) -> UserDTO:
        pass

    def get_user_by_fist_name(self, first_name: str) -> UserDTO:
        pass

    def get_user_by_last_name(self, last_name: str) -> UserDTO:
        pass

    def get_user_by_email(self, email: str) -> UserDTO:
        pass

    # Create & delete
    def create_user(self, user_dto: UserDTO) -> UserDTO:
        pass

    def delete_user(self, user_id: int) -> None:
        pass

    # Setters
    def update_user_first_name(self, user_id: int, first_name: str) -> UserDTO:
        pass

    def update_user_last_name(self, user_id: int, last_name: str) -> UserDTO:
        pass

    def update_user_email(self, user_id: int, email: str) -> UserDTO:
        pass

    def update_user_phone(self, user_id: int, phone: str) -> UserDTO:
        pass

    def update_user_gender(self, user_id: int, phone: str) -> UserDTO:
        pass

    def update_user_country(self, user_id: int, country: str) -> UserDTO:
        pass

    # Getters - multiple rows
    def get_all_users(self) -> List[UserDTO]:
        pass
