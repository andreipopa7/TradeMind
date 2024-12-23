from fastapi import FastAPI
from persistence.dal.database import init_db
from presentation.controllers.user_controller import app

init_db()

app = FastAPI()
