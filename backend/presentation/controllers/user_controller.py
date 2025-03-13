from fastapi import HTTPException, APIRouter, Query
from pydantic import BaseModel

from business.bao.services.user_bao_service import UserBAOService
from persistence.dal.user_dal import UserDAL
from presentation.pao.services.user_pao_service import UserPAOService
from business.bal.user_bal import UserBAL
from database import get_db
from presentation.pal.user_pal import UserPAL
from configurations.jwt_authentification import get_current_user


router = APIRouter()


db = next(get_db())

user_dal = UserDAL(db)
user_bao = UserBAOService(user_dal)
user_bal = UserBAL(user_bao)
user_pao = UserPAOService(user_bal)
user_pal = UserPAL(user_pao)


@router.post("/api/trademind/users/register")
def create_user(user_data: dict):
    try:
        return user_pal.register_user(user_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/api/trademind/users/login")
def login_user(user_data: dict):
    try:
        return user_pal.login_user(user_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/api/trademind/users/forgot-password")
def forgot_password(user_data: dict):
    try:
        email = user_data.get("email")
        if not email:
            raise HTTPException(status_code=400, detail="Email is required")
        user_pal.start_password_reset(email)
        return {"message": "Password reset initiated"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put("/api/trademind/users/reset-password")
def reset_password(user_data: dict):
    try:
        email = user_data.get("email")
        current_password = user_data.get("current_password")
        new_password = user_data.get("new_password")

        if not email or not new_password:
            raise HTTPException(status_code=400, detail="Email and new password are required")
        user_pal.reset_password(email, current_password, new_password)
        return {"message": "Password successfully reset"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/api/trademind/users/{id}")
def get_user_details(user_id: int):
    try:
        return user_pal.get_user_details(user_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


class PasswordRequest(BaseModel):
    password: str


# Funcția de obținere a utilizatorului
@router.post("/api/trademind/users/password")
def get_user_by_password(request: PasswordRequest):
    user_entity = user_pal.get_user_by_password(request.password)

    if not user_entity:
        raise HTTPException(status_code=404, detail="User not found")

    return user_entity

# @router.get("/api/trademind/users/password")
# def get_user_by_password(password: str = Query(..., min_length=8)):
#     try:
#         return user_pal.get_user_by_password(password)
#     except ValueError as e:
#         raise HTTPException(status_code=404, detail=str(e))



@router.put("/api/trademind/users/{id}")
def update_user_details(user_id: int, user_data: dict):
    try:
        return user_pal.update_user_details(user_id, user_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/api/trademind/users/{email}")
def delete_user(email: str):
    try:
        user_pal.delete_user(email)
        return {"message": "User successfully deleted"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.get("/api/trademind/users")
def get_all_users():
    return user_pal.get_all_users()






#   Autentificare si inregistrare:
# POST /users/register - Creare utilizator nou.
# POST /users/login - Autentificare utilizator.
# POST /users/forgot-password - Inițiere recuperare parolă.
# PUT /users/reset-password - Resetarea parolei.

#   Managementul profilului:
# GET /users/{id} - Obținerea detaliilor unui utilizator.
# PUT /users/{id} - Actualizarea informațiilor personale.
# DELETE /users/{id} - Ștergerea contului utilizatorului.

#   Interacțiuni cu alte microservicii:
# GET /users/{id}/accounts - Listarea conturilor asociate.
# GET /users/{id}/notifications - Listarea notificărilor.
# GET /users/{id}/backtests - Listarea backtest-urilor.

#   Administrare (opțional):
# GET /users - Listarea tuturor utilizatorilor (pentru administratori).
# GET /users/audit/{id} - Istoric al modificărilor unui utilizator