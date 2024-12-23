from persistence.dto.user_dto import UserDTO
from persistence.entities.user_entity import UserEntity

class UserMapper:
    @staticmethod
    def entity_to_dto(user_entity: UserEntity) -> UserDTO:
        return UserDTO(
            id=user_entity.id,
            first_name=user_entity.first_name,
            last_name=user_entity.last_name,
            email=user_entity.email,
            phone=user_entity.phone,
            gender=user_entity.gender,
            country=user_entity.country
        )

    @staticmethod
    def dto_to_entity(user_dto: UserDTO, hashed_password: str) -> UserEntity:
        return UserEntity(
            id=user_dto.id,
            first_name=user_dto.first_name,
            last_name=user_dto.last_name,
            email=user_dto.email,
            password=hashed_password,
            phone=user_dto.phone,
            gender=user_dto.gender,
            country=user_dto.country
        )
