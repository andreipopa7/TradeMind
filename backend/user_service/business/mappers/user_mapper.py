from persistence.dto.user_dto import UserDTO
from business.bto.user_bto import UserBTO

class UserMapper:
    @staticmethod
    def dto_to_bto(user_dto: UserDTO) -> UserBTO:
        return UserBTO(
            id=user_dto.id,
            first_name=user_dto.first_name,
            last_name=user_dto.last_name,
            email=user_dto.email,
            phone=user_dto.phone,
            gender=user_dto.gender,
            country=user_dto.country
        )

    @staticmethod
    def bto_to_dto(user_bto: UserBTO) -> UserDTO:
        return UserDTO(
            id=user_bto.id,
            first_name=user_bto.first_name,
            last_name=user_bto.last_name,
            email=user_bto.email,
            phone=user_bto.phone,
            gender=user_bto.gender,
            country=user_bto.country
        )
