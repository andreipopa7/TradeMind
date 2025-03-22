# from Crypto.Cipher import AES
# import base64
# import hashlib
# import os
#
# SECRET_KEY = os.getenv("AES_SECRET_KEY")
#
# def get_aes_key():
#     return hashlib.sha256(SECRET_KEY.encode()).digest()
#
# def encrypt_password(password: str) -> str:
#     """AES CBC encrypts password"""
#     key = get_aes_key()
#     cipher = AES.new(key, AES.MODE_CBC, iv=os.urandom(16))
#     padded_password = password.ljust(32)
#     encrypted_bytes = cipher.encrypt(padded_password.encode())
#     return base64.b64encode(cipher.iv + encrypted_bytes).decode()
#
# def decrypt_password(encrypted_password: str) -> str:
#     """AES CBC decrypts password"""
#     key = get_aes_key()
#     encrypted_bytes = base64.b64decode(encrypted_password)
#     iv = encrypted_bytes[:16]
#     cipher = AES.new(key, AES.MODE_CBC, iv)
#     decrypted_bytes = cipher.decrypt(encrypted_bytes[16:])
#     return decrypted_bytes.decode().strip()
