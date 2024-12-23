import grpc
import proto.auth_pb2 as auth_pb2
import proto.auth_pb2_grpc as auth_pb2_grpc

def run():
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = auth_pb2_grpc.AuthServiceStub(channel)

        # Test pentru înregistrare
        response = stub.RegisterUser(auth_pb2.RegisterRequest(
            first_name="John",
            last_name="Doe",
            email="john.doe@example.com",
            phone="1234567890",
            gender="Male",
            country="USA"
        ))
        print(f"Registered User: {response}")

        # Test pentru obținerea utilizatorului
        user_response = stub.GetUser(auth_pb2.UserRequest(user_id=1))
        print(f"Fetched User: {user_response}")

if __name__ == "__main__":
    run()
