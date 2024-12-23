class UserUtils:
    @staticmethod
    def validate_email(email: str) -> bool:
        # Simplu exemplu de validare email
        return "@" in email and "." in email

    @staticmethod
    def format_phone_number(phone: str) -> str:
        # Exemple de normalizare a numărului de telefon
        return phone.replace("-", "").replace(" ", "")
