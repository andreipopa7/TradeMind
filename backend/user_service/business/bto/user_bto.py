from typing import Optional

class UserBTO:
    def __init__(self, id: Optional[int], first_name: str, last_name: str,
                 email: str, phone: str, gender: str, country: str):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone = phone
        self.gender = gender
        self.country = country
