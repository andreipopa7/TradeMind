from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Import pentru CORS

from presentation.pao.services.user_pao_service import UserPAOService
from business.bal.user_bal import UserBAL
from persistence.dal.database import get_db
from persistence.dao.repositories.user_repository import UserRepository
from presentation.pal.user_pal import UserPAL

# Inițializează aplicația FastAPI
app = FastAPI()

# Configurare CORS
origins = [
    "http://localhost:3000",  # React frontend
    "http://127.0.0.1:3000",  # Alternativă pentru localhost
    "*"                       # Permite orice origine (doar pentru testare; nu în producție!)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Listează originile permise
    allow_credentials=True,
    allow_methods=["*"],  # Permite toate metodele (GET, POST, etc.)
    allow_headers=["*"],  # Permite toate headerele
)

# Creează dependințele pentru servicii
db = next(get_db())
user_repository = UserRepository(db)
user_bal = UserBAL(user_repository)
user_pao = UserPAOService()
user_pal = UserPAL(user_bal, user_pao)

@app.post("/users")
def create_user(user_data: dict):
    try:
        return user_pal.register_user(user_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/users/{user_id}")
def get_user(user_id: int):
    user_details = user_pal.get_user_details(user_id)
    if not user_details:
        raise HTTPException(status_code=404, detail="User not found")
    return user_details

