import hashlib
import grpc
import jwt
import uuid
import logging
from concurrent import futures
from datetime import datetime, timedelta
from peewee import DoesNotExist
from auth_model import AuthTable
from auth_database import db

import gRPC_pb2
import gRPC_pb2_grpc

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

SECRET_KEY = "!@#456789ABCD"
ISSUER = "http://localhost:50051"


class AuthService(gRPC_pb2_grpc.AuthServiceServicer):
    def Authenticate(self, request, context):
        logging.info(f"Attempting to authenticate user: {request.username}")
        try:
            user = AuthTable.get(AuthTable.username == request.username)

            if not hashlib.md5(request.password.encode("utf-8")).hexdigest() == user.password:
                logging.warning("Invalid password provided")
                context.set_code(grpc.StatusCode.UNAUTHENTICATED)
                context.set_details("Invalid username or password")
                return gRPC_pb2.AuthResponse(token="")

            if user.role != request.role:
                logging.warning(f"User '{request.username}' does not have the requested role '{request.role}'")
                context.set_code(grpc.StatusCode.PERMISSION_DENIED)
                context.set_details("Invalid role")
                return gRPC_pb2.AuthResponse(token="")

            token = jwt.encode({
                "iss": ISSUER,
                "sub": str(user.uid),
                "exp": datetime.utcnow() + timedelta(hours=1),
                "role": user.role,
                "jti": str(uuid.uuid4())
            }, SECRET_KEY, algorithm="HS256")

            logging.info("Authentication successful")
            return gRPC_pb2.AuthResponse(token=token)

        except DoesNotExist:
            logging.warning(f"User '{request.username}' does not exist")
            context.set_code(grpc.StatusCode.UNAUTHENTICATED)
            context.set_details("Invalid username or password")
            return gRPC_pb2.AuthResponse(token="")

        except Exception as e:
            logging.error(f"Unexpected error during authentication: {e}")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details("An internal server error occurred")
            return gRPC_pb2.AuthResponse(token="")

    def ValidateToken(self, request, context):
        logging.info("Validating token")
        try:
            payload = jwt.decode(request.token, SECRET_KEY, algorithms=["HS256"])
            logging.info("Token is valid")
            return gRPC_pb2.TokenValidationResponse(
                is_valid=True,
                role=payload["role"],
                user_id=payload["sub"]
            )
        except jwt.ExpiredSignatureError:
            logging.warning("Token expired")
            context.set_code(grpc.StatusCode.UNAUTHENTICATED)
            context.set_details("Token expired")

        except jwt.InvalidTokenError:
            logging.warning("Invalid token")
            context.set_code(grpc.StatusCode.UNAUTHENTICATED)
            context.set_details("Invalid token")

        return gRPC_pb2.TokenValidationResponse(is_valid=False, role="", user_id="")

    def RevokeToken(self, request, context):
        logging.info("RevokeToken called")
        try:
            logging.info(f"Token revoked successfully: {request.token}")
            return gRPC_pb2.RevokeResponse(success=True)

        except Exception as e:
            logging.error(f"Error revoking token: {e}")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details("Failed to revoke token")
            return gRPC_pb2.RevokeResponse(success=False)


def server():
    try:
        logging.info("Connecting to the database...")
        db.connect()
    except Exception as e:
        logging.error(f"Database connection failed: {e}")
        return

    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    gRPC_pb2_grpc.add_AuthServiceServicer_to_server(AuthService(), server)
    server.add_insecure_port("[::]:50051")
    logging.info("Auth Service running on port 50051...")
    server.start()
    server.wait_for_termination()


if __name__ == "__main__":
    server()
