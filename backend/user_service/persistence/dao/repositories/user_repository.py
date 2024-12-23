from sqlalchemy.orm import Session
from persistence.dao.interfaces.user_dao_interface import UserDAOInterface
from persistence.dto.user_dto import UserDTO
from persistence.entities.user_entity import UserEntity
from persistence.mappers.user_mapper import UserMapper


class UserRepository(UserDAOInterface):
    def __init__(self, db: Session):
        self.db = db

    # Getters
    def get_user_by_id(self, user_id: int) -> UserDTO:
        user_entity = self.db.query(UserEntity).filter(UserEntity.id == user_id).first()
        return UserMapper.entity_to_dto(user_entity) if user_entity else None

    def get_user_by_fist_name(self, first_name: str) -> UserDTO:
        user_entity = self.db.query(UserEntity).filter(UserEntity.first_name == first_name).first()
        return UserMapper.entity_to_dto(user_entity) if user_entity else None

    def get_user_by_last_name(self, last_name: str) -> UserDTO:
        user_entity = self.db.query(UserEntity).filter(UserEntity.last_name == last_name).first()
        return UserMapper.entity_to_dto(user_entity) if user_entity else None

    def get_user_by_email(self, email: str) -> UserDTO:
        user_entity = self.db.query(UserEntity).filter(UserEntity.email == email).first()
        return UserMapper.entity_to_dto(user_entity) if user_entity else None

    # Create & delete
    def create_user(self, user_dto: UserDTO) -> UserDTO:
        user_entity = UserMapper.dto_to_entity(user_dto, hashed_password="default_hashed_password")
        self.db.add(user_entity)
        self.db.commit()
        self.db.refresh(user_entity)
        return UserMapper.entity_to_dto(user_entity)

    def delete_user(self, user_id: int) -> None:
        user_entity = self.db.query(UserEntity).filter(UserEntity.id == user_id).first()
        if user_entity:
            self.db.delete(user_entity)
            self.db.commit()

    # Setters
    def update_user_first_name(self, user_id: int, first_name: str) -> UserDTO:
        user_entity = self.db.query(UserEntity).filter(UserEntity.id == user_id).first()
        if user_entity:
            user_entity.first_name = first_name
            self.db.commit()
            self.db.refresh(user_entity)
            return UserMapper.entity_to_dto(user_entity)
        return None

    def update_user_last_name(self, user_id: int, last_name: str) -> UserDTO:
        user_entity = self.db.query(UserEntity).filter(UserEntity.id == user_id).first()
        if user_entity:
            user_entity.last_name = last_name
            self.db.commit()
            self.db.refresh(user_entity)
            return UserMapper.entity_to_dto(user_entity)
        return None

    def update_user_email(self, user_id: int, email: str) -> UserDTO:
        user_entity = self.db.query(UserEntity).filter(UserEntity.id == user_id).first()
        if user_entity:
            user_entity.email = email
            self.db.commit()
            self.db.refresh(user_entity)
            return UserMapper.entity_to_dto(user_entity)
        return None

    def update_user_phone(self, user_id: int, phone: str) -> UserDTO:
        user_entity = self.db.query(UserEntity).filter(UserEntity.id == user_id).first()
        if user_entity:
            user_entity.phone = phone
            self.db.commit()
            self.db.refresh(user_entity)
            return UserMapper.entity_to_dto(user_entity)
        return None

    def update_user_gender(self, user_id: int, gender: str) -> UserDTO:
        user_entity = self.db.query(UserEntity).filter(UserEntity.id == user_id).first()
        if user_entity:
            user_entity.gender = gender
            self.db.commit()
            self.db.refresh(user_entity)
            return UserMapper.entity_to_dto(user_entity)
        return None

    def update_user_country(self, user_id: int, country: str) -> UserDTO:
        user_entity = self.db.query(UserEntity).filter(UserEntity.id == user_id).first()
        if user_entity:
            user_entity.country = country
            self.db.commit()
            self.db.refresh(user_entity)
            return UserMapper.entity_to_dto(user_entity)
        return None

    # Getters - multiple rows
    def get_all_users(self) -> list[UserDTO]:
        users = self.db.query(UserEntity).all()
        return [UserMapper.entity_to_dto(user) for user in users]

